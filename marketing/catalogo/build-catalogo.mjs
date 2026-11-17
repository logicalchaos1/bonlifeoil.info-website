// Client catalog PDF (letter size): oils and foods plus the /suministros catalog,
// with prices, delivery terms and WhatsApp ordering. Writes public/catalogo-bonlife.pdf
// so the site can link to it. Run from the repo root:
//   node marketing/catalogo/build-catalogo.mjs
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const { chromium } = createRequire(import.meta.url)("playwright");
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const sup = JSON.parse(readFileSync(path.join(root, "src/data/suministros-catalog.json"), "utf8"));

const img = (rel) => {
  const file = path.join(root, rel);
  const type = file.endsWith(".png") ? "image/png" : "image/jpeg";
  return `data:${type};base64,${readFileSync(file).toString("base64")}`;
};
const svg = (name) => `data:image/svg+xml;base64,${readFileSync(path.join(here, name)).toString("base64")}`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const money = (n) => `RD$${n.toLocaleString("en-US")}`;

// Oil and foods. Prices and benefits as in src/components/ProductCatalog.tsx; the oil is
// listed only as "Aceite vegetal" without naming the oil type.
const foods = [
  { name: "Aceite vegetal", unit: "Garrafón 25 L", price: "RD$4,600", image: "marketing/catalogo/aceite-vegetal.jpg",
    points: ["Dura hasta 300% más que los aceites tradicionales", "No transfiere sabores ni olores entre frituras", "Punto de humo 230 °C · libre de grasas trans"] },
  { name: "Margarina", unit: "15 kg", price: "RD$3,570", image: "src/assets/margarine-product.jpg",
    points: ["Bajo contenido de grasas trans", "Cremosidad y sabor natural", "Para untar, hornear y cocinar"] },
  { name: "Mayonesa", unit: "Caja de 4 × 1 galón (8 lb c/u)", price: "RD$4,000", image: "src/assets/mayonesa-product.jpg",
    points: ["Elaborada con limón y huevo", "Alto rendimiento para uso profesional", "Sándwiches, ensaladas y salsas base"] },
  { name: "Mayonesa en sachets", unit: "Caja de 144 × 12 ml", price: "RD$2,500", image: "src/assets/mayonesa-sachets-product.jpg",
    points: ["Porciones individuales higiénicas", "Ideal para delivery y combos", "Mismo sabor que la de galón"] },
];

const GREEN = "#0a1a0f", GOLD = "#c9a227";
const css = `
  @page { size: letter; margin: 0 }
  * { margin: 0; padding: 0; box-sizing: border-box }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact }
  body { font-family: Inter, sans-serif; color: ${GREEN}; font-size: 9.5pt; line-height: 1.4 }
  a { color: inherit; text-decoration: none }
  .page { width: 8.5in; height: 11in; position: relative; overflow: hidden; break-after: page; padding: 0.55in 0.55in 0.8in }
  .brand { font-style: italic; font-weight: 800; letter-spacing: -0.02em }
  .brand b { color: ${GOLD} }
  h2 { font-size: 22pt; font-weight: 800; margin-bottom: 4pt }
  .lead { color: #4a5a50; margin-bottom: 16pt; max-width: 6.2in }
  .foot { position: absolute; left: 0.55in; right: 0.55in; bottom: 0.35in; display: flex; justify-content: space-between; font-size: 8pt; color: #6a7a70; border-top: 1px solid #e3ddcc; padding-top: 6pt }
  .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10pt }
  .card { border: 1px solid #e6e0cf; border-radius: 10pt; overflow: hidden; background: #fff; break-inside: avoid }
  .card img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; background: #f4efe3 }
  .card .b { padding: 6pt 8pt 8pt }
  .card h3 { font-size: 9.5pt; font-weight: 800; line-height: 1.2 }
  .unit { font-size: 8.5pt; color: #6a7a70; margin-top: 2pt }
  .price { font-size: 12pt; font-weight: 800; color: #15803d; margin-top: 4pt }
  .quote { font-size: 10pt; font-weight: 700; color: #6a7a70; margin-top: 5pt }
  .desc { font-size: 8pt; color: #4a5a50; margin-top: 3pt }
  .food { display: grid; grid-template-columns: 1.35in 1fr auto; gap: 12pt; align-items: center; border: 1px solid #e6e0cf; border-radius: 10pt; padding: 8pt; margin-bottom: 9pt; background: #fff }
  .food img { width: 1.35in; height: 1.05in; object-fit: cover; border-radius: 7pt }
  .food ul { margin: 4pt 0 0 12pt; font-size: 8.5pt; color: #4a5a50 }
  .food .price { margin: 0; text-align: right; font-size: 15pt }
  .tag { display: inline-block; background: ${GOLD}; color: ${GREEN}; font-weight: 800; font-size: 8pt; padding: 2pt 7pt; border-radius: 99pt; margin-bottom: 8pt; letter-spacing: 0.04em }
`;

