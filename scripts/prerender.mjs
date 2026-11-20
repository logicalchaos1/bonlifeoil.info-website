// Runs after the browser build and the server build (see "build" in package.json).
// Renders every public page to finished HTML in dist/<path>.html, with that page's
// own <title>, description, canonical and JSON-LD. Visitors and Google get the complete
// page in the first response; the JavaScript then attaches to it (hydration) for the
// interactive parts. dist/index.html becomes the homepage, and dist/shell.html is the
// empty page used for anything not built here (blog posts, unknown URLs).
import { mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const { render, SITE_URL } = await import(pathToFileURL(path.join(root, "dist-ssr/entry-server.js")).href);
const catalog = JSON.parse(readFileSync(path.join(root, "src/data/suministros-catalog.json"), "utf8"));
const jobsSrc = readFileSync(path.join(root, "src/data/jobs.ts"), "utf8");
const jobSlugs = [...jobsSrc.matchAll(/slug: '([^']+)'/g)].map((m) => m[1]);

// Blog posts live in Supabase: read them with the public anon key (same as the sitemap).
const client = readFileSync(path.join(root, "src/integrations/supabase/client.ts"), "utf8");
const supabaseUrl = client.match(/SUPABASE_URL = "([^"]+)"/)[1];
const anonKey = client.match(/SUPABASE_PUBLISHABLE_KEY =\s*"([^"]+)"/)[1];
const rest = async (query) => {
  const res = await fetch(`${supabaseUrl}/rest/v1/${query}`, {
    headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  return res.json();
};
// Same selects as src/pages/Blog.tsx and BlogPost.tsx, so the data has the same shape.
let blogList = null, blogPosts = [];
try {
  blogList = await rest("blog_posts?select=id,title,slug,excerpt,meta_description,published_at,primary_keyword,town_id,dr_towns(name,slug)&status=eq.published&order=published_at.desc");
  blogPosts = await rest("blog_posts?select=*,dr_towns(name,slug,province)&status=eq.published");
} catch (e) {
  // Don't fail the deploy over the blog: those pages then load in the browser as before.
  console.warn(`prerender: blog posts not loaded (${e.message}); /blog/* stays browser-rendered`);
}
const seeds = new Map();
if (blogList) seeds.set("/blog", [[["blog-posts"], blogList]]);
for (const post of blogPosts) seeds.set(`/blog/${post.slug}`, [[["blog-post", post.slug], post]]);

const routes = [
  "/", "/aceite-para-freir", "/aceite-de-cocina", "/aceite-vegetal",
  "/suministros",
  ...catalog.categories.map((c) => `/suministros/${c.slug}`),
  ...catalog.products.map((p) => `/suministros/${p.category}/${p.slug}`),
  "/calculadora-ahorro", "/blog", "/referidos", "/chef-partners", "/formulario-comprador",
  "/empleos", ...jobSlugs.map((s) => `/empleos/${s}`), "/privacidad", "/reporte-piloto",
  ...blogPosts.map((p) => `/blog/${p.slug}`),
];

const template = readFileSync(path.join(dist, "index.html"), "utf8");
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const ROOT_RE = /<div id="root">[\s\S]*?<!-- \/root -->/;
if (!ROOT_RE.test(template)) throw new Error("index.html: #root marker not found");

function page(html, seo, seed) {
  const data = seed ? `<script>window.__BONLIFE_DATA__=${JSON.stringify(seed).replace(/</g, "\\u003c")}</script>` : "";
  let out = template.replace(ROOT_RE, () => `<div id="root" data-ssr="1">${html}</div><!-- /root -->${data}`);
  if (!seo) return out;
  const url = `${SITE_URL}${seo.path}`;
  out = out
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(seo.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, (_, a) => a + esc(seo.description))
    .replace(/(<link rel="canonical" href=")[^"]*/, (_, a) => a + url)
    .replace(/(<meta property="og:title" content=")[^"]*/, (_, a) => a + esc(seo.title))
    .replace(/(<meta property="og:description" content=")[^"]*/, (_, a) => a + esc(seo.description))
    .replace(/(<meta property="og:url" content=")[^"]*/, (_, a) => a + url);
  if (seo.noindex) out = out.replace(/(<meta name="robots" content=")[^"]*/, (_, a) => a + "noindex, follow");
  if (seo.jsonLd) {
    const ld = JSON.stringify(seo.jsonLd).replace(/</g, "\\u003c");
    out = out.replace("</head>", () => `  <script type="application/ld+json" data-seo="page">${ld}</script>\n  </head>`);
  }
  return out;
}

writeFileSync(path.join(dist, "shell.html"), template.replace(ROOT_RE, '<div id="root"></div><!-- /root -->'));
for (const route of routes) {
  const seed = seeds.get(route);
  const { html, seo } = await render(route, seed);
  if (html.length < 1500 || html.includes("Loading the page")) throw new Error(`${route}: rendered no page content`);
  if (seed && route.startsWith("/blog/") && !html.includes("<article")) throw new Error(`${route}: post did not render`);
  // <path>.html: with cleanUrls, Vercel serves it at /<path> before any rewrite, so a page
  // that was not built (e.g. a post published after this deploy) falls through to the shell.
  const file = route === "/" ? path.join(dist, "index.html") : path.join(dist, `${route}.html`);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, page(html, seo, seed));
}
rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
console.log(`prerender: ${routes.length} pages`);
