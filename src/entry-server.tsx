// Build-time renderer: scripts/prerender.mjs calls render(url) for every public page and
// writes the finished HTML to dist/, so visitors and Google get the full page right away.
// In the browser, main.tsx hydrates that HTML instead of drawing the page from scratch.
import { PassThrough } from "node:stream";
import type { ReactNode } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppTree } from "./App";
import { ssrSeo, SITE_URL } from "./hooks/use-seo";

export { SITE_URL };

export function render(url: string): Promise<{ html: string; seo: typeof ssrSeo.current }> {
  ssrSeo.current = null;
  const Router = ({ children }: { children: ReactNode }) => <StaticRouter location={url}>{children}</StaticRouter>;
  return new Promise((resolve, reject) => {
    let failed: unknown = null;
    const stream = renderToPipeableStream(<AppTree Router={Router} />, {
      onAllReady() {
        if (failed) return reject(failed);
        const out = new PassThrough();
        let html = "";
        out.on("data", (c) => (html += c));
        out.on("end", () => resolve({ html, seo: ssrSeo.current }));
        stream.pipe(out);
      },
      onShellError: reject,
      onError(err) {
        failed = err;
      },
    });
  });
}
