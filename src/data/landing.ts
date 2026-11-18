// Oil keyword landing pages (/aceite-de-cocina, /aceite-vegetal). Content is JSON so the
// build's prerender step (scripts/prerender-pages.mjs) reads the same data.
import { SITE_URL } from "@/hooks/use-seo";
import aceiteDeCocina from "./landing/aceite-de-cocina.json";
import aceiteVegetal from "./landing/aceite-vegetal.json";

export type Landing = {
  path: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  breadcrumb: string;
  whatsappText: string;
  product: { name: string; description: string; price: number };
  priceHeading: string;
  unitPrices: { label: string; value: string }[];
  sections: { heading: string; kind: "cards" | "list" | "paragraphs"; items: (string | { title: string; text: string })[] }[];
  faqsHeading: string;
  faqs: { q: string; a: string }[];
  ctaHeading: string;
  related: { href: string; label: string }[];
};

export const landings = {
  aceiteDeCocina: aceiteDeCocina as Landing,
  aceiteVegetal: aceiteVegetal as Landing,
};

export const landingJsonLd = (page: Landing) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      name: page.product.name,
      description: page.product.description,
      image: `${SITE_URL}/aceite-vegetal-bonlife.jpg`,
      brand: { "@type": "Brand", name: "Bonlife" },
      offers: {
        "@type": "Offer",
        price: String(page.product.price),
        priceCurrency: "DOP",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}${page.path}`,
        seller: { "@id": `${SITE_URL}/#organization` },
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: page.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: page.breadcrumb, item: `${SITE_URL}${page.path}` },
      ],
    },
  ],
});
