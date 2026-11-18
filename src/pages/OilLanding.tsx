import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";
import aceiteImage from "@/assets/aceite-vegetal-bonlife.jpg";
import { landingJsonLd, type Landing } from "@/data/landing";

// Shared layout for the oil keyword pages. Content lives in src/data/landing/*.json so
// scripts/prerender-pages.mjs can build the same page as static HTML.
const OilLanding = ({ page }: { page: Landing }) => {
  useSeo({ title: page.title, description: page.description, path: page.path, jsonLd: landingJsonLd(page) });
  const whatsapp = `https://wa.me/18299876764?text=${encodeURIComponent(page.whatsappText)}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="bg-[#0a1a0f] text-white pt-28 pb-14 md:pt-36 md:pb-20">
          <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">{page.h1}</h1>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">{page.lead}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={whatsapp} target="_blank" rel="noopener noreferrer">
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
            <img src={aceiteImage} alt={page.product.name} className="w-full rounded-2xl border border-border object-cover" loading="lazy" />
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">{page.priceHeading}</h2>
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
              <p className="text-sm text-muted-foreground">Precios por volumen para pedidos recurrentes.</p>
            </div>
          </div>
        </section>

        {page.sections.map((s, i) => (
          <section key={s.heading} className={i % 2 === 0 ? "bg-muted/40 py-12 md:py-16" : "py-12 md:py-16"}>
            <div className={`container mx-auto px-4 ${s.kind === "cards" ? "max-w-5xl" : "max-w-3xl"}`}>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">{s.heading}</h2>
              {s.kind === "cards" && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(s.items as { title: string; text: string }[]).map((c) => (
                    <div key={c.title} className="rounded-2xl border border-border bg-card p-5">
                      <h3 className="font-bold text-foreground mb-1">{c.title}</h3>
                      <p className="text-sm text-muted-foreground">{c.text}</p>
                    </div>
                  ))}
                </div>
              )}
              {s.kind === "list" && (
                <ul className="space-y-3">
                  {(s.items as string[]).map((t) => (
                    <li key={t} className="flex gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              )}
              {s.kind === "paragraphs" && (
                <div className="space-y-4">
                  {(s.items as string[]).map((t) => (
                    <p key={t} className="text-muted-foreground leading-relaxed">{t}</p>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}

        <section className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">{page.faqsHeading}</h2>
          <div className="space-y-6">
            {page.faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-bold text-foreground mb-2">{f.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground mt-8">
            Vea también:{" "}
            {page.related.map((r, i) => (
              <span key={r.href}>
                {i > 0 && " · "}
                <Link to={r.href} className="text-primary underline">{r.label}</Link>
              </span>
            ))}
          </p>
        </section>

        <section className="bg-[#0a1a0f] text-white py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">{page.ctaHeading}</h2>
            <p className="text-white/80">Bonlife Oil · Santo Domingo · Entrega a todo el país · +1 (829) 987-6764</p>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-block">
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

export default OilLanding;
