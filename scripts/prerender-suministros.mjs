// Runs after `vite build`: writes dist/suministros/**/index.html with each page's own
// title, meta tags, canonical, JSON-LD and readable content, so crawlers get the full
// page without running JavaScript. Vercel serves these files before the SPA rewrite;
// React replaces the static content when it mounts.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const SITE = "https://www.bonlifeoil.info";
const { categories, products, delivery, pricesUpdated } = JSON.parse(
  readFileSync(path.join(root, "src/data/suministros-catalog.json"), "utf8"),
);
const template = readFileSync(path.join(dist, "index.html"), "utf8");

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const price = (n) => `RD$${n.toLocaleString("en-US")}`;
const productPath = (p) => `/suministros/${p.category}/${p.slug}`;
const catName = (slug) => categories.find((c) => c.slug === slug).name;

const productSchema = (p) => ({
  "@type": "Product",
  name: `${p.name} (${p.unit})`,
  description: p.description,
  image: `${SITE}/suministros/${p.image}`,
  url: `${SITE}${productPath(p)}`,
  ...(p.price
    ? { offers: { "@type": "Offer", price: String(p.price), priceCurrency: "DOP", availability: "https://schema.org/InStock",
        areaServed: { "@type": "Country", name: "República Dominicana" }, seller: { "@id": `${SITE}/#organization` } } }
    : {}),
});
const itemList = (name, list) => ({
  "@type": "ItemList", name, itemListElement: list.map((p, i) => ({ "@type": "ListItem", position: i + 1, item: productSchema(p) })),
});
const crumbs = (items) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, url], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${SITE}${url}` })),
});
const faqPage = (faqs) => ({
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});
const deliveryFaqs = (p) => [
  { q: `¿Entregan ${p.name.toLowerCase()} fuera de Santo Domingo?`,
    a: `Sí. Entregamos en todo el país, incluyendo ${delivery.cities.slice(1, 8).join(", ")} y el resto de las provincias. ${delivery.note}` },
  { q: "¿Tienen precio por volumen?", a: "Sí. Para pedidos grandes o recurrentes le preparamos una cotización por volumen por WhatsApp." },
];

const productList = (list) =>
  `<ul>${list.map((p) => `<li><a href="${productPath(p)}">${esc(p.name)}</a> — ${esc(p.unit)} — ${p.price ? `${price(p.price)} (ITBIS incluido)` : "precio por cotización"}. ${esc(p.description)}</li>`).join("")}</ul>`;
const deliveryHtml = `<h2>${esc(delivery.headline)}</h2><ul>${delivery.zones.map((z) => `<li>${esc(z.zone)}: ${esc(z.time)}</li>`).join("")}</ul><p>${esc(delivery.note)}</p>`;
const faqHtml = (faqs) => `<h2>Preguntas frecuentes</h2>${faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("")}`;
const contact = `<p>Pedidos por WhatsApp: <a href="https://wa.me/18299876764">+1 (829) 987-6764</a> · Bonlife Oil, Santo Domingo.</p>`;

function page({ url, title, description, image, jsonLd, body }) {
  const canonical = `${SITE}${url}`;
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(description)}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${canonical}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(description)}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${canonical}`);
  if (image) {
    html = html
      .replace(/(<meta property="og:image" content=")[^"]*/, `$1${SITE}/suministros/${image}`)
      .replace(/(<meta name="twitter:image" content=")[^"]*/, `$1${SITE}/suministros/${image}`);
  }
  html = html.replace("</head>", `  <script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": jsonLd }).replace(/</g, "\\u003c")}</script>\n  </head>`);
  html = html.replace(/<div id="root">[\s\S]*?<\/div>\s*(<script|<\/body>)/, `<div id="root"><main class="seo-fallback"><div class="fb-brand">Bon<span>life</span></div>${body}${contact}</main></div>\n    $1`);
  const file = path.join(dist, url, "index.html");
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, html);
}

// Hub
page({
  url: "/suministros",
  title: "Suministros para Hoteles y Restaurantes en RD | Entrega a Todo el País | Bonlife",
  description: "Papel higiénico jumbo, papel toalla, productos de limpieza, desechables y amenidades hoteleras con precios publicados y entrega a todo el país. Pida por WhatsApp.",
  jsonLd: [itemList("Suministros Bonlife", products), crumbs([["Inicio", "/"], ["Suministros", "/suministros"]])],
  body: `<h1>Suministros para hoteles, restaurantes y empresas</h1><p>Papel institucional, productos de limpieza, desechables y amenidades hoteleras con precios publicados en RD$ con ITBIS incluido (actualizados en ${esc(pricesUpdated)}). Entregamos en todo el país.</p>${categories
    .map((c) => `<h2><a href="/suministros/${c.slug}">${esc(c.name)}</a></h2><p>${esc(c.intro)}</p>${productList(products.filter((p) => p.category === c.slug))}`)
    .join("")}${deliveryHtml}`,
});

// Categories
for (const c of categories) {
  const list = products.filter((p) => p.category === c.slug);
  page({
    url: `/suministros/${c.slug}`,
    title: `${c.title} | Bonlife RD`,
    description: c.description,
    image: list[0]?.image,
    jsonLd: [itemList(c.title, list), crumbs([["Inicio", "/"], ["Suministros", "/suministros"], [c.name, `/suministros/${c.slug}`]])],
    body: `<p><a href="/suministros">Suministros</a> / ${esc(c.name)}</p><h1>${esc(c.title)}</h1><p>${esc(c.intro)} Entregamos en todo el país.</p>${productList(list)}<h2>Cómo elegir</h2>${c.guide.map((g) => `<p>${esc(g)}</p>`).join("")}${deliveryHtml}`,
  });
}

// Products
for (const p of products) {
  const faqs = [...p.faqs, ...deliveryFaqs(p)];
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);
  page({
    url: productPath(p),
    title: p.seoTitle,
    description: p.seoDescription,
    image: p.image,
    jsonLd: [productSchema(p), faqPage(faqs),
      crumbs([["Inicio", "/"], ["Suministros", "/suministros"], [catName(p.category), `/suministros/${p.category}`], [p.name, productPath(p)]])],
    body: `<p><a href="/suministros">Suministros</a> / <a href="/suministros/${p.category}">${esc(catName(p.category))}</a> / ${esc(p.name)}</p>
<h1>${esc(p.name)}</h1><img src="/suministros/${p.image}" alt="${esc(p.name)} (imagen ilustrativa)" width="400" height="400">
<p>${esc(p.unit)} · <strong>${p.price ? `${price(p.price)} con ITBIS` : "Precio por cotización"}</strong></p><p>${esc(p.intro)}</p>
<h2>Especificaciones</h2><ul>${p.specs.map((s) => `<li>${esc(s.label)}: ${esc(s.value)}</li>`).join("")}</ul>
<h2>Ideal para</h2><ul>${p.uses.map((u) => `<li>${esc(u)}</li>`).join("")}</ul>${deliveryHtml}${faqHtml(faqs)}
<h2>Más en ${esc(catName(p.category).toLowerCase())}</h2>${productList(related)}`,
  });
}

console.log(`prerender: ${1 + categories.length + products.length} /suministros pages`);
