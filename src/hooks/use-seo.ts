import { useEffect } from "react";

// Canonical host. The apex domain 308-redirects here, so every canonical,
// og:url and sitemap entry must use www or Google only sees redirects.
export const SITE_URL = "https://www.bonlifeoil.info";

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  jsonLd?: object;
};

const setMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setCanonical = (href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
};

export const useSeo = ({ title, description, path, noindex, jsonLd }: SeoOptions) => {
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, follow" : "index, follow");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setCanonical(url);

    let script: HTMLScriptElement | null = null;
    if (jsonLdString) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seo = "page";
      script.textContent = jsonLdString;
      document.head.appendChild(script);
    }
    return () => {
      script?.remove();
      // Pages without useSeo must not inherit a previous page's noindex.
      setMeta("name", "robots", "index, follow");
    };
  }, [title, description, path, noindex, jsonLdString]);
};
