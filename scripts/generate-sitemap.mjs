// Writes public/sitemap.xml before each build so Vercel serves it as a static
// XML file. (Proxying the Supabase function served it as text/plain, and Google
// never downloaded it.) Blog posts are read with the public anon key.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = "https://www.bonlifeoil.info";

const pages = [
  ["/", "1.0"],
  ["/aceite-para-freir", "1.0"],
  ["/aceite-de-palma", "0.9"],
  ["/calculadora-ahorro", "0.7"],
  ["/blog", "0.7"],
  ["/chef-partners", "0.6"],
  ["/formulario-comprador", "0.6"],
  ["/referidos", "0.5"],
  ["/empleos", "0.5"],
  ["/privacidad", "0.3"],
];

// Reuse the URL and anon key pinned in the client instead of duplicating them.
const client = readFileSync(path.join(root, "src/integrations/supabase/client.ts"), "utf8");
const supabaseUrl = client.match(/SUPABASE_URL = "([^"]+)"/)?.[1];
const anonKey = client.match(/SUPABASE_PUBLISHABLE_KEY =\s*"([^"]+)"/)?.[1];

let posts = [];
try {
  const res = await fetch(
    `${supabaseUrl}/rest/v1/blog_posts?select=slug,updated_at&status=eq.published&order=published_at.desc`,
    { headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` }, signal: AbortSignal.timeout(15000) },
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  posts = await res.json();
} catch (e) {
  // A missing blog list shouldn't fail the deploy; the static pages still ship.
  console.warn(`sitemap: could not load blog posts (${e.message}); writing static pages only`);
}

const today = new Date().toISOString().slice(0, 10);
const url = (loc, lastmod, priority) =>
  `  <url>\n    <loc>${SITE_URL}${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...pages.map(([p, pr]) => url(p, today, pr)),
  ...posts.map((p) => url(`/blog/${encodeURIComponent(p.slug)}`, (p.updated_at ?? today).slice(0, 10), "0.6")),
  "</urlset>",
  "",
].join("\n");

writeFileSync(path.join(root, "public/sitemap.xml"), xml);
console.log(`sitemap: ${pages.length} pages + ${posts.length} blog posts`);
