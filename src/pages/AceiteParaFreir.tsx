import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageCircle, Phone, Truck, Flame, Clock } from "lucide-react";
import { useSeo, SITE_URL } from "@/hooks/use-seo";
import palmImage from "@/assets/palm-oil-product.jpg";
import soyaImage from "@/assets/soya-oil-product.jpg";
import sunflowerImage from "@/assets/sunflower-oil-product.jpg";

const WHATSAPP_URL =
  "https://wa.me/18299876764?text=" +
  encodeURIComponent("Hola, quiero cotizar aceite para freír (garrafones de 25L).");

const oils = [
  {
    name: "Aceite de Palma (RBD Palm Olein) para freír",
    href: "/aceite-de-palma",
    image: palmImage,
    price: "$4,600 DOP · garrafón 25L",
    smokePoint: "230 °C",
    text: "Nuestro aceite de mayor rendimiento en freidora. Hecho para frituras profundas y continuas: pollo, papas, tostones, empanadas y frituras de buffet. Duración estimada de 45–56 horas de uso con filtrado regular.",
  },
  {
    name: "Aceite de Soya",
    image: soyaImage,
    price: "$4,000 DOP · garrafón 25L",
    smokePoint: "220 °C",
    text: "Aceite vegetal refinado de sabor neutro para salteados, frituras rápidas, salsas y cocina general del día a día.",
  },
  {
    name: "Aceite de Girasol alto oleico",
    image: sunflowerImage,
    price: "$4,000 DOP · garrafón 25L",
    smokePoint: "232 °C",
    text: "Alto en ácido oleico y vitamina E, con buena estabilidad térmica. Ideal para frituras ligeras, repostería y cocina saludable.",
  },
];

const faqs = [
  {
    q: "¿Cuál es el mejor aceite para freír en un restaurante o freidora industrial?",
    a: "Para fritura profunda y continua, el aceite de palma refinado (RBD Palm Olein) es el más rendidor: tiene un punto de humo de 230 °C, no transfiere sabores entre productos y dura mucho más en la freidora que un aceite de soya o maíz común. Para frituras rápidas y salteados, el aceite de soya o de girasol alto oleico son buenas opciones.",
  },
  {
    q: "¿Cuántas veces se puede reutilizar el aceite de freír?",
    a: "Depende del aceite, la temperatura y lo que se fríe. Con aceite de palma Bonlife, filtrando cada 8–10 horas, manteniendo la freidora entre 170 y 180 °C y reponiendo con aceite nuevo después de cada filtrado, la duración estimada es de 45 a 56 horas de uso. Cámbielo cuando se oscurezca demasiado, haga espuma o humee a temperatura normal.",
  },
  {
    q: "¿A qué temperatura se debe freír?",
    a: "La mayoría de las frituras profesionales se hacen entre 170 °C y 180 °C. Por encima de eso el aceite se degrada más rápido; por debajo, la comida absorbe más grasa.",
  },
  {
    q: "¿Cuánto cuesta el aceite para freír al por mayor en República Dominicana?",
    a: "El garrafón de 25 litros de aceite de palma Bonlife cuesta $4,600 DOP y el de soya o girasol $4,000 DOP. Para pedidos recurrentes de hoteles, restaurantes y cafeterías ofrecemos cotizaciones por volumen.",
  },
  {
    q: "¿Hacen entregas? ¿A qué zonas?",
    a: "Sí. Entregamos en Santo Domingo, Punta Cana y las principales zonas turísticas del país. Escríbanos por WhatsApp al +1 (829) 987-6764 para confirmar su zona y tiempo de entrega.",
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
      name: "Aceite para freír Bonlife RBD Palm Olein 25L",
      description:
        "Aceite vegetal de palma refinado para freír, garrafón de 25 litros, punto de humo 230 °C. Para hoteles, restaurantes y freidoras industriales en República Dominicana.",
      image: `${SITE_URL}/aceite-palma-para-freir.jpg`,
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
      "Aceite de freír para restaurantes, hoteles y freidoras en República Dominicana. Palma, soya y girasol en garrafón de 25L desde $4,000 DOP. Entrega en Santo Domingo y Punta Cana.",
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
              Aceite de freír para restaurantes, hoteles, cafeterías y freidoras industriales. Garrafones de 25 litros
              de aceite de palma, soya y girasol, con entrega en Santo Domingo, Punta Cana y zonas turísticas.
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
              { icon: Truck, title: "Entrega a domicilio", text: "Santo Domingo, Punta Cana y zonas turísticas." },
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
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Nuestros aceites de freír y precios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {oils.map((oil) => (
              <article key={oil.name} className="rounded-2xl border border-border overflow-hidden bg-card">
                <img
                  src={oil.image}
                  alt={`${oil.name} Bonlife en garrafón de 25 litros`}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-5 space-y-2">
                  <h3 className="font-bold text-foreground">
                    {oil.href ? (
                      <Link to={oil.href} className="hover:text-primary">{oil.name}</Link>
                    ) : (
                      oil.name
                    )}
                  </h3>
                  <p className="text-sm font-semibold text-primary">{oil.price}</p>
                  <p className="text-xs text-muted-foreground">Punto de humo: {oil.smokePoint}</p>
                  <p className="text-sm text-muted-foreground">{oil.text}</p>
                </div>
              </article>
            ))}
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
