// Print-ready Bonlife stickers for supplies: one PDF per sticker at real size with
// 1/8" bleed, a combined PDF for the print shop, and 300 dpi PNG proofs with the
// trim line drawn in. Run from the repo root:
//   node marketing/suministros/stickers/build-stickers.mjs
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const { chromium } = createRequire(import.meta.url)("playwright");
const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, "files");
mkdirSync(path.join(out, "proofs"), { recursive: true });

const GREEN = "#0a1a0f", GOLD = "#c9a227";
const BLEED = 0.125; // inches
const DIST = "Distribuido por Bonlife Oil · Santo Domingo, República Dominicana · Tel./WhatsApp +1 (829) 987-6764 · bonlifeoil.info";
const BASIC = "Manténgase fuera del alcance de los niños. No ingerir. En caso de contacto con los ojos, enjuague con abundante agua. Si se ingiere, no provoque el vómito y busque atención médica.";

// Gallon labels: 8" × 5" wrap-front label.
const gallons = [
  { key: "desengrasante", title: "DESENGRASANTE", sub: "Cocinas, campanas y freidoras", accent: "#d9741f",
    use: "Aplique directo o diluido sobre la superficie, deje actuar unos minutos y enjuague. En freidoras y planchas, úselo con el equipo apagado y frío.",
    warn: "Use guantes. No mezcle con otros productos químicos. " + BASIC },
  { key: "lavaplatos", title: "LAVAPLATOS", sub: "Líquido · aroma limón", accent: GREEN,
    use: "Para lavado manual de vajilla, ollas y utensilios. Diluya una pequeña cantidad en agua.",
    warn: BASIC },
  { key: "jabon-de-manos", title: "JABÓN DE MANOS", sub: "Líquido para dispensadores", accent: "#d9578c",
    use: "Rellene dispensadores de pared o de mesa. Aplique, frote y enjuague las manos con agua.",
    warn: "Solo para uso externo. " + BASIC },
  { key: "desinfectante", title: "DESINFECTANTE", sub: "Aromatizado · pisos y superficies", accent: "#5a3299",
    use: "Diluya en agua para el mapeo diario de pisos, baños y superficies lavables.",
    warn: "No mezcle con cloro ni con otros productos químicos. " + BASIC },
  { key: "cloro", title: "CLORO", sub: "Blanqueador y desinfectante", accent: "#2f6fb0",
    use: "Diluya en agua según la tarea: lencería, baños, pisos y desinfección de superficies.",
    warn: "PELIGRO: nunca mezcle con amoníaco, ácidos ni otros limpiadores; produce gases tóxicos. Use en áreas ventiladas y con guantes. " + BASIC },
  { key: "detergente-neutro", title: "DETERGENTE NEUTRO", sub: "Limpiador multiuso", accent: "#3c8bd0",
    use: "Para limpieza general de superficies delicadas: mármol, madera sellada y acero inoxidable. Diluya en agua.",
    warn: BASIC },
  { key: "limpiacristales", title: "LIMPIACRISTALES", sub: "Vidrios, espejos y vitrinas", accent: "#1f62aa",
    use: "Rellene un atomizador, aplique sobre el vidrio y seque con paño de microfibra.",
    warn: BASIC },
];

// Bands and box stickers for packaged items: [key, title, sub, width", height"].
const bands = [
  ["papel-higienico-jumbo", "PAPEL HIGIÉNICO JUMBO", "12 rollos · 350 pies", 10, 3],
  ["papel-toalla", "PAPEL TOALLA INSTITUCIONAL", "6 rollos", 10, 3],
  ["servilletas", "SERVILLETAS", "500 unidades · una hoja", 8, 2.5],
  ["fundas-55", "FUNDAS NEGRAS 55 GAL", "Paquete 100/1", 8, 2.5],
  ["fundas-30", "FUNDAS NEGRAS 30 GAL", "Paquete 100/1", 8, 2.5],
  ["vasos-foam", "VASOS FOAM 12 OZ", "25 unidades", 6, 2],
  ["guantes", "GUANTES DE VINIL", "500 unidades · talla única", 5, 3],
  ["envase-aluminio", "ENVASE DE ALUMINIO", "1.5 lb · con tapa", 4, 2],
  ["sorbetes", "SORBETES ENVUELTOS", "500 unidades", 4, 3],
  ["cubiertos", "CUBIERTOS PLÁSTICOS", "500 unidades", 4, 3],
];

const css = `
  @page { margin: 0 }
  * { margin: 0; padding: 0; box-sizing: border-box }
  html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; font-family: Inter, "Inter Display", sans-serif; color: ${GREEN} }
  .sheet { position: relative; overflow: hidden; background: #fff }
  .safe { position: absolute; inset: ${BLEED + 0.12}in }
  .brand { font-style: italic; font-weight: 800; letter-spacing: -0.02em; line-height: 1 }
  .brand b { color: ${GOLD}; font-weight: 800 }
`;

