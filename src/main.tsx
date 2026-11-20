import { createRoot, hydrateRoot } from "react-dom/client";
import App, { queryClient } from "./App.tsx";
import "./index.css";

declare global {
  interface Window {
    __BONLIFE_DATA__?: [unknown[], unknown][];
  }
}

// Database content the page was built with (blog posts): start from the same data.
for (const [key, data] of window.__BONLIFE_DATA__ ?? []) queryClient.setQueryData(key, data);

const root = document.getElementById("root")!;
// Pages built ahead of time arrive with their HTML already in #root: attach to it
// instead of redrawing. Other URLs get the empty shell and are drawn here.
if (root.dataset.ssr) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
