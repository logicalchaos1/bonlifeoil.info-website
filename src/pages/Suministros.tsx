import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";
import { CategoryNav, DeliveryInfo, OrderBar, ProductCard, useOrder } from "@/components/SuministrosOrder";
import { categories, offerSchema, PRICES_UPDATED, products, productsIn } from "@/data/suministros";

const faqs = [
  {
    q: "¿Hacen entregas fuera de Santo Domingo?",
    a: "Sí. Entregamos en todo el país: Santiago, Punta Cana, Bávaro, La Romana, Puerto Plata y cualquier otra provincia. El envío está incluido en pedidos desde RD$5,000; en pedidos menores se cotiza según la zona.",
  },
  {
    q: "¿Cómo hago un pedido?",
    a: "Agregue los productos y las cantidades en esta página y pulse «Enviar pedido por WhatsApp». Le confirmamos disponibilidad, costo de envío y fecha de entrega por el mismo chat.",
  },
  {
    q: "¿Tienen precios por volumen?",
    a: "Sí. Para pedidos grandes o recurrentes (por ejemplo, un pedido mensual para su hotel o restaurante) le preparamos una cotización por volumen.",
  },
  {
    q: "¿Puedo combinar suministros con aceite para freír?",
    a: "Sí. Puede pedir suministros junto con su aceite Bonlife y lo recibe todo en la misma entrega.",
  },
];

const Suministros = () => {
  const { order, setQty, clear } = useOrder();

  useSeo({
    title: "Suministros para Hoteles y Restaurantes en RD | Entrega a Todo el País | Bonlife",
    description:
      "Papel higiénico jumbo, papel toalla, productos de limpieza, desechables y amenidades hoteleras con precios publicados y entrega a todo el país. Pida por WhatsApp.",
    path: "/suministros",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "ItemList", name: "Suministros Bonlife", itemListElement: offerSchema(products) },
        {
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        },
      ],
    },
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      <Navbar />
      <main>
        <section className="bg-[#0a1a0f] text-white pt-28 pb-12 md:pt-36 md:pb-16">
          <div className="container mx-auto px-4 max-w-4xl text-center space-y-5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Suministros para hoteles, restaurantes y empresas
            </h1>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
              Papel institucional, productos de limpieza, desechables y amenidades hoteleras con precios publicados.
              Entregamos en todo el país, junto con su aceite Bonlife.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#catalogo">
                <Button size="lg" className="bg-gold hover:bg-gold/90 text-[#0a1a0f] rounded-full w-full sm:w-auto font-bold">
                  Ver catálogo y precios
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

        <section className="container mx-auto px-4 py-10 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to={`/suministros/${c.slug}`}
                className="rounded-2xl border border-border bg-card p-5 hover:border-primary transition-colors"
              >
                <h2 className="font-bold text-foreground">{c.name}</h2>
                <p className="text-sm text-muted-foreground mt-1">{productsIn(c.slug).length} productos</p>
              </Link>
            ))}
          </div>
        </section>

        <section id="catalogo" className="container mx-auto px-4 pb-12 max-w-5xl scroll-mt-24">
          <div className="flex flex-col gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Catálogo y precios</h2>
            <CategoryNav current="/suministros" />
            <p className="text-sm text-muted-foreground">
              Precios en pesos dominicanos (RD$) con ITBIS incluido, actualizados en {PRICES_UPDATED}. Pueden cambiar sin previo aviso; le
              confirmamos el precio final al recibir su pedido. Las imágenes son ilustrativas y la marca puede variar.
            </p>
          </div>
          {categories.map((c) => (
            <div key={c.slug} className="mb-12">
              <div className="flex items-baseline justify-between gap-4 mb-4">
                <h3 className="text-xl font-bold text-foreground">{c.name}</h3>
                <Link to={`/suministros/${c.slug}`} className="text-sm text-primary underline shrink-0">
                  Ver categoría
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {productsIn(c.slug).map((p) => (
                  <ProductCard key={p.slug} product={p} qty={order[p.slug] ?? 0} onQty={(q) => setQty(p.slug, q)} />
                ))}
              </div>
            </div>
          ))}
        </section>

        <DeliveryInfo />

        <section className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Preguntas frecuentes</h2>
          <div className="space-y-6">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-bold text-foreground mb-2">{f.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground mt-8">
            ¿Busca aceite para su freidora? Vea nuestro{" "}
            <Link to="/aceite-para-freir" className="text-primary underline">aceite para freír</Link> y el{" "}
            <Link to="/aceite-de-palma" className="text-primary underline">aceite de palma de 25 litros</Link>.
          </p>
        </section>

        <section className="bg-[#0a1a0f] text-white py-12">
          <div className="container mx-auto px-4 max-w-3xl text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold">¿Necesita una cotización por volumen?</h2>
            <p className="text-white/80">Escríbanos con la lista de lo que usa al mes y le enviamos precios por volumen.</p>
            <a
              href={`https://wa.me/18299876764?text=${encodeURIComponent("Hola Bonlife, quiero una cotización por volumen de suministros.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button size="lg" className="bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full">
                <MessageCircle className="w-5 h-5 mr-2" />
                Cotizar por WhatsApp
              </Button>
            </a>
          </div>
        </section>
      </main>
      <OrderBar order={order} onClear={clear} />
    </div>
  );
};

export default Suministros;
