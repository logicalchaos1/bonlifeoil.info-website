// Renders garrafon.html to the site's oil product image (1200 × 900):
// src/assets/aceite-vegetal-bonlife.jpg, public/aceite-vegetal-bonlife.jpg and the catalog copy.
// Run from the repo root: node marketing/aceite/render-garrafon.mjs
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const { chromium } = createRequire(import.meta.url)("playwright");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const types = { ".html": "text/html", ".js": "text/javascript" };
const server = createServer(async (req, res) => {
  try {
    const file = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
    if (!file.startsWith(root)) throw new Error("outside root");
    res.writeHead(200, { "Content-Type": types[path.extname(file)] ?? "application/octet-stream" });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404);
    res.end();
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
page.on("pageerror", (e) => console.error(e.message));
await page.goto(`http://127.0.0.1:${server.address().port}/marketing/aceite/garrafon.html`);
await page.waitForFunction(() => window.done === true, null, { timeout: 180000 });
const jpg = Buffer.from((await page.evaluate(() => window.output)).split(",")[1], "base64");
const outs = process.argv[2] ? [process.argv[2]] : ["src/assets/aceite-vegetal-bonlife.jpg", "public/aceite-vegetal-bonlife.jpg", "marketing/catalogo/aceite-vegetal.jpg"];
for (const o of outs) await writeFile(path.resolve(root, o), jpg);
console.log("rendered", outs.join(", "));
await browser.close();
server.close();
