// Meta leadgen webhook: stores each Facebook lead and starts SMS qualification.
import config from "../_shared/campaigns.json" with { type: "json" };
import { start, toRow } from "../_shared/qualifier.ts";
import { db, env, json, logMessages, normalizePhone, sendSms, verifyMeta } from "../_shared/channels.ts";

const GRAPH = `https://graph.facebook.com/${env("META_API_VERSION") || "v23.0"}`;
const KEY_IN_NAME = /\[([a-z0-9-]+)\]\s*$/;

const graph = async (path: string, fields: string) => {
  const res = await fetch(`${GRAPH}/${path}?fields=${fields}&access_token=${env("META_PAGE_TOKEN")}`);
  const body = await res.json();
  if (!res.ok) throw new Error(`Graph ${path}: ${JSON.stringify(body.error ?? body)}`);
  return body;
};

// The importer names campaigns and forms "<name> [<key>]".
const campaignKey = async (lead: { campaign_name?: string; form_id?: string }) => {
  const fromCampaign = lead.campaign_name?.match(KEY_IN_NAME)?.[1];
  if (fromCampaign) return fromCampaign;
  if (lead.form_id) return (await graph(lead.form_id, "name")).name?.match(KEY_IN_NAME)?.[1] ?? null;
  return null;
};

async function handleLead(leadgenId: string) {
  const supabase = db();
  const lead = await graph(leadgenId, "field_data,campaign_name,form_id,ad_id,adset_id,created_time");
  const fields: Record<string, string> = Object.fromEntries(
    (lead.field_data ?? []).map((f: { name: string; values: string[] }) => [f.name, f.values?.[0] ?? ""]),
  );
  const key = await campaignKey(lead);
  if (!key || !config.campaigns.some((c) => c.key === key)) {
    console.warn("Lead from unknown campaign, skipping qualification", leadgenId, lead.campaign_name);
    return;
  }

  const name = fields.full_name || [fields.first_name, fields.last_name].filter(Boolean).join(" ");
  const phone = normalizePhone(fields.phone_number ?? "");
  const formAnswers = Object.fromEntries(
    Object.keys(config.questions).filter((q) => fields[q]).map((q) => [q, fields[q]]),
  );

  const { data: leadRow } = await supabase
    .from("leads")
    .insert({
      name: name || "Lead de Facebook",
      email: fields.email || null,
      phone: phone ?? fields.phone_number ?? null,
      business_type: formAnswers.business_type ?? null,
      monthly_consumption: formAnswers.monthly_volume ?? null,
      source: `facebook:${key}`,
    })
    .select("id")
    .single();

  if (!phone) {
    await supabase.from("lead_qualifications").upsert(
      {
        fb_lead_id: leadgenId, lead_id: leadRow?.id, campaign_key: key, name, phone: fields.phone_number ?? "",
        status: "needs_human", answers: formAnswers, fb_ad_id: lead.ad_id, fb_adset_id: lead.adset_id,
      },
      { onConflict: "fb_lead_id", ignoreDuplicates: true },
    );
    return;
  }

  const { messages, state } = start(key, name, formAnswers);
  const { data: qual, error } = await supabase
    .from("lead_qualifications")
    .upsert(
      {
        fb_lead_id: leadgenId, lead_id: leadRow?.id, phone, email: fields.email || null,
        fb_ad_id: lead.ad_id, fb_adset_id: lead.adset_id, ...toRow(state),
        last_outbound_at: new Date().toISOString(),
      },
      { onConflict: "fb_lead_id", ignoreDuplicates: true },
    )
    .select("id")
    .maybeSingle();
  if (error) throw error;
  if (!qual) return; // Meta retried a lead we already have.

  if (env("TWILIO_ACCOUNT_SID")) {
    for (const m of messages) await sendSms(phone, m);
    await logMessages(supabase, qual.id, "out", "sms", messages);
  }
}

Deno.serve(async (req) => {
  const url = new URL(req.url);
  if (req.method === "GET") {
    const ok = url.searchParams.get("hub.mode") === "subscribe" &&
      url.searchParams.get("hub.verify_token") === env("META_VERIFY_TOKEN");
    return ok ? new Response(url.searchParams.get("hub.challenge")) : new Response("forbidden", { status: 403 });
  }

  const raw = await req.text();
  if (!(await verifyMeta(raw, req.headers.get("x-hub-signature-256")))) return json({ error: "bad signature" }, 401);

  const ids: string[] = [];
  for (const entry of JSON.parse(raw).entry ?? []) {
    for (const change of entry.changes ?? []) {
      if (change.field === "leadgen" && change.value?.leadgen_id) ids.push(change.value.leadgen_id);
    }
  }
  const results = await Promise.allSettled(ids.map(handleLead));
  results.forEach((r, i) => r.status === "rejected" && console.error("lead", ids[i], r.reason));
  return json({ received: ids.length });
});
