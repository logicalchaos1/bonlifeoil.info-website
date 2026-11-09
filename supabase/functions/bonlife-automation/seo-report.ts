// Weekly cron: emails a Search Console summary for bonlifeoil.info (clicks,
// rankings, non-brand searches, index status of key pages, sitemap) plus leads.
import { db, env, json, secret, verifyCron } from "../_shared/channels.ts";
import { googleAccessToken } from "../_shared/google.ts";

const SITE = "sc-domain:bonlifeoil.info";
const ORIGIN = "https://www.bonlifeoil.info";
const KEY_PAGES = ["/", "/aceite-para-freir", "/aceite-de-palma", "/blog", "/calculadora-ahorro"];
const BRAND = /bon\s?lif|bonlife/i;

type Row = { keys?: string[]; clicks: number; impressions: number; position: number };

const day = (offset: number) => new Date(Date.now() - offset * 86_400_000).toISOString().slice(0, 10);
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
const pos = (n?: number) => (n ? n.toFixed(1) : "–");
const delta = (now: number, before: number) => {
  const d = now - before;
  return d === 0 ? "" : ` <span style="color:${d > 0 ? "#15803d" : "#b91c1c"}">(${d > 0 ? "+" : ""}${d})</span>`;
};

export default async function handle(req: Request): Promise<Response> {
  if (!(await verifyCron(req))) return json({ error: "unauthorized" }, 401);

  const sa = JSON.parse(await secret("bonlife_gsc_service_account"));
  const token = await googleAccessToken(sa, "https://www.googleapis.com/auth/webmasters");
  const gsc = async (url: string, body?: unknown) => {
    const res = await fetch(url, {
      method: body ? "POST" : "GET",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    const out = await res.json();
    if (!res.ok) throw new Error(`Search Console ${res.status}: ${JSON.stringify(out.error ?? out)}`);
    return out;
  };
  const site = encodeURIComponent(SITE);
  const query = async (start: string, end: string, dimensions: string[], rowLimit = 10): Promise<Row[]> =>
    (await gsc(`https://www.googleapis.com/webmasters/v3/sites/${site}/searchAnalytics/query`, {
      startDate: start, endDate: end, dimensions, rowLimit,
    })).rows ?? [];

  // Search Console data lags about 3 days, so compare the latest full 7 days with the 7 before.
  const [end, start, prevEnd, prevStart] = [day(3), day(9), day(10), day(16)];
  const [[now], [before], queries, pages, sitemaps] = await Promise.all([
    query(start, end, [], 1),
    query(prevStart, prevEnd, [], 1),
    query(start, end, ["query"], 100),
    query(start, end, ["page"], 10),
    gsc(`https://www.googleapis.com/webmasters/v3/sites/${site}/sitemaps`),
  ]);
  const nonBrand = queries.filter((r) => !BRAND.test(r.keys![0])).sort((a, b) => b.impressions - a.impressions).slice(0, 10);

  const index = await Promise.all(KEY_PAGES.map(async (path) => {
    const r = await gsc("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
      inspectionUrl: ORIGIN + path, siteUrl: SITE, languageCode: "en",
    }).catch((e) => ({ error: String(e) }));
    const s = r.inspectionResult?.indexStatusResult;
    return { path, indexed: s?.verdict === "PASS", state: s?.coverageState ?? "unknown", crawled: s?.lastCrawlTime?.slice(0, 10) ?? "never" };
  }));

  const { data: leads } = await db().from("leads").select("source").gte("created_at", `${day(7)}T00:00:00Z`);
  const bySource = Object.entries((leads ?? []).reduce<Record<string, number>>((m, l) => {
    m[l.source] = (m[l.source] ?? 0) + 1;
    return m;
  }, {}));

  const n = now ?? { clicks: 0, impressions: 0, position: 0 };
  const b = before ?? { clicks: 0, impressions: 0, position: 0 };
  const table = (head: string[], rows: string[][]) =>
    `<table cellpadding="6" style="border-collapse:collapse;font-size:13px;margin:6px 0 18px">` +
    `<tr>${head.map((h) => `<th align="left" style="border-bottom:1px solid #ddd">${h}</th>`).join("")}</tr>` +
    (rows.length ? rows.map((r) => `<tr>${r.map((c) => `<td style="border-bottom:1px solid #f0f0f0">${c}</td>`).join("")}</tr>`).join("")
      : `<tr><td colspan="${head.length}" style="color:#888">None yet</td></tr>`) + `</table>`;

  const html = `<div style="font-family:Arial,sans-serif;max-width:640px;color:#111">
<h2 style="margin:0 0 4px">Bonlife SEO · week of ${start} to ${end}</h2>
<p style="color:#666;margin:0 0 16px">Compared with ${prevStart} to ${prevEnd}.</p>
${table(["", "This week", "Previous"], [
  ["Clicks", `${n.clicks}${delta(n.clicks, b.clicks)}`, String(b.clicks)],
  ["Impressions", `${n.impressions}${delta(n.impressions, b.impressions)}`, String(b.impressions)],
  ["Avg. position", pos(n.position), pos(b.position)],
  ["Leads from the site", String(leads?.length ?? 0), ""],
])}
<h3>Non-brand searches</h3>
${table(["Search", "Impr.", "Clicks", "Position"], nonBrand.map((r) => [esc(r.keys![0]), String(r.impressions), String(r.clicks), pos(r.position)]))}
<h3>Top pages</h3>
${table(["Page", "Impr.", "Clicks", "Position"], pages.map((r) => [esc(r.keys![0].replace(ORIGIN, "") || "/"), String(r.impressions), String(r.clicks), pos(r.position)]))}
<h3>Key pages in Google</h3>
${table(["Page", "Indexed", "Last crawl"], index.map((i) => [i.path, i.indexed ? "✅" : `❌ ${esc(i.state)}`, i.crawled]))}
<h3>Sitemap</h3>
${table(["Sitemap", "Last downloaded", "Errors"], (sitemaps.sitemap ?? []).map((s: any) => [esc(s.path), s.lastDownloaded?.slice(0, 10) ?? "not yet", String(s.errors ?? 0)]))}
${bySource.length ? `<h3>Leads by source</h3>${table(["Source", "Leads"], bySource.map(([s, c]) => [esc(s), String(c)]))}` : ""}
</div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env("RESEND_API_KEY")}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Bonlife SEO <leads@bonlifeoil.info>",
      to: [env("NOTIFY_TO") || "jeffrey@bonlifeoil.info"],
      subject: `Bonlife SEO: ${n.clicks} clicks, ${n.impressions} impressions (${start} to ${end})`,
      html,
    }),
  });
  if (!res.ok) return json({ error: `Resend ${res.status}: ${await res.text()}` }, 502);
  return json({ ok: true, clicks: n.clicks, impressions: n.impressions, nonBrand: nonBrand.length });
}
