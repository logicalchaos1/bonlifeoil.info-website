import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { useSeo, SITE_URL } from "@/hooks/use-seo";
import aceiteImage from "@/assets/aceite-vegetal-bonlife.jpg";
import page from "@/data/aceite-cocina.json";

// Content lives in aceite-cocina.json so scripts/prerender-pages.mjs can build the static HTML too.

const WHATSAPP_URL =
  "https://wa.me/18299876764?text=" + encodeURIComponent("Hola, quiero cotizar aceite de cocina (garrafones de 25L).");

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      name: "Aceite de cocina vegetal Bonlife 25L",
      description: "Aceite vegetal de cocina, sabor neutro y punto de humo de 230 °C, en garrafón de 25 litros.",
      image: `${SITE_URL}/aceite-vegetal-bonlife.jpg`,
      brand: { "@type": "Brand", name: "Bonlife" },
      offers: {
        "@type": "Offer",
        price: String(page.price),
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
        { "@type": "ListItem", position: 2, name: "Aceite de cocina", item: `${SITE_URL}${page.path}` },
      ],
    },
  ],
};

const Check = ({ children }: { children: React.ReactNode }) => (
  <li className="flex gap-3 text-muted-foreground">
    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
    <span>{children}</span>
  </li>
);

const AceiteDeCocina = () => {
  useSeo({ title: page.title, description: page.description, path: page.path, jsonLd });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="bg-[#0a1a0f] text-white pt-28 pb-14 md:pt-36 md:pb-20">
          <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">{page.h1}</h1>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">{page.lead}</p>
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
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <img src={aceiteImage} alt="Aceite de cocina vegetal Bonlife" className="w-full rounded-2xl border border-border object-cover" loading="lazy" />
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Precio del aceite de cocina Bonlife</h2>
              <table className="w-full text-sm">
                <tbody>
                  {page.unitPrices.map((u) => (
                    <tr key={u.label} className="border-b border-border">
                      <th scope="row" className="text-left font-medium text-foreground py-3 pr-4">{u.label}</th>
                      <td className="text-right text-lg font-bold text-primary py-3">{u.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-sm text-muted-foreground">
                Precios por volumen para pedidos recurrentes. Vea también nuestro{" "}
                <Link to="/aceite-para-freir" className="text-primary underline">aceite para freír</Link> y la{" "}
                <Link to="/calculadora-ahorro" className="text-primary underline">calculadora de ahorro</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-muted/40 py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Un aceite de cocina para todo su menú</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {page.uses.map((u) => (
                <div key={u.title} className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="font-bold text-foreground mb-1">{u.title}</h3>
                  <p className="text-sm text-muted-foreground">{u.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-16 max-w-3xl space-y-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Cómo elegir aceite de cocina para su negocio</h2>
            <ul className="space-y-3">{page.choose.map((c) => <Check key={c}>{c}</Check>)}</ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Cómo almacenar el aceite de cocina</h2>
            <ul className="space-y-3">{page.storage.map((c) => <Check key={c}>{c}</Check>)}</ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Qué hacer con el aceite de cocina usado</h2>
            <ul className="space-y-3">{page.used.map((c) => <Check key={c}>{c}</Check>)}</ul>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-12 md:pb-16 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Preguntas frecuentes sobre aceite de cocina</h2>
          <div className="space-y-6">
            {page.faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-bold text-foreground mb-2">{f.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#0a1a0f] text-white py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">Pida su aceite de cocina hoy</h2>
            <p className="text-white/80">Bonlife Oil · Santo Domingo · Entrega a todo el país · +1 (829) 987-6764</p>
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

export default AceiteDeCocina;
