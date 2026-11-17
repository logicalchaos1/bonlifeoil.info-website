// Renders the 3D product mockups in mockups.html into public/suministros/*.jpg.
// Run from the repo root: node marketing/suministros/render-mockups.mjs [key ...]
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const { chromium } = createRequire(import.meta.url)("playwright");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const outDir = path.join(root, "public/suministros");
await mkdir(outDir, { recursive: true });

const KEYS = [
  "papel-higienico", "papel-toalla", "servilletas", "galon-desengrasante", "galon-lavaplatos", "galon-jabon",
  "galon-desinfectante", "galon-cloro", "galon-detergente", "galon-cristales", "fundas-basura", "guantes", "vasos",
  "bandeja-foam", "envase-deli", "envase-aluminio", "cubiertos", "sorbetes", "jabon-tocador", "amenidades",
];
const keys = process.argv.slice(2).length ? process.argv.slice(2) : KEYS;

// Serve the repo so the page can import three from node_modules.
const types = { ".html": "text/html", ".js": "text/javascript" };
const server = createServer(async (req, res) => {
  try {
    const file = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
    if (!file.startsWith(root)) throw new Error("outside root");
    res.writeHead(200, { "Content-Type": types[path.extname(file)] ?? "application/octet-stream" });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const port = server.address().port;

const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
for (const key of keys) {
  const page = await browser.newPage({ viewport: { width: 1000, height: 1000 } });
  page.on("pageerror", (e) => console.error(key, e.message));
  await page.goto(`http://127.0.0.1:${port}/marketing/suministros/mockups.html#${key}`);
  await page.waitForFunction(() => window.done === true, null, { timeout: 120000 });
  const data = await page.evaluate(() => window.output);
  await writeFile(path.join(outDir, `${key}.jpg`), Buffer.from(data.split(",")[1], "base64"));
  console.log("rendered", key);
  await page.close();
}
await browser.close();
server.close();
