import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = document.getElementById("root")!;
// Pages built ahead of time arrive with their HTML already in #root: attach to it
// instead of redrawing. Other URLs get the empty shell and are drawn here.
if (root.dataset.ssr) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