const footer = (n) => `<div class="foot"><span><span class="brand">Bon<b>life</b></span> · Catálogo ${esc(sup.pricesUpdated)}</span>
  <span>WhatsApp <a href="https://wa.me/18299876764">+1 (829) 987-6764</a> · <a href="https://www.bonlifeoil.info">bonlifeoil.info</a></span><span>${n}</span></div>`;

const card = (p) => `<div class="card"><img src="${img(`public/suministros/${p.image}`)}" alt="">
  <div class="b"><h3><a href="https://www.bonlifeoil.info/suministros/${p.category}/${p.slug}">${esc(p.name)}</a></h3>
  <div class="unit">${esc(p.unit)}</div>
  ${p.price ? `<div class="price">${money(p.price)}</div>` : `<div class="quote">Precio por cotización</div>`}
  <div class="desc">${esc(p.description)}</div></div></div>`;

let n = 1;
const pages = [];

// 1. Cover
pages.push(`<div class="page" style="background:${GREEN};color:#fff;padding:0">
  <img src="${img("marketing/catalogo/portada.jpg")}" style="position:absolute;left:0;top:0;width:100%;height:5.35in;object-fit:cover">
  <div style="position:absolute;left:0.7in;right:0.7in;top:0.55in"><div class="brand" style="font-size:40pt;color:${GREEN}">Bon<b>life</b></div></div>
  <div style="position:absolute;left:0.7in;right:0.7in;top:5.75in">
    <div class="tag">CATÁLOGO ${esc(sup.pricesUpdated.toUpperCase())}</div>
    <div style="font-size:30pt;font-weight:800;line-height:1.08">Aceite, alimentos y suministros para hoteles, restaurantes y empresas</div>
    <div style="font-size:12.5pt;color:rgba(255,255,255,.8);margin-top:12pt;max-width:5.8in">Aceite vegetal para freír, margarina, mayonesa, papel institucional, limpieza, desechables y amenidades hoteleras. Un solo suplidor, una sola entrega.</div>
  </div>
  <div style="position:absolute;left:0.7in;right:0.7in;bottom:0.7in;display:flex;justify-content:space-between;align-items:flex-end">
    <div style="font-size:11pt;line-height:1.7">
      <div style="color:${GOLD};font-weight:800;letter-spacing:.04em;font-size:9pt">PEDIDOS</div>
      WhatsApp <a href="https://wa.me/18299876764">+1 (829) 987-6764</a><br><a href="https://www.bonlifeoil.info">www.bonlifeoil.info</a><br>Entrega a todo el país
    </div>
    <div style="text-align:center;font-size:8pt;color:rgba(255,255,255,.7)"><img src="${svg("qr-whatsapp.svg")}" style="width:1.25in;background:#fff;border-radius:6pt;display:block;margin-bottom:4pt">Pida por WhatsApp</div>
  </div>
</div>`);

// 2. How to order + delivery
n++;
pages.push(`<div class="page">
  <h2>Cómo hacer su pedido</h2>
  <p class="lead">Pida todo en un mismo mensaje: aceite, alimentos y suministros llegan juntos en la misma entrega.</p>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12pt;margin-bottom:22pt">
    ${[["1", "Elija sus productos", "Use este catálogo o la tienda en línea en bonlifeoil.info/suministros."],
       ["2", "Escríbanos por WhatsApp", "Envíe la lista con cantidades y su ciudad o sector. Le confirmamos disponibilidad y fecha de entrega."],
       ["3", "Reciba en su negocio", "Entregamos en todo el país. Para pedidos recurrentes armamos un pedido fijo semanal o mensual."]]
      .map(([k, t, d]) => `<div style="background:#f6f2e7;border-radius:10pt;padding:12pt"><div style="font-size:20pt;font-weight:800;color:${GOLD}">${k}</div><div style="font-weight:800;margin:4pt 0">${t}</div><div style="color:#4a5a50;font-size:9pt">${d}</div></div>`).join("")}
  </div>
  <h2 style="font-size:17pt">${esc(sup.delivery.headline)}</h2>
  <table style="width:100%;border-collapse:collapse;margin:8pt 0 8pt;font-size:10pt">
    ${sup.delivery.zones.map((z) => `<tr><td style="padding:7pt 0;border-bottom:1px solid #e6e0cf;font-weight:700">${esc(z.zone)}</td><td style="padding:7pt 0;border-bottom:1px solid #e6e0cf;text-align:right">${esc(z.time)}</td></tr>`).join("")}
  </table>
  <p style="color:#4a5a50">${esc(sup.delivery.note)}</p>
  <p style="color:#4a5a50;margin-top:6pt">Llegamos a ${esc(sup.delivery.cities.join(", "))} y el resto de las provincias.</p>
  <div style="display:flex;gap:22pt;align-items:center;margin-top:26pt;background:${GREEN};color:#fff;border-radius:12pt;padding:16pt 18pt">
    <img src="${svg("qr-whatsapp.svg")}" style="width:1.1in;background:#fff;border-radius:6pt">
    <div><div style="font-size:15pt;font-weight:800">Pida por WhatsApp</div><div style="color:rgba(255,255,255,.8);margin-top:3pt">Escanee el código o escriba al <a href="https://wa.me/18299876764" style="color:${GOLD};font-weight:700">+1 (829) 987-6764</a>. Precios por volumen y pedidos recurrentes para hoteles y restaurantes.</div></div>
    <img src="${svg("qr-catalogo.svg")}" style="width:1.1in;background:#fff;border-radius:6pt;margin-left:auto">
  </div>
  <p style="font-size:8pt;color:#6a7a70;margin-top:6pt;text-align:right">Tienda en línea con precios al día</p>
  ${footer(n)}
</div>`);

