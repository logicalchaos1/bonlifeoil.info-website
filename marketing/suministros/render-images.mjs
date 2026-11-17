// Renders the Bonlife-branded product illustrations for /suministros into
// public/suministros/. Original drawings only: no supplier photos or brands.
// Run: node marketing/suministros/render-images.mjs
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

// require() also finds a globally installed Playwright, which ESM import does not.
const { chromium } = createRequire(import.meta.url)("playwright");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const outDir = path.join(root, "public/suministros");
mkdirSync(outDir, { recursive: true });

const GREEN = "#0a1a0f";
const GOLD = "#d4af37";

// A plain gallon jug; `color` is the liquid, `word` goes on a generic label.
const jug = (color, word) => `
  <g transform="translate(250 150)">
    <path d="M70 40 h160 a30 30 0 0 1 30 30 v330 a40 40 0 0 1 -40 40 h-180 a40 40 0 0 1 -40 -40 v-250 l40 -80 z" fill="${color}" opacity=".92"/>
    <path d="M70 40 h160 a30 30 0 0 1 30 30 v330 a40 40 0 0 1 -40 40 h-180 a40 40 0 0 1 -40 -40 v-250 l40 -80 z" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="6"/>
    <path d="M190 70 h40 a20 20 0 0 1 20 20 v90 a20 20 0 0 1 -20 20 h-40" fill="none" stroke="rgba(255,255,255,.75)" stroke-width="22"/>
    <rect x="110" y="0" width="80" height="48" rx="8" fill="#f4f4f4" stroke="rgba(0,0,0,.15)" stroke-width="4"/>
    <rect x="40" y="230" width="220" height="130" rx="14" fill="#ffffff" opacity=".95"/>
    <text x="150" y="292" text-anchor="middle" font-size="${word.length > 12 ? 24 : 30}" font-weight="800" fill="${GREEN}">${word}</text>
    <text x="150" y="334" text-anchor="middle" font-size="24" fill="#555">1 galón</text>
    <rect x="30" y="80" width="18" height="120" rx="9" fill="rgba(255,255,255,.35)"/>
  </g>`;

const roll = (x, y, r, core, tone = "#ffffff") => `
  <g>
    <rect x="${x - r}" y="${y}" width="${2 * r}" height="${r * 1.1}" fill="${tone}" stroke="#d9d9d9" stroke-width="4"/>
    <ellipse cx="${x}" cy="${y + r * 1.1}" rx="${r}" ry="${r * 0.35}" fill="${tone}" stroke="#d9d9d9" stroke-width="4"/>
    <ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.35}" fill="#f7f7f7" stroke="#d9d9d9" stroke-width="4"/>
    <ellipse cx="${x}" cy="${y}" rx="${core}" ry="${core * 0.35}" fill="#c8a97e"/>
  </g>`;

