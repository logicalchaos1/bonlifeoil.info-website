// Catálogo de suministros para hoteles, restaurantes y empresas.
// Precios en RD$ con ITBIS incluido, calculados sobre costo (noviembre de 2026).
// `price: null` = se vende por cotización.
import { SITE_URL } from "@/hooks/use-seo";

export const PRICES_UPDATED = "noviembre de 2026";

export const DELIVERY = {
  headline: "Entregamos en todo el país",
  zones: [
    { zone: "Gran Santo Domingo", time: "24 a 48 horas" },
    { zone: "Santiago, Punta Cana, Bávaro, La Romana y Puerto Plata", time: "2 a 3 días hábiles" },
    { zone: "Resto del país", time: "3 a 5 días hábiles" },
  ],
  freeFrom: 5000,
  note: "Envío incluido a todo el país en pedidos desde RD$5,000. En pedidos menores, el envío se cotiza según la zona.",
};

export type CategorySlug = "papel-e-higiene" | "limpieza" | "desechables" | "amenidades-hoteleras";

export type Category = {
  slug: CategorySlug;
  name: string;
  title: string;
  description: string;
  intro: string;
};

export const categories: Category[] = [
  {
    slug: "papel-e-higiene",
    name: "Papel e higiene",
    title: "Papel higiénico jumbo y papel toalla institucional al por mayor",
    description:
      "Papel higiénico jumbo, papel toalla institucional y servilletas para hoteles, restaurantes y oficinas. Precios por fardo y entrega a todo el país.",
    intro:
      "Papel para baños de alto tráfico, cocinas y áreas de servicio. Presentaciones institucionales que rinden más y se reponen menos.",
  },
  {
    slug: "limpieza",
    name: "Limpieza",
    title: "Productos de limpieza institucional por galón",
    description:
      "Desengrasante, desinfectante, cloro, lavaplatos, jabón de manos y fundas de basura para cocinas y hoteles. Precios por galón y entrega a todo el país.",
    intro:
      "Químicos por galón para cocina, housekeeping y áreas comunes, más fundas de basura y guantes para el día a día.",
  },
  {
    slug: "desechables",
    name: "Desechables",
    title: "Desechables para restaurantes: envases, vasos y cubiertos",
    description:
      "Envases foam y plásticos, vasos, cubiertos, sorbetes y envases de aluminio para restaurantes, cafeterías y delivery. Entrega a todo el país.",
    intro: "Todo lo que su negocio necesita para despachar comida para llevar y delivery, en cajas por volumen.",
  },
  {
    slug: "amenidades-hoteleras",
    name: "Amenidades hoteleras",
    title: "Amenidades hoteleras: jabones y kits para huéspedes",
    description:
      "Jabones de tocador, shampoo y kits de amenidades para hoteles, villas y Airbnb, también con el logo de su hotel. Cotice por volumen.",
    intro: "Jabones y amenidades para habitaciones, por caja. También preparamos kits con la marca de su hotel.",
  },
];

export type Product = {
  slug: string;
  category: CategorySlug;
  name: string;
  unit: string;
  price: number | null;
  description: string;
  image: string;
};

