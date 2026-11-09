// Creates the Bonlife lead campaigns in Meta from supabase/functions/_shared/campaigns.json:
// instant forms, campaigns, ad sets, images, creatives and ads. Everything is created
// PAUSED and re-running is safe (existing objects are found by name and reused).
//
//   node marketing/fb/import.mjs                       # plan only, no API calls
//   node marketing/fb/import.mjs --create              # create everything paused
//   node marketing/fb/import.mjs --create --activate   # create and turn on
//   node marketing/fb/import.mjs --subscribe-webhook   # send new leads to bonlife-automation/fb-lead
//
// Env: META_ACCESS_TOKEN, META_AD_ACCOUNT_ID, META_PAGE_ID, optional META_API_VERSION,
// META_CURRENCY_PER_USD (required when the ad account is not in USD).
// Webhook also needs META_APP_ID, META_APP_SECRET, META_VERIFY_TOKEN, LEAD_WEBHOOK_URL.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const config = JSON.parse(readFileSync(path.join(root, "supabase/functions/_shared/campaigns.json"), "utf8"));
const args = new Set(process.argv.slice(2));
const env = (k, required = true) => {
  const v = process.env[k];
  if (!v && required) throw new Error(`Missing env ${k}`);
  return v ?? "";
};

const GRAPH = `https://graph.facebook.com/${process.env.META_API_VERSION || "v23.0"}`;
const named = (c) => `${c.name} [${c.key}]`;
const optionKey = (s) => s.toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");

const startBudget = config.budget.start_adset_daily_usd;
const total = startBudget * config.campaigns.length;
if (total > config.budget.max_total_daily_usd) {
  throw new Error(`Starting budgets total $${total}/day, above the $${config.budget.max_total_daily_usd} cap`);
}

console.log(`${config.campaigns.length} campaigns × $${startBudget}/day = $${total}/day (cap $${config.budget.max_total_daily_usd})`);
for (const c of config.campaigns) {
  console.log(`\n${named(c)}  goal=${c.goal}  target CPL $${c.target_cpl_usd}`);
  console.log(`  form: ${c.form.headline}  [${["FULL_NAME", "PHONE", ...c.form_questions].join(", ")}]`);
  for (const ad of c.ads) console.log(`  ad ${ad.key}: ${ad.creative}  "${ad.headline}"  CTA ${ad.cta}`);
}
if (!args.has("--create") && !args.has("--subscribe-webhook")) {
  console.log("\nPlan only. Re-run with --create to build it in Meta.");
  process.exit(0);
}

const call = async (method, pathname, params = {}, token = env("META_ACCESS_TOKEN")) => {
  const body = new URLSearchParams({ access_token: token });
  for (const [k, v] of Object.entries(params)) body.set(k, typeof v === "string" ? v : JSON.stringify(v));
  const url = method === "GET" ? `${GRAPH}/${pathname}?${body}` : `${GRAPH}/${pathname}`;
  const res = await fetch(url, method === "GET" ? {} : { method, body });
  const json = await res.json();
  if (!res.ok || json.error) throw new Error(`${method} ${pathname}: ${JSON.stringify(json.error ?? json)}`);
  return json;
};

const list = async (pathname, params, token) => {
  const out = [];
  let page = await call("GET", pathname, { limit: "200", ...params }, token);
  out.push(...page.data);
  while (page.paging?.next) {
    page = await (await fetch(page.paging.next)).json();
    out.push(...(page.data ?? []));
  }
  return out;
};

const pageId = env("META_PAGE_ID");
const pageToken = (await call("GET", pageId, { fields: "access_token" })).access_token;

if (args.has("--subscribe-webhook")) {
  const appToken = `${env("META_APP_ID")}|${env("META_APP_SECRET")}`;
  await call("POST", `${env("META_APP_ID")}/subscriptions`, {
    object: "page",
    callback_url: env("LEAD_WEBHOOK_URL"),
    fields: "leadgen",
    verify_token: env("META_VERIFY_TOKEN"),
  }, appToken);
  await call("POST", `${pageId}/subscribed_apps`, { subscribed_fields: "leadgen" }, pageToken);
  console.log(`\nWebhook: page ${pageId} leads → ${env("LEAD_WEBHOOK_URL")}`);
  if (!args.has("--create")) process.exit(0);
}