// 3. Oil and foods (one page)
const foodRow = (f) => `<div class="food"><img src="${img(f.image)}" alt="">
  <div><h3 style="font-size:12pt;font-weight:800">${esc(f.name)}</h3><div class="unit">${esc(f.unit)}</div><ul>${f.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul></div>
  <div class="price">${esc(f.price)}</div></div>`;
n++;
pages.push(`<div class="page"><div class="tag">ACEITE Y ALIMENTOS</div><h2>Aceite vegetal, margarina y mayonesa</h2>
  <p class="lead">Aceite para freidoras de cocinas profesionales, margarina para panadería y mayonesa para cocina y delivery.</p>
  ${foods.map(foodRow).join("")}
  ${footer(n)}</div>`);

// 4. Supplies: up to 8 cards (4 × 2) per page
for (const c of sup.categories) {
  const list = sup.products.filter((p) => p.category === c.slug);
  for (let i = 0; i < list.length; i += 8) {
    n++;
    pages.push(`<div class="page"><div class="tag">SUMINISTROS · ${esc(c.name.toUpperCase())}</div>
      <h2>${esc(c.title)}</h2>${i === 0 ? `<p class="lead">${esc(c.intro)} Precios en RD$ con ITBIS incluido.</p>` : `<p class="lead">Continuación.</p>`}
      <div class="grid">${list.slice(i, i + 8).map(card).join("")}</div>${footer(n)}</div>`);
  }
}

// 5. Back cover
pages.push(`<div class="page" style="background:${GREEN};color:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center">
  <div class="brand" style="font-size:44pt">Bon<b>life</b></div>
  <div style="font-size:15pt;margin-top:10pt;color:rgba(255,255,255,.85)">Su suplidor de cocina, limpieza y desechables en República Dominicana</div>
  <img src="${svg("qr-whatsapp.svg")}" style="width:1.6in;background:#fff;border-radius:8pt;margin:28pt 0 10pt">
  <div style="font-size:13pt;font-weight:800">WhatsApp <a href="https://wa.me/18299876764">+1 (829) 987-6764</a></div>
  <div style="margin-top:4pt"><a href="https://www.bonlifeoil.info">www.bonlifeoil.info</a> · Santo Domingo · Entrega a todo el país</div>
  <div style="position:absolute;bottom:0.5in;left:0.7in;right:0.7in;font-size:7.5pt;color:rgba(255,255,255,.55);line-height:1.5">
    Precios en pesos dominicanos vigentes en ${esc(sup.pricesUpdated)}; pueden cambiar sin previo aviso y se confirman al recibir su pedido. Los precios de suministros incluyen ITBIS.
    Las imágenes de suministros son ilustrativas; la marca y la presentación pueden variar.
  </div>
</div>`);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Catálogo Bonlife</title><style>${css}</style></head><body>${pages.join("")}</body></html>`);
await page.evaluate(() => document.fonts.ready);
const pdf = await page.pdf({ format: "Letter", printBackground: true, preferCSSPageSize: true });
writeFileSync(path.join(root, "public/catalogo-bonlife.pdf"), pdf);
// Page previews for review.
const previewDir = process.argv[2];
if (previewDir) {
  await page.setViewportSize({ width: 816, height: 1056 });
  const count = await page.evaluate(() => document.querySelectorAll(".page").length);
  for (let i = 0; i < count; i++) {
    const el = (await page.$$(".page"))[i];
    await el.screenshot({ path: path.join(previewDir, `cat-${String(i + 1).padStart(2, "0")}.png`) });
  }
}
await browser.close();
console.log(`public/catalogo-bonlife.pdf: ${pages.length} pages, ${(pdf.length / 1024 / 1024).toFixed(1)} MB`);