export const products: Product[] = [
  // Papel e higiene
  {
    slug: "papel-higienico-jumbo-12",
    category: "papel-e-higiene",
    name: "Papel higiénico jumbo institucional",
    unit: "Fardo de 12 rollos de 350 pies",
    price: 1390,
    description: "Rollos jumbo para dispensador en baños de alto tráfico.",
    image: "papel-higienico.jpg",
  },
  {
    slug: "papel-higienico-jumbo-6-400m",
    category: "papel-e-higiene",
    name: "Papel higiénico jumbo de alto rendimiento",
    unit: "Fardo de 6 rollos de 400 metros",
    price: 3990,
    description: "Rollos de 400 m para hoteles, plazas y oficinas grandes. Menos cambios de rollo.",
    image: "papel-higienico.jpg",
  },
  {
    slug: "papel-toalla-institucional-6",
    category: "papel-e-higiene",
    name: "Papel toalla institucional precortado",
    unit: "Paquete de 6 rollos de 300 pies",
    price: 1790,
    description: "Para dispensadores de baño y cocina.",
    image: "papel-toalla.jpg",
  },
  {
    slug: "papel-toalla-kraft-6",
    category: "papel-e-higiene",
    name: "Papel toalla industrial kraft",
    unit: "Paquete de 6 rollos de 600 pies",
    price: 4660,
    description: "Rollo kraft reciclado de alto rendimiento para cocinas y talleres.",
    image: "papel-toalla.jpg",
  },
  {
    slug: "servilletas-500",
    category: "papel-e-higiene",
    name: "Servilletas blancas",
    unit: "Paquete de 500 unidades",
    price: 215,
    description: "Servilletas de una hoja para mesas, buffet y despacho.",
    image: "servilletas.jpg",
  },
  // Limpieza
  {
    slug: "desengrasante-galon",
    category: "limpieza",
    name: "Desengrasante",
    unit: "Galón",
    price: 490,
    description: "Para campanas, freidoras, planchas y pisos de cocina.",
    image: "galon-desengrasante.jpg",
  },
  {
    slug: "lavaplatos-galon",
    category: "limpieza",
    name: "Lavaplatos líquido limón",
    unit: "Galón",
    price: 335,
    description: "Lavaplatos concentrado para fregaderos de cocina comercial.",
    image: "galon-lavaplatos.jpg",
  },
  {
    slug: "jabon-manos-galon",
    category: "limpieza",
    name: "Jabón líquido de manos",
    unit: "Galón",
    price: 385,
    description: "Para rellenar dispensadores de baños y cocina. Varios aromas.",
    image: "galon-jabon.jpg",
  },
  {
    slug: "desinfectante-galon",
    category: "limpieza",
    name: "Desinfectante aromatizado",
    unit: "Galón",
    price: 260,
    description: "Para pisos y superficies. Lavanda, floral, manzana o brisa marina.",
    image: "galon-desinfectante.jpg",
  },
  {
    slug: "cloro-galon",
    category: "limpieza",
    name: "Cloro",
    unit: "Galón",
    price: 155,
    description: "Blanqueador y desinfectante para lencería, baños y pisos.",
    image: "galon-cloro.jpg",
  },
  {
    slug: "detergente-neutro-galon",
    category: "limpieza",
    name: "Detergente líquido neutro",
    unit: "Galón",
    price: 325,
    description: "Limpieza general de superficies delicadas sin dañar acabados.",
    image: "galon-detergente.jpg",
  },
  {
    slug: "limpiacristales-galon",
    category: "limpieza",
    name: "Limpiacristales",
    unit: "Galón",
    price: 560,
    description: "Para vidrios, espejos y puertas de cristal sin dejar marcas.",
    image: "galon-cristales.jpg",
  },
  {
    slug: "fundas-55-galones-100",
    category: "limpieza",
    name: "Fundas negras de 55 galones",
    unit: "Paquete de 100, calibre 100",
    price: 1535,
    description: "Fundas resistentes para tanques de basura de cocina y exteriores.",
    image: "fundas-basura.jpg",
  },
  {
    slug: "fundas-30-galones-100",
    category: "limpieza",
    name: "Fundas negras de 30 galones",
    unit: "Paquete de 100",
    price: 940,
    description: "Para zafacones de habitaciones, oficinas y áreas comunes.",
    image: "fundas-basura.jpg",
  },
  {
    slug: "guantes-vinil-500",
    category: "limpieza",
    name: "Guantes de vinil desechables",
    unit: "Caja de 500, talla única",
    price: 575,
    description: "Para manipulación de alimentos y limpieza.",
    image: "guantes.jpg",
  },
  // Desechables
  {
    slug: "vasos-foam-12oz-1000",
    category: "desechables",
    name: "Vasos de foam 12 oz",
    unit: "Caja de 1,000 (40 paquetes de 25)",
    price: 6935,
    description: "Para café, jugos y bebidas frías o calientes.",
    image: "vasos.jpg",
  },
  {
    slug: "bandeja-foam-7x8-200",
    category: "desechables",
    name: "Bandeja foam 7×8 con división",
    unit: "Caja de 200",
    price: 3155,
    description: "El envase clásico de comida para llevar.",
    image: "bandeja-foam.jpg",
  },
  {
    slug: "envase-deli-16oz-50",
    category: "desechables",
    name: "Envase deli transparente 16 oz con tapa",
    unit: "50 envases + 50 tapas",
    price: 990,
    description: "Para sopas, ensaladas, salsas y meal prep.",
    image: "envase-deli.jpg",
  },
  {
    slug: "envase-aluminio-1-5lb-125",
    category: "desechables",
    name: "Envase de aluminio 1.5 lb con tapa",
    unit: "Caja de 125",
    price: 3470,
    description: "Para hornear, catering y comida caliente para llevar.",
    image: "envase-aluminio.jpg",
  },
  {
    slug: "cubiertos-plasticos-500",
    category: "desechables",
    name: "Cubiertos plásticos blancos",
    unit: "500 unidades (tenedores o cucharas)",
    price: 1390,
    description: "Tenedores o cucharas desechables para delivery y eventos.",
    image: "cubiertos.jpg",
  },
  {
    slug: "sorbetes-envueltos-500",
    category: "desechables",
    name: "Sorbetes envueltos",
    unit: "Caja de 500",
    price: 350,
    description: "Sorbetes plásticos envueltos individualmente.",
    image: "sorbetes.jpg",
  },
  // Amenidades hoteleras
  {
    slug: "jabon-tocador-12g-850",
    category: "amenidades-hoteleras",
    name: "Jabón de tocador 12 g",
    unit: "Caja de 850 unidades",
    price: null,
    description: "Jabón individual envuelto para habitaciones.",
    image: "jabon-tocador.jpg",
  },
  {
    slug: "jabon-tocador-21g-600",
    category: "amenidades-hoteleras",
    name: "Jabón de tocador 21 g",
    unit: "Caja de 600 unidades",
    price: null,
    description: "Tamaño estándar para hoteles y resorts.",
    image: "jabon-tocador.jpg",
  },
  {
    slug: "kit-amenidades-personalizado",
    category: "amenidades-hoteleras",
    name: "Kit de amenidades con su logo",
    unit: "Shampoo, acondicionador, gel y kit dental",
    price: null,
    description: "Amenidades con la marca de su hotel o villa. Pedido mínimo según presentación.",
    image: "amenidades.jpg",
  },
];

export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
export const productsIn = (slug: CategorySlug) => products.filter((p) => p.category === slug);

export const formatPrice = (n: number) => `RD$${n.toLocaleString("en-US")}`;

// schema.org ItemList entries for a list of products.
export const offerSchema = (list: Product[]) =>
  list.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: `${p.name} (${p.unit})`,
      description: p.description,
      image: `${SITE_URL}/suministros/${p.image}`,
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
    },
  }));
