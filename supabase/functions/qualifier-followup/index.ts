// Hourly cron: calls leads who haven't answered the SMS (ElevenLabs voice agent)
// and hands stalled conversations to a person.
import config from "../_shared/campaigns.json" with { type: "json" };
import { campaignFor, fromRow, goalFor } from "../_shared/qualifier.ts";
import { db, env, json, notifyHuman, verifyCron } from "../_shared/channels.ts";

const CALL_AFTER_MIN = 60;
const HANDOFF_AFTER_HOURS = 20;

// Santo Domingo is UTC-4 all year (no daylight saving).
const inBusinessHours = (now: Date) => {
  const local = new Date(now.getTime() - 4 * 3_600_000);
  const { start, end, days } = config.business.business_hours;
  return days.includes(local.getUTCDay()) && local.getUTCHours() >= start && local.getUTCHours() < end;
};

const placeCall = async (row: Record<string, any>) => {
  const c = campaignFor(row.campaign_key);
  const res = await fetch("https://api.elevenlabs.io/v1/convai/twilio/outbound-call", {
    method: "POST",
    headers: { "xi-api-key": env("ELEVENLABS_API_KEY"), "Content-Type": "application/json" },
    body: JSON.stringify({
      agent_id: env("ELEVENLABS_AGENT_ID"),
      agent_phone_number_id: env("ELEVENLABS_PHONE_NUMBER_ID"),
      to_number: row.phone,
      conversation_initiation_client_data: {
        dynamic_variables: {
          qualification_id: row.id,
          customer_name: (row.name ?? "").split(" ")[0] || "",
          product: c.product,
          goal: goalFor(c).label,
          known_answers: JSON.stringify(row.answers ?? {}),
        },
      },
    }),
  });
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${await res.text()}`);
};

Deno.serve(async (req) => {
  if (!verifyCron(req)) return json({ error: "unauthorized" }, 401);
  const supabase = db();
  const now = new Date();
  const { data: rows } = await supabase.from("lead_qualifications").select("*").eq("status", "texting");

  const voiceOn = !!(env("ELEVENLABS_API_KEY") && env("ELEVENLABS_AGENT_ID") && env("ELEVENLABS_PHONE_NUMBER_ID"));
  let called = 0, handedOff = 0;

  for (const row of rows ?? []) {
    const lastTouch = Math.max(Date.parse(row.last_outbound_at ?? row.created_at), Date.parse(row.last_inbound_at ?? 0));
    const idleMin = (now.getTime() - lastTouch) / 60_000;

    if (voiceOn && !row.last_inbound_at && row.call_attempts === 0 && idleMin >= CALL_AFTER_MIN && inBusinessHours(now)) {
      try {
        await placeCall(row);
        await supabase.from("lead_qualifications")
          .update({ call_attempts: 1, last_outbound_at: now.toISOString() }).eq("id", row.id);
        called++;
      } catch (e) {
        console.error("call failed", row.id, e);
      }
    } else if (idleMin >= HANDOFF_AFTER_HOURS * 60) {
      const state = { ...fromRow(row), status: "needs_human" as const };
      await supabase.from("lead_qualifications")
        .update({ status: "needs_human", handed_off_at: now.toISOString() }).eq("id", row.id);
      await notifyHuman(state, row.phone);
      handedOff++;
    }
  }
  return json({ checked: rows?.length ?? 0, called, handedOff });
});
