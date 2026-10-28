import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { useSeo, SITE_URL } from "@/hooks/use-seo";
import palmImage from "@/assets/palm-oil-product.jpg";

const WHATSAPP_URL =
  "https://wa.me/18299876764?text=" +
  encodeURIComponent("Hola, quiero cotizar aceite de palma Bonlife (garrafón de 25L).");

const benefits = [
  "Dura hasta 300% más que los aceites tradicionales",
  "No transfiere sabores ni olores entre frituras",
  "Menor absorción de grasa para productos más secos y dorados",
  "Libre de colesterol y grasas trans",
  "Color dorado estable incluso tras múltiples usos",
  "Apto para freidoras industriales y comerciales",
];

const specs = [
  { label: "Tipo", value: "RBD Palm Olein (refinado, blanqueado y desodorizado)" },
  { label: "Acidez (FFA)", value: "0.045% máx." },
  { label: "Índice de peróxido", value: "1.70 meq/kg" },
  { label: "Punto de fusión", value: "24–39 °C" },
  { label: "Punto de humo", value: "230 °C" },
  { label: "Duración estimada en freidora", value: "45–56 horas" },
  { label: "Presentación", value: "Garrafón de 25 litros" },
  { label: "Vida útil", value: "2 años (cerrado)" },
];

const uses = [
  "Pollo frito, chicharrón y frituras de carne",
  "Papas fritas, tostones y yuca frita",
  "Empanadas, quipes, pastelitos y frituras de buffet",
  "Freidoras de restaurantes, hoteles, cafeterías y food trucks",
];

const faqs = [
  {
    q: "¿Qué es el aceite de palma RBD Palm Olein?",
    a: "Es la fracción líquida del aceite de palma, refinada, blanqueada y desodorizada (RBD). Ese proceso le quita olor, sabor y color, y lo deja estable para fritura a alta temperatura. Es el aceite de palma que se usa en cocinas profesionales para freír.",
  },
  {
    q: "¿Es bueno el aceite de palma para freír?",
    a: "Sí. Por su estabilidad térmica y su punto de humo de 230 °C, el aceite de palma aguanta fritura profunda y continua mejor que muchos aceites de semilla. Con el aceite Bonlife, la duración estimada es de 45 a 56 horas de uso con filtrado regular.",
  },
  {
    q: "¿Por qué el aceite de palma se pone sólido o turbio en frío?",
    a: "Es normal. Su punto de fusión está entre 24 y 39 °C, así que en ambientes frescos puede verse turbio o espesarse. No afecta la calidad: al calentarlo vuelve a quedar líquido y transparente.",
  },
  {
    q: "¿Cuánto cuesta el aceite de palma en República Dominicana?",
    a: "El garrafón de 25 litros de aceite de palma Bonlife cuesta $4,600 DOP. Para pedidos recurrentes de hoteles y restaurantes ofrecemos cotizaciones por volumen.",
  },
  {
    q: "¿Cómo hago que el aceite de palma dure más en la freidora?",
    a: "Filtre cada 8–10 horas de uso, mantenga la freidora entre 170 °C y 180 °C y reponga con aceite nuevo después de cada filtrado.",
  },
  {
    q: "¿Venden estearina de palma o aceite de palma a granel?",
    a: "Sí, para fabricantes. La estearina de palma (la fracción sólida) se vende a granel en cisterna, por tonelada, como ingrediente para margarinas, shortenings y panificación. Escríbanos para una cotización.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      name: "Aceite de Palma Bonlife RBD Palm Olein 25L",
      description:
        "Aceite de palma refinado (RBD Palm Olein) para freír, garrafón de 25 litros. Punto de humo 230 °C, acidez 0.045% máx., libre de grasas trans. Para hoteles, restaurantes y freidoras industriales en República Dominicana.",
      image: `${SITE_URL}/aceite-palma-para-freir.jpg`,
      brand: { "@type": "Brand", name: "Bonlife" },
      category: "Aceite vegetal para freír",
      additionalProperty: specs.map((s) => ({ "@type": "PropertyValue", name: s.label, value: s.value })),
      offers: {
        "@type": "Offer",
        price: "4600",
        priceCurrency: "DOP",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/aceite-de-palma`,
        seller: { "@id": `${SITE_URL}/#organization` },
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Aceite para freír", item: `${SITE_URL}/aceite-para-freir` },
        { "@type": "ListItem", position: 3, name: "Aceite de palma", item: `${SITE_URL}/aceite-de-palma` },
      ],
    },
  ],
};

