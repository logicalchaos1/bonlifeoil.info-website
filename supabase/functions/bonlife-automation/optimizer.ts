// Daily cron: pulls ad results from Meta, kills losers, moves budget to winners,
// and keeps the total under the daily cap. Dry run unless FB_OPTIMIZER_APPLY=true.
import config from "../_shared/campaigns.json" with { type: "json" };
import { plan, type AdSetInput, type Stats } from "../_shared/optimizer.ts";
import { db, env, json, verifyCron } from "../_shared/channels.ts";

const GRAPH = `https://graph.facebook.com/${env("META_API_VERSION") || "v23.0"}`;
const ACCOUNT = `act_${env("META_AD_ACCOUNT_ID").replace(/^act_/, "")}`;
const KEY_IN_NAME = /\[([a-z0-9-]+)\]\s*$/;
const LEAD_ACTIONS = ["lead", "onsite_conversion.lead_grouped"];

const get = async (path: string, params: Record<string, string>) => {
  const qs = new URLSearchParams({ ...params, access_token: env("META_ACCESS_TOKEN") });
  const out: any[] = [];
  let url: string | null = `${GRAPH}/${path}?${qs}`;
  while (url) {
    const res: Response = await fetch(url);
    const body: any = await res.json();
    if (!res.ok) throw new Error(`Graph ${path}: ${JSON.stringify(body.error ?? body)}`);
    if (!Array.isArray(body.data)) return body;
    out.push(...body.data);
    url = body.paging?.next ?? null;
  }
  return out;
};

const post = async (id: string, params: Record<string, string>) => {
  const res = await fetch(`${GRAPH}/${id}`, {
    method: "POST",
    body: new URLSearchParams({ ...params, access_token: env("META_ACCESS_TOKEN") }),
  });
  if (!res.ok) throw new Error(`Graph POST ${id}: ${await res.text()}`);
};

const insights = async (level: "adset" | "ad", range: Record<string, string>) => {
  const rows = await get(`${ACCOUNT}/insights`, { level, fields: `${level}_id,spend,actions`, limit: "500", ...range });
  return new Map<string, { spend: number; leads: number }>(rows.map((r: any) => [
    r[`${level}_id`],
    {
      spend: Number(r.spend ?? 0),
      leads: Math.max(0, ...(r.actions ?? []).filter((a: any) => LEAD_ACTIONS.includes(a.action_type)).map((a: any) => Number(a.value))),
    },
  ]));
};

export default async function handle(req: Request): Promise<Response> {
  if (!(await verifyCron(req))) return json({ error: "unauthorized" }, 401);
  if (!env("META_ACCESS_TOKEN") || !env("META_AD_ACCOUNT_ID")) return json({ skipped: "Meta credentials not set" });
  const apply = env("FB_OPTIMIZER_APPLY") === "true";

  const account = await get(ACCOUNT, { fields: "currency" });
  const perUsd = account.currency === "USD" ? 1 : Number(env("META_CURRENCY_PER_USD"));
  if (!perUsd) return json({ error: `Account currency is ${account.currency}; set META_CURRENCY_PER_USD` }, 500);
  // Meta reports money in the account currency; budgets are in its minor unit.
  const toUsd = (s: Stats) => ({ spend: s.spend / perUsd, leads: s.leads });

  const until = new Date().toISOString().slice(0, 10);
  const since = new Date(Date.now() - config.budget.lookback_days * 86_400_000).toISOString().slice(0, 10);
  const [adsets, ads, lifeSets, lifeAds, recentSets] = await Promise.all([
    get(`${ACCOUNT}/adsets`, { fields: "id,name,status,daily_budget,created_time,campaign{name}", limit: "200" }),
    get(`${ACCOUNT}/ads`, { fields: "id,name,status,adset_id,created_time", limit: "500" }),
    insights("adset", { date_preset: "maximum" }),
    insights("ad", { date_preset: "maximum" }),
    insights("adset", { time_range: JSON.stringify({ since, until }) }),
  ]);

  const none = { spend: 0, leads: 0 };
  const inputs: AdSetInput[] = adsets.flatMap((s: any) => {
    const key = s.campaign?.name?.match(KEY_IN_NAME)?.[1];
    const campaign = config.campaigns.find((c) => c.key === key);
    if (!campaign || !s.daily_budget) return [];
    return [{
      id: s.id,
      name: s.name,
      active: s.status === "ACTIVE",
      createdAt: s.created_time,
      dailyBudgetUsd: Number(s.daily_budget) / 100 / perUsd,
      targetCplUsd: campaign.target_cpl_usd,
      lifetime: toUsd(lifeSets.get(s.id) ?? none),
      recent: toUsd(recentSets.get(s.id) ?? none),
      ads: ads.filter((a: any) => a.adset_id === s.id).map((a: any) => ({
        id: a.id, name: a.name, active: a.status === "ACTIVE", createdAt: a.created_time,
        lifetime: toUsd(lifeAds.get(a.id) ?? none),
      })),
    }];
  });

  const actions = plan(inputs, config.budget);
  const errors: string[] = [];
  if (apply) {
    for (const a of actions) {
      try {
        if (a.type === "set_budget") await post(a.id, { daily_budget: String(Math.round(a.toUsd * perUsd * 100)) });
        else await post(a.id, { status: "PAUSED" });
      } catch (e) {
        errors.push(String(e));
      }
    }
  }
  await db().from("fb_optimizer_log").insert({ applied: apply, actions, errors, adsets: inputs.length });
  return json({ applied: apply, adsets: inputs.length, actions, errors });
}
