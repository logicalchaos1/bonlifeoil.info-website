// Runs after `vite build`: writes dist/<path>/index.html for each oil landing page in
// src/data/landing/*.json with its own title, meta, canonical, JSON-LD and readable
// content, so crawlers get the full page without running JavaScript. vercel.json routes
// each URL to its file.
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const dataDir = path.join(root, "src/data/landing");
const SITE = "https://www.bonlifeoil.info";
const template = readFileSync(path.join(dist, "index.html"), "utf8");
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const section = (s) => {
  const items =
    s.kind === "cards" ? s.items.map((c) => `<h3>${esc(c.title)}</h3><p>${esc(c.text)}</p>`).join("")
    : s.kind === "list" ? `<ul>${s.items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`
    : s.items.map((t) => `<p>${esc(t)}</p>`).join("");
  return `<h2>${esc(s.heading)}</h2>${items}`;
};

for (const file of readdirSync(dataDir).filter((f) => f.endsWith(".json"))) {
  const page = JSON.parse(readFileSync(path.join(dataDir, file), "utf8"));
  const url = `${SITE}${page.path}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Product", name: page.product.name, description: page.product.description, image: `${SITE}/aceite-vegetal-bonlife.jpg`,
        brand: { "@type": "Brand", name: "Bonlife" },
        offers: { "@type": "Offer", price: String(page.product.price), priceCurrency: "DOP", availability: "https://schema.org/InStock", url, seller: { "@id": `${SITE}/#organization` } } },
      { "@type": "FAQPage", mainEntity: page.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: page.breadcrumb, item: url } ] },
    ],
  };
  const body = `<h1>${esc(page.h1)}</h1><p>${esc(page.lead)}</p>
<img src="/aceite-vegetal-bonlife.jpg" alt="${esc(page.product.name)}" width="400" height="300">
<h2>${esc(page.priceHeading)}</h2><ul>${page.unitPrices.map((u) => `<li>${esc(u.label)}: ${esc(u.value)}</li>`).join("")}</ul>
${page.sections.map(section).join("\n")}
<h2>${esc(page.faqsHeading)}</h2>${page.faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("")}
<p>Vea también: ${page.related.map((r) => `<a href="${r.href}">${esc(r.label)}</a>`).join(" · ")}</p>
<p>Pedidos por WhatsApp: <a href="https://wa.me/18299876764">+1 (829) 987-6764</a> · Bonlife Oil, Santo Domingo.</p>`;

  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(page.description)}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(page.title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(page.description)}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:image" content=")[^"]*/, `$1${SITE}/aceite-vegetal-bonlife.jpg`)
    .replace("</head>", `  <script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>\n  </head>`)
    .replace(/<div id="root">[\s\S]*?<\/div>\s*(<script|<\/body>)/, `<div id="root"><main style="max-width:860px;margin:0 auto;padding:96px 16px 48px;font-family:system-ui,sans-serif;line-height:1.6">${body}</main></div>\n    $1`);

  const out = path.join(dist, page.path, "index.html");
  mkdirSync(path.dirname(out), { recursive: true });
  writeFileSync(out, html);
  console.log(`prerender: ${page.path}`);
}