const AceiteDePalma = () => {
  useSeo({
    title: "Aceite de Palma para Freír 25L | RBD Palm Olein | Bonlife Oil RD",
    description:
      "Aceite de palma RBD Palm Olein en garrafón de 25L a $4,600 DOP. Punto de humo 230 °C, 45–56 horas en freidora, libre de grasas trans. Entrega en Santo Domingo y Punta Cana.",
    path: "/aceite-de-palma",
    jsonLd,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="bg-[#0a1a0f] text-white pt-28 pb-14 md:pt-36 md:pb-20">
          <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-5">
              <nav className="text-sm text-white/60">
                <Link to="/" className="hover:text-white">Inicio</Link>
                {" / "}
                <Link to="/aceite-para-freir" className="hover:text-white">Aceite para freír</Link>
                {" / "}
                <span className="text-white/90">Aceite de palma</span>
              </nav>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                Aceite de palma para freír en República Dominicana
              </h1>
              <p className="text-base sm:text-lg text-white/80">
                Aceite Bonlife RBD Palm Olein: aceite 100% vegetal de palma, refinado, blanqueado y desodorizado,
                hecho para freidoras de hoteles, restaurantes y cafeterías.
              </p>
              <p className="text-2xl font-bold text-gold">
                $4,600 DOP <span className="text-base font-medium text-white/70">· garrafón de 25 litros</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full w-full sm:w-auto">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Pedir por WhatsApp
                  </Button>
                </a>
                <a href="tel:+18299876764">
                  <Button size="lg" variant="outline" className="rounded-full w-full sm:w-auto text-foreground">
                    <Phone className="w-5 h-5 mr-2" />
                    (829) 987-6764
                  </Button>
                </a>
              </div>
            </div>
            <img
              src={palmImage}
              alt="Aceite de palma Bonlife RBD Palm Olein en garrafón de 25 litros"
              className="w-full rounded-2xl object-cover aspect-video"
            />
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-16 max-w-5xl grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-5">Por qué elegir aceite de palma Bonlife</h2>
            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-5">Ficha técnica</h2>
            <table className="w-full text-sm">
              <tbody>
                {specs.map((s) => (
                  <tr key={s.label} className="border-b border-border">
                    <th scope="row" className="text-left font-medium text-foreground py-2.5 pr-4 align-top">{s.label}</th>
                    <td className="text-muted-foreground py-2.5">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-muted/40 py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-5">Ideal para</h2>
              <ul className="space-y-3">
                {uses.map((u) => (
                  <li key={u} className="flex gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-5">Recomendaciones de uso</h2>
              <p className="text-muted-foreground leading-relaxed">
                Filtre cada 8–10 horas, mantenga la temperatura entre 170 °C y 180 °C y complete con aceite nuevo
                después de cada filtrado para maximizar el rendimiento. Así se alcanzan las 45–56 horas de uso estimadas.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                ¿Cuánto ahorraría su cocina? Pruebe la{" "}
                <Link to="/calculadora-ahorro" className="text-primary underline">calculadora de ahorro</Link>{" "}
                o compare con nuestros otros{" "}
                <Link to="/aceite-para-freir" className="text-primary underline">aceites para freír</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Preguntas frecuentes sobre el aceite de palma</h2>
          <div className="space-y-6">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-bold text-foreground mb-2">{f.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#0a1a0f] text-white py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">Pida su aceite de palma hoy</h2>
            <p className="text-white/80">Bonlife Oil · Santo Domingo, República Dominicana · +1 (829) 987-6764</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full">
                <MessageCircle className="w-5 h-5 mr-2" />
                Pedir por WhatsApp
              </Button>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AceiteDePalma;
