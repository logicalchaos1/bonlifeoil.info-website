import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageCircle, Phone, Truck, Flame, Clock } from "lucide-react";
import { useSeo, SITE_URL } from "@/hooks/use-seo";
import aceiteImage from "@/assets/aceite-vegetal-bonlife.jpg";

const WHATSAPP_URL =
  "https://wa.me/18299876764?text=" +
  encodeURIComponent("Hola, quiero cotizar aceite para freír (garrafones de 25L).");

// Bonlife sells one frying oil; it is described as "aceite vegetal" without the oil type.
const specs = [
  { label: "Tipo", value: "Aceite 100% vegetal refinado, blanqueado y desodorizado" },
  { label: "Acidez (FFA)", value: "0.045% máx." },
  { label: "Índice de peróxido", value: "1.70 meq/kg" },
  { label: "Punto de humo", value: "230 °C" },
  { label: "Duración estimada en freidora", value: "45–56 horas" },
  { label: "Presentación", value: "Garrafón de 25 litros" },
  { label: "Vida útil", value: "2 años (cerrado)" },
];

const benefits = [
  "Dura hasta 300% más que los aceites tradicionales",
  "No transfiere sabores ni olores entre frituras",
  "Menor absorción de grasa para productos más secos y dorados",
  "Libre de colesterol y grasas trans",
  "Color dorado estable incluso tras múltiples usos",
  "Apto para freidoras industriales y comerciales",
];

const uses = [
  "Pollo frito, chicharrón y frituras de carne",
  "Papas fritas, tostones y yuca frita",
  "Empanadas, quipes, pastelitos y frituras de buffet",
  "Freidoras de restaurantes, hoteles, cafeterías y food trucks",
];

const faqs = [
  {
    q: "¿Cuál es el mejor aceite para freír en un restaurante o freidora industrial?",
    a: "Para fritura profunda y continua conviene un aceite vegetal refinado de alta estabilidad térmica, como el aceite Bonlife: tiene un punto de humo de 230 °C, no transfiere sabores entre productos y dura hasta 300% más en la freidora que un aceite común.",
  },
  {
    q: "¿Cuántas veces se puede reutilizar el aceite de freír?",
    a: "Depende del aceite, la temperatura y lo que se fríe. Con el aceite vegetal Bonlife, filtrando cada 8–10 horas, manteniendo la freidora entre 170 y 180 °C y reponiendo con aceite nuevo después de cada filtrado, la duración estimada es de 45 a 56 horas de uso. Cámbielo cuando se oscurezca demasiado, haga espuma o humee a temperatura normal.",
  },
  {
    q: "¿A qué temperatura se debe freír?",
    a: "La mayoría de las frituras profesionales se hacen entre 170 °C y 180 °C. Por encima de eso el aceite se degrada más rápido; por debajo, la comida absorbe más grasa.",
  },
  {
    q: "¿Cuánto cuesta el aceite para freír al por mayor en República Dominicana?",
    a: "El garrafón de 25 litros de aceite vegetal Bonlife cuesta $4,600 DOP. Para pedidos recurrentes de hoteles, restaurantes y cafeterías ofrecemos cotizaciones por volumen.",
  },
  {
    q: "¿Hacen entregas? ¿A qué zonas?",
    a: "Sí. Entregamos en todo el país: Santo Domingo, Santiago, Punta Cana, Bávaro, La Romana, Puerto Plata y el resto de las provincias. Escríbanos por WhatsApp al +1 (829) 987-6764 para confirmar su zona y tiempo de entrega.",
  },
  {
    q: "¿Venden aceite de freír para negocios pequeños?",
    a: "Sí. Vendemos a hoteles, restaurantes, cafeterías, food trucks, fritureras y panaderías, en garrafones de 25 litros. Escríbanos para cotizar según su volumen.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "Product",
      name: "Aceite vegetal para freír Bonlife 25L",
      description:
        "Aceite vegetal refinado para freír, garrafón de 25 litros, punto de humo 230 °C. Para hoteles, restaurantes y freidoras industriales en República Dominicana.",
      image: `${SITE_URL}/aceite-vegetal-bonlife.jpg`,
      brand: { "@type": "Brand", name: "Bonlife" },
      offers: {
        "@type": "Offer",
        price: "4600",
        priceCurrency: "DOP",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/aceite-para-freir`,
        seller: { "@id": `${SITE_URL}/#organization` },
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Aceite para freír", item: `${SITE_URL}/aceite-para-freir` },
      ],
    },
  ],
};

