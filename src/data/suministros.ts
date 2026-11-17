// Catálogo de suministros para hoteles, restaurantes y empresas.
// Los datos viven en suministros-catalog.json (generado por
// marketing/suministros/build-catalog.py) para que el prerender del build los lea también.
// Precios en RD$ con ITBIS incluido; `price: null` = se vende por cotización.
import { SITE_URL } from "@/hooks/use-seo";
import catalog from "./suministros-catalog.json";

export type CategorySlug = "papel-e-higiene" | "limpieza" | "desechables" | "amenidades-hoteleras";

export type Category = {
  slug: CategorySlug;
  name: string;
  title: string;
  description: string;
  intro: string;
  guide: string[];
};

export type Product = {
  slug: string;
  category: CategorySlug;
  name: string;
  unit: string;
  price: number | null;
  description: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  specs: { label: string; value: string }[];
  uses: string[];
  faqs: { q: string; a: string }[];
};

export const PRICES_UPDATED = catalog.pricesUpdated;
export const DELIVERY = catalog.delivery;
export const categories = catalog.categories as Category[];
export const products = catalog.products as Product[];

export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
export const productsIn = (slug: CategorySlug) => products.filter((p) => p.category === slug);
export const productBySlug = (category: string, slug: string) =>
  products.find((p) => p.category === category && p.slug === slug);
export const productPath = (p: Product) => `/suministros/${p.category}/${p.slug}`;

export const formatPrice = (n: number) => `RD$${n.toLocaleString("en-US")}`;

// Shipping questions every product page answers, on top of its own FAQs.
export const deliveryFaqs = (p: Product) => [
  {
    q: `¿Entregan ${p.name.toLowerCase()} fuera de Santo Domingo?`,
    a: `Sí. Entregamos en todo el país, incluyendo ${DELIVERY.cities.slice(1, 8).join(", ")} y el resto de las provincias. ${DELIVERY.note}`,
  },
  {
    q: "¿Tienen precio por volumen?",
    a: "Sí. Para pedidos grandes o recurrentes le preparamos una cotización por volumen por WhatsApp.",
  },
];

const productSchema = (p: Product) => ({
  "@type": "Product",
  name: `${p.name} (${p.unit})`,
  description: p.description,
  image: `${SITE_URL}/suministros/${p.image}`,
  url: `${SITE_URL}${productPath(p)}`,
  ...(p.price
    ? {
        offers: {
          "@type": "Offer",
          price: String(p.price),
          priceCurrency: "DOP",
          availability: "https://schema.org/InStock",
          areaServed: { "@type": "Country", name: "República Dominicana" },
          seller: { "@id": `${SITE_URL}/#organization` },
        },
      }
    : {}),
});

// schema.org ItemList entries for a list of products.
export const offerSchema = (list: Product[]) =>
  list.map((p, i) => ({ "@type": "ListItem", position: i + 1, item: productSchema(p) }));

export const productPageSchema = (p: Product) => ({
  "@context": "https://schema.org",
  "@graph": [
    productSchema(p),
    {
      "@type": "FAQPage",
      mainEntity: [...p.faqs, ...deliveryFaqs(p)].map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Suministros", item: `${SITE_URL}/suministros` },
        { "@type": "ListItem", position: 3, name: categoryBySlug(p.category)!.name, item: `${SITE_URL}/suministros/${p.category}` },
        { "@type": "ListItem", position: 4, name: p.name, item: `${SITE_URL}${productPath(p)}` },
      ],
    },
  ],
});
