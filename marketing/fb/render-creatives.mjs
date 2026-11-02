// Renders the 1080x1080 ad images listed in campaigns.json into marketing/fb/creatives/.
// Run: node marketing/fb/render-creatives.mjs
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

// require() also finds a globally installed Playwright, which ESM import does not.
const { chromium } = createRequire(import.meta.url)("playwright");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const asset = (f) => `data:image/jpeg;base64,${readFileSync(path.join(root, "src/assets", f)).toString("base64")}`;

// Visual content per creative. Copy stays short: Meta favors images with little text.
const designs = {
  "muestra-freir-a": { kind: "photo", img: "palm-oil-product.jpg", kicker: "Restaurantes y fritureras", title: "Muestra gratis de aceite para freír", badge: "GRATIS", foot: "Le llevamos la muestra a su negocio" },
  "muestra-freir-b": { kind: "type", kicker: "Aceite para freír Bonlife", title: "45–56 horas en la freidora", sub: "con filtrado regular", badge: "Muestra gratis", foot: "Santo Domingo · Punta Cana" },
  "palma-25l-a": { kind: "photo", img: "palm-oil-product.jpg", kicker: "Aceite de palma RBD", title: "Garrafón 25L", price: "RD$4,600", foot: "Punto de humo 230 °C · Sin grasas trans" },
  "palma-25l-b": { kind: "type", kicker: "Para restaurantes, hoteles y cafeterías", title: "Precio por volumen en aceite de palma", sub: "Garrafón de 25 litros", badge: "Cotice hoy", foot: "Entrega en Santo Domingo y Punta Cana" },
  "piloto-hoteles-a": { kind: "photo", img: "testimonial-chef.jpg", kicker: "Hoteles y resorts", title: "Prueba piloto de 15 días en su cocina", badge: "Asesoría sin costo", foot: "Con reporte de ahorro comparativo" },
  "piloto-hoteles-b": { kind: "type", kicker: "Chefs y gerentes de A&B", title: "¿Cuánto gasta su buffet en aceite?", sub: "Se lo medimos en su propia cocina", badge: "Visita técnica", foot: "Prueba piloto de 15 días" },
  "panaderias-a": { kind: "photo", img: "manteca-product.jpg", kicker: "Panaderías y reposterías", title: "Manteca vegetal Bonlife", badge: "Sin grasas trans", foot: "Mejor textura y volumen" },
  "panaderias-b": { kind: "type", kicker: "Manteca y margarina Bonlife", title: "Más volumen en su pan", sub: "Para producción diaria de panadería", badge: "Cotice hoy", foot: "Entrega en Santo Domingo y Punta Cana" },
};

const css = `
  *{margin:0;box-sizing:border-box}
  body{width:1080px;height:1080px;font-family:"Helvetica Neue",Arial,sans-serif;color:#fff;overflow:hidden}
  .card{position:relative;width:1080px;height:1080px;background:#0a1a0f;display:flex;flex-direction:column;justify-content:flex-end;padding:72px}
  .bg{position:absolute;inset:0;background-size:cover;background-position:center}
  .shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,26,15,.15) 0%,rgba(10,26,15,.55) 45%,rgba(10,26,15,.96) 100%)}
  .glow{position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(212,175,55,.28),transparent 65%);top:-260px;right:-300px}
  .brand{position:absolute;top:64px;left:72px;font-size:44px;font-weight:800;font-style:italic;letter-spacing:-1px}
  .brand span{color:#d4af37}
  .badge{position:absolute;top:58px;right:72px;background:#d4af37;color:#0a1a0f;font-weight:800;font-size:34px;padding:14px 28px;border-radius:999px}
  .z{position:relative}
  .kicker{font-size:34px;font-weight:600;color:#d4af37;text-transform:uppercase;letter-spacing:2px;margin-bottom:22px}
  h1{font-size:92px;line-height:1.02;font-weight:800;letter-spacing:-2px}
  .type h1{font-size:110px}
  .sub{font-size:44px;color:rgba(255,255,255,.85);margin-top:26px}
  .price{display:inline-block;margin-top:30px;font-size:96px;font-weight:800;color:#d4af37}
  .foot{margin-top:40px;padding-top:30px;border-top:2px solid rgba(255,255,255,.2);font-size:34px;color:rgba(255,255,255,.85)}
  .type{justify-content:center}
`;

const html = (d) => `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>
<div class="card ${d.kind}">
  ${d.kind === "photo" ? `<div class="bg" style="background-image:url(${asset(d.img)})"></div><div class="shade"></div>` : `<div class="glow"></div>`}
  <div class="brand">Bon<span>life</span></div>
  ${d.badge ? `<div class="badge">${d.badge}</div>` : ""}
  <div class="z">
    <div class="kicker">${d.kicker}</div>
    <h1>${d.title}</h1>
    ${d.sub ? `<div class="sub">${d.sub}</div>` : ""}
    ${d.price ? `<div class="price">${d.price}</div>` : ""}
    <div class="foot">${d.foot}</div>
  </div>
</div></body></html>`;

const config = JSON.parse(readFileSync(path.join(root, "supabase/functions/_shared/campaigns.json"), "utf8"));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1080 } });
for (const c of config.campaigns) {
  for (const ad of c.ads) {
    const name = ad.creative.replace(/\.png$/, "");
    if (!designs[name]) throw new Error(`No design for ${ad.creative}`);
    await page.setContent(html(designs[name]), { waitUntil: "load" });
    await page.screenshot({ path: path.join(root, "marketing/fb/creatives", ad.creative) });
    console.log("rendered", ad.creative);
  }
}
await browser.close();