const AceiteParaFreir = () => {
  useSeo({
    title: "Aceite para Freír al por Mayor en RD | Garrafón 25L | Bonlife Oil",
    description:
      "Aceite vegetal para freír en garrafón de 25L a RD$4,600 para restaurantes, hoteles y freidoras industriales. Punto de humo 230 °C y 45–56 horas en freidora. Entrega a todo RD.",
    path: "/aceite-para-freir",
    jsonLd,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="bg-[#0a1a0f] text-white pt-28 pb-14 md:pt-36 md:pb-20">
          <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Aceite para freír al por mayor en República Dominicana
            </h1>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              Aceite vegetal para freír en garrafones de 25 litros, para restaurantes, hoteles, cafeterías y freidoras
              industriales. Entregamos en todo el país.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full w-full sm:w-auto">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Cotizar por WhatsApp
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
        </section>

        <section className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Flame, title: "Punto de humo 230 °C", text: "Aguanta fritura profunda sin humear ni degradarse rápido." },
              { icon: Clock, title: "45–56 horas en freidora", text: "Con filtrado cada 8–10 horas a 170–180 °C." },
              { icon: Truck, title: "Entrega a todo el país", text: "Santo Domingo, Santiago, Punta Cana y todas las provincias." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-border p-5 bg-card">
                <Icon className="w-6 h-6 text-primary mb-3" />
                <h2 className="font-bold text-foreground mb-1">{title}</h2>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-12 md:pb-16 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <img
              src={aceiteImage}
              alt="Aceite vegetal para freír Bonlife"
              className="w-full rounded-2xl border border-border object-cover"
              loading="lazy"
            />
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Aceite vegetal Bonlife para freír</h2>
              <p className="text-3xl font-bold text-primary">
                RD$4,600 <span className="text-base font-medium text-muted-foreground">· garrafón de 25 litros</span>
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Aceite 100% vegetal, refinado, blanqueado y desodorizado, hecho para frituras profundas y continuas.
                Con filtrado regular rinde un estimado de 45 a 56 horas en la freidora.
              </p>
              <ul className="space-y-2">
                {benefits.map((b) => (
                  <li key={b} className="flex gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-12">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Ficha técnica</h2>
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
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Ideal para</h2>
              <ul className="space-y-3">
                {uses.map((u) => (
                  <li key={u} className="flex gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-muted/40 py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Cómo hacer que su aceite de freír dure más
            </h2>
            <ul className="space-y-3">
              {[
                "Mantenga la freidora entre 170 °C y 180 °C. Más calor degrada el aceite; menos calor hace que la comida absorba grasa.",
                "Filtre el aceite cada 8–10 horas de uso para retirar residuos que lo queman y oscurecen.",
                "Reponga con aceite nuevo después de cada filtrado para mantener el nivel y la calidad.",
                "No sazone la comida encima de la freidora: la sal que cae al aceite acelera su degradación.",
                "Apague o baje la freidora en horas muertas en vez de dejarla a temperatura máxima.",
              ].map((tip) => (
                <li key={tip} className="flex gap-3 text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground">
              ¿Quiere saber cuánto ahorraría al cambiar de aceite? Use nuestra{" "}
              <Link to="/calculadora-ahorro" className="text-primary underline">
                calculadora de ahorro
              </Link>{" "}
              o vea el{" "}
              <Link to="/#productos" className="text-primary underline">
                catálogo completo de productos
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Preguntas frecuentes sobre aceite de freír</h2>
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
            <h2 className="text-2xl md:text-3xl font-bold">Pida su aceite para freír hoy</h2>
            <p className="text-white/80">
              Bonlife Oil · Santo Domingo, República Dominicana · +1 (829) 987-6764
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button size="lg" className="bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full">
                <MessageCircle className="w-5 h-5 mr-2" />
                Cotizar por WhatsApp
              </Button>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AceiteParaFreir;