const gallonHtml = (s) => {
  const W = 8 + 2 * BLEED, H = 5 + 2 * BLEED;
  return `<div class="sheet" style="width:${W}in;height:${H}in">
    <div style="position:absolute;left:0;right:0;top:0;height:${BLEED + 1.0}in;background:${s.accent}"></div>
    <div style="position:absolute;left:0;right:0;bottom:0;height:${BLEED + 0.55}in;background:${GOLD}"></div>
    <div class="safe" style="display:flex;flex-direction:column">
      <div style="height:0.88in;display:flex;align-items:center;justify-content:center">
        <div class="brand" style="font-size:0.62in;color:#fff">Bon<b>life</b></div>
      </div>
      <div style="text-align:center;margin-top:0.18in">
        <div style="font-size:0.5in;font-weight:800;letter-spacing:0.01em;line-height:1.05">${s.title}</div>
        <div style="font-size:0.2in;font-weight:500;color:#444;margin-top:0.06in">${s.sub}</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.3in;margin-top:0.24in;font-size:0.132in;line-height:1.4;color:#222">
        <div><div style="font-weight:800;margin-bottom:0.05in">MODO DE USO</div>${s.use}</div>
        <div><div style="font-weight:800;margin-bottom:0.05in">PRECAUCIONES</div>${s.warn}</div>
      </div>
      <div style="margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;font-size:0.085in;color:#333;padding-bottom:0.08in">
        <div style="max-width:5.2in;line-height:1.3">${DIST}</div>
        <div style="text-align:right;line-height:1.6">Lote: ________<br/>Fecha: ________</div>
      </div>
      <div style="height:0.5in;display:flex;align-items:center;justify-content:center;font-size:0.24in;font-weight:800;letter-spacing:0.04em">1 GALÓN · 3.78 L</div>
    </div>
  </div>`;
};

const bandHtml = ([, title, sub, w, h]) => {
  const W = w + 2 * BLEED, H = h + 2 * BLEED;
  const brandH = h * 0.3;
  return `<div class="sheet" style="width:${W}in;height:${H}in">
    <div style="position:absolute;left:0;right:0;top:0;height:${BLEED + brandH}in;background:${GREEN}"></div>
    <div style="position:absolute;left:0;right:0;bottom:0;height:${BLEED + h * 0.1}in;background:${GOLD}"></div>
    <div style="position:absolute;left:${BLEED}in;right:${BLEED}in;top:${BLEED}in;height:${brandH}in;display:flex;align-items:center;justify-content:center">
      <div class="brand" style="font-size:${brandH * 0.62}in;color:#fff">Bon<b>life</b></div>
    </div>
    <div style="position:absolute;left:${BLEED + 0.15}in;right:${BLEED + 0.15}in;top:${BLEED + brandH}in;bottom:${BLEED + h * 0.1}in;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center">
      <div style="font-size:${Math.min(h * 0.17, (w * 1.55) / title.length)}in;font-weight:800;line-height:1.05">${title}</div>
      <div style="font-size:${h * 0.085}in;font-weight:500;color:#444;margin-top:${h * 0.03}in">${sub}</div>
      <div style="font-size:${Math.max(0.065, h * 0.035)}in;color:#555;margin-top:${h * 0.04}in">Distribuido por Bonlife Oil · Tel./WhatsApp +1 (829) 987-6764</div>
    </div>
  </div>`;
};

const items = [
  ...gallons.map((s) => ({ name: `galon-${s.key}`, w: 8, h: 5, html: gallonHtml(s) })),
  ...bands.map((b) => ({ name: `etiqueta-${b[0]}`, w: b[3], h: b[4], html: bandHtml(b) })),
];

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 300 / 96 }); // 300 dpi proofs
const pdfs = [];
for (const it of items) {
  const W = it.w + 2 * BLEED, H = it.h + 2 * BLEED;
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${it.html}</body></html>`);
  await page.evaluate(() => document.fonts.ready);
  const pdf = await page.pdf({ width: `${W}in`, height: `${H}in`, printBackground: true, pageRanges: "1" });
  writeFileSync(path.join(out, `${it.name}.pdf`), pdf);
  pdfs.push(it);
  // Proof: 300 dpi PNG with the trim line (dashed) so you can check placement.
  await page.setViewportSize({ width: Math.round(W * 96), height: Math.round(H * 96) });
  await page.evaluate(({ b }) => {
    const d = document.createElement("div");
    d.style.cssText = `position:absolute;left:${b}in;top:${b}in;right:${b}in;bottom:${b}in;outline:2px dashed #e11;pointer-events:none`;
    document.querySelector(".sheet").appendChild(d);
  }, { b: BLEED });
  await page.screenshot({ path: path.join(out, "proofs", `${it.name}.png`), clip: { x: 0, y: 0, width: W * 96, height: H * 96 }, scale: "device" });
  console.log(`${it.name}.pdf  ${it.w}" × ${it.h}" (+${BLEED}" bleed)`);
}

// All stickers in one PDF for the print shop (each page keeps its own size).
const all = pdfs.map((it) => {
  const W = it.w + 2 * BLEED, H = it.h + 2 * BLEED;
  return `<section style="width:${W}in;height:${H}in;page:p-${it.name};break-after:page">${it.html}</section>
    <style>@page p-${it.name} { size: ${W}in ${H}in; margin: 0 }</style>`;
}).join("");
await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${all}</body></html>`);
await page.evaluate(() => document.fonts.ready);
writeFileSync(path.join(out, "bonlife-stickers-todas.pdf"), await page.pdf({ printBackground: true, preferCSSPageSize: true }));
console.log("bonlife-stickers-todas.pdf");
await browser.close();