const art = {
  "papel-higienico": `${roll(330, 330, 120, 40)}${roll(500, 290, 120, 40)}${roll(415, 420, 120, 40)}`,
  "papel-toalla": `${roll(320, 200, 85, 30, "#fbfaf6")}${roll(320, 300, 85, 30, "#fbfaf6")}${roll(480, 200, 85, 30, "#d8b88c")}${roll(480, 300, 85, 30, "#d8b88c")}`,
  servilletas: [0, 1, 2, 3, 4, 5, 6].map((i) =>
    `<rect x="${260 + i * 6}" y="${470 - i * 38}" width="280" height="34" rx="4" fill="#ffffff" stroke="#dcdcdc" stroke-width="3"/>`).join(""),
  "galon-desengrasante": jug("#e8892b", "Desengrasante"),
  "galon-lavaplatos": jug("#b5d334", "Lavaplatos"),
  "galon-jabon": jug("#f2a7c3", "Jabón de manos"),
  "galon-desinfectante": jug("#9b7fd1", "Desinfectante"),
  "galon-cloro": jug("#e9f1f7", "Cloro"),
  "galon-detergente": jug("#3e8ed0", "Detergente"),
  "galon-cristales": jug("#7fd3ea", "Limpiacristales"),
  "fundas-basura": `
    <path d="M300 260 q100 -40 200 0 l40 260 q-140 60 -280 0 z" fill="#1b1b1b"/>
    <path d="M370 250 q30 -70 60 0" fill="none" stroke="#1b1b1b" stroke-width="26" stroke-linecap="round"/>
    <path d="M330 320 q40 120 10 200" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="10"/>`,
  guantes: `
    <path d="M330 520 v-170 q0 -20 20 -20 q20 0 20 20 v-80 q0 -22 22 -22 q22 0 22 22 v-20 q0 -22 22 -22 q22 0 22 22 v30 q0 -20 20 -20 q20 0 20 20 v110 l30 -40 q20 -20 36 -4 q12 14 -4 34 l-70 110 q-20 40 -60 40 h-60 q-50 0 -50 -50 z" fill="#dfe8f2" stroke="#9fb4c8" stroke-width="6"/>`,
  vasos: [0, 1, 2].map((i) => `
    <path d="M${300 + i * 70} ${230 + i * 30} h120 l-18 260 h-84 z" fill="#ffffff" stroke="#d0d0d0" stroke-width="5"/>
    <rect x="${296 + i * 70}" y="${222 + i * 30}" width="128" height="16" rx="6" fill="#efefef" stroke="#d0d0d0" stroke-width="4"/>`).join(""),
  "bandeja-foam": `
    <path d="M220 380 h360 l-30 120 h-300 z" fill="#ffffff" stroke="#d3d3d3" stroke-width="6"/>
    <path d="M230 370 q170 -190 340 0" fill="#fbfbfb" stroke="#d3d3d3" stroke-width="6"/>
    <line x1="400" y1="380" x2="390" y2="500" stroke="#e3e3e3" stroke-width="6"/>`,
  "envase-deli": `
    <path d="M280 300 h240 l-20 210 h-200 z" fill="rgba(220,235,245,.85)" stroke="#9cb6c9" stroke-width="6"/>
    <rect x="268" y="270" width="264" height="36" rx="12" fill="rgba(235,245,252,.95)" stroke="#9cb6c9" stroke-width="6"/>
    <path d="M300 420 q100 30 200 0 v70 h-200 z" fill="#f0c36b" opacity=".8"/>`,
  "envase-aluminio": `
    <path d="M210 360 h380 l-30 140 h-320 z" fill="#c9ced3" stroke="#9aa1a8" stroke-width="6"/>
    <rect x="200" y="300" width="400" height="44" rx="6" fill="#f5f5f5" stroke="#cfcfcf" stroke-width="6"/>
    <path d="M250 380 h300" stroke="rgba(255,255,255,.6)" stroke-width="10"/>`,
  cubiertos: `
    <g fill="#ffffff" stroke="#cfcfcf" stroke-width="6">
      <path d="M330 520 v-200 m-24 -80 v80 q0 30 24 30 q24 0 24 -30 v-80"/>
      <rect x="318" y="330" width="24" height="200" rx="10"/>
      <ellipse cx="470" cy="290" rx="44" ry="64"/>
      <rect x="458" y="340" width="24" height="190" rx="10"/>
    </g>
    <path d="M306 240 v80 M330 240 v80 M354 240 v80" stroke="#cfcfcf" stroke-width="6"/>`,
  sorbetes: [0, 1, 2, 3, 4].map((i) =>
    `<rect x="${290 + i * 46}" y="${200 + (i % 2) * 20}" width="26" height="320" rx="8" fill="${i % 2 ? "#ffffff" : "#f3e7c3"}" stroke="#d2c59c" stroke-width="4"/>`).join(""),
  "jabon-tocador": [0, 1, 2].map((i) => `
    <rect x="${250 + i * 40}" y="${400 - i * 70}" width="300" height="110" rx="40" fill="#ffffff" stroke="#e1d6b8" stroke-width="5"/>
    <rect x="${290 + i * 40}" y="${438 - i * 70}" width="220" height="34" rx="8" fill="${GOLD}" opacity=".55"/>`).join(""),
  amenidades: [["#ffffff", 260], ["#f3ead2", 360], ["#e7f1ec", 460]].map(([c, x]) => `
    <rect x="${x}" y="260" width="84" height="230" rx="26" fill="${c}" stroke="#cfc4a6" stroke-width="5"/>
    <rect x="${x + 22}" y="225" width="40" height="40" rx="8" fill="${GOLD}"/>
    <rect x="${x + 10}" y="330" width="64" height="70" rx="8" fill="#ffffff" stroke="#e5dcc4" stroke-width="3"/>`).join(""),
};

const labels = {
  "papel-higienico": "Papel higiénico jumbo",
  "papel-toalla": "Papel toalla institucional",
  servilletas: "Servilletas",
  "galon-desengrasante": "Desengrasante",
  "galon-lavaplatos": "Lavaplatos",
  "galon-jabon": "Jabón líquido de manos",
  "galon-desinfectante": "Desinfectante",
  "galon-cloro": "Cloro",
  "galon-detergente": "Detergente neutro",
  "galon-cristales": "Limpiacristales",
  "fundas-basura": "Fundas de basura",
  guantes: "Guantes desechables",
  vasos: "Vasos de foam",
  "bandeja-foam": "Bandeja foam",
  "envase-deli": "Envase deli con tapa",
  "envase-aluminio": "Envase de aluminio",
  cubiertos: "Cubiertos plásticos",
  sorbetes: "Sorbetes envueltos",
  "jabon-tocador": "Jabón de tocador",
  amenidades: "Amenidades hoteleras",
};

const page = (key) => `<!doctype html><html><head><meta charset="utf-8"><style>
  *{margin:0}body{width:800px;height:800px;font-family:"Helvetica Neue",Arial,sans-serif}
</style></head><body>
<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
  <defs><radialGradient id="bg" cx="50%" cy="42%" r="70%"><stop offset="0" stop-color="#fffdf6"/><stop offset="1" stop-color="#efe6cf"/></radialGradient></defs>
  <rect width="800" height="800" fill="url(#bg)"/>
  <ellipse cx="400" cy="560" rx="250" ry="34" fill="rgba(10,26,15,.10)"/>
  ${art[key]}
  <text x="44" y="78" font-size="40" font-weight="800" font-style="italic" fill="${GREEN}">Bon<tspan fill="${GOLD}">life</tspan></text>
  <rect y="640" width="800" height="160" fill="${GREEN}"/>
  <text x="44" y="708" font-size="40" font-weight="800" fill="#ffffff">${labels[key]}</text>
  <text x="44" y="756" font-size="24" fill="${GOLD}">Suministros · Entrega a todo el país</text>
  <text x="756" y="756" text-anchor="end" font-size="16" fill="rgba(255,255,255,.55)">Imagen ilustrativa</text>
</svg></body></html>`;

const browser = await chromium.launch();
const pg = await browser.newPage({ viewport: { width: 800, height: 800 } });
for (const key of Object.keys(art)) {
  await pg.setContent(page(key));
  await pg.screenshot({ path: path.join(outDir, `${key}.jpg`), type: "jpeg", quality: 82 });
  console.log("rendered", `${key}.jpg`);
}
await browser.close();