const account = `act_${env("META_AD_ACCOUNT_ID").replace(/^act_/, "")}`;
const { currency } = await call("GET", account, { fields: "currency" });
const perUsd = currency === "USD" ? 1 : Number(env("META_CURRENCY_PER_USD"));
if (!perUsd) throw new Error(`Ad account is in ${currency}: set META_CURRENCY_PER_USD`);
const minorUnits = (usd) => String(Math.round(usd * perUsd * 100));

const forms = await list(`${pageId}/leadgen_forms`, { fields: "id,name" }, pageToken);
const campaigns = await list(`${account}/campaigns`, { fields: "id,name" });
const created = [];

for (const c of config.campaigns) {
  const name = named(c);

  let form = forms.find((f) => f.name === name);
  if (!form) {
    form = await call("POST", `${pageId}/leadgen_forms`, {
      name,
      locale: "es_LA",
      questions: [
        { type: "FULL_NAME" },
        { type: "PHONE" },
        ...c.form_questions.map((key) => ({
          type: "CUSTOM",
          key,
          label: config.questions[key].label,
          options: config.questions[key].options.map((o) => ({ value: o, key: optionKey(o) })),
        })),
      ],
      context_card: { title: c.form.headline, style: "PARAGRAPH_STYLE", content: [c.form.description] },
      privacy_policy: { url: config.business.privacy_url, link_text: "Política de privacidad" },
      thank_you_page: {
        title: "¡Gracias!",
        body: c.form.thank_you,
        button_type: "VIEW_WEBSITE",
        button_text: "Ver productos",
        website_url: c.landing_url,
      },
      follow_up_action_url: c.landing_url,
    }, pageToken);
    console.log(`form   ${name}  ${form.id}`);
  }

  let campaign = campaigns.find((x) => x.name === name);
  if (!campaign) {
    campaign = await call("POST", `${account}/campaigns`, {
      name,
      objective: "OUTCOME_LEADS",
      status: "PAUSED",
      special_ad_categories: [],
      is_adset_budget_sharing_enabled: "false",
    });
    console.log(`camp   ${name}  ${campaign.id}`);
  }

  const adsetName = `${c.key} | RD | ${c.targeting.age_min}+`;
  let adset = (await list(`${campaign.id}/adsets`, { fields: "id,name" })).find((x) => x.name === adsetName);
  if (!adset) {
    adset = await call("POST", `${account}/adsets`, {
      name: adsetName,
      campaign_id: campaign.id,
      daily_budget: minorUnits(startBudget),
      billing_event: "IMPRESSIONS",
      optimization_goal: "LEAD_GENERATION",
      destination_type: "ON_AD",
      bid_strategy: "LOWEST_COST_WITHOUT_CAP",
      promoted_object: { page_id: pageId },
      targeting: {
        geo_locations: { countries: [config.business.country] },
        age_min: c.targeting.age_min,
        targeting_automation: { advantage_audience: 1 },
      },
      status: "PAUSED",
    });
    console.log(`adset  ${adsetName}  ${adset.id}  ${currency} ${Number(minorUnits(startBudget)) / 100}/day`);
  }

  const existingAds = await list(`${adset.id}/ads`, { fields: "id,name" });
  const ads = [];
  for (const ad of c.ads) {
    const adName = `${c.key}-${ad.key}`;
    let found = existingAds.find((x) => x.name === adName);
    if (!found) {
      const bytes = readFileSync(path.join(root, "marketing/fb/creatives", ad.creative)).toString("base64");
      const image = await call("POST", `${account}/adimages`, { bytes });
      const hash = Object.values(image.images)[0].hash;
      const creative = await call("POST", `${account}/adcreatives`, {
        name: adName,
        object_story_spec: {
          page_id: pageId,
          link_data: {
            image_hash: hash,
            link: c.landing_url,
            message: ad.primary_text,
            name: ad.headline,
            description: ad.description,
            call_to_action: { type: ad.cta, value: { lead_gen_form_id: form.id } },
          },
        },
      });
      found = await call("POST", `${account}/ads`, {
        name: adName,
        adset_id: adset.id,
        creative: { creative_id: creative.id },
        status: "PAUSED",
      });
      console.log(`ad     ${adName}  ${found.id}`);
    }
    ads.push(found);
  }
  created.push({ campaign, adset, ads });
}

if (args.has("--activate")) {
  for (const { campaign, adset, ads } of created) {
    for (const obj of [campaign, adset, ...ads]) await call("POST", obj.id, { status: "ACTIVE" });
  }
  console.log(`\nActivated ${created.length} campaigns. Meta reviews new ads before they deliver.`);
} else {
  console.log("\nCreated paused. Review in Ads Manager, then re-run with --create --activate.");
}
