import { Link, Navigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useSeo, SITE_URL } from "@/hooks/use-seo";
import { CategoryNav, DeliveryInfo, OrderBar, ProductCard, useOrder } from "@/components/SuministrosOrder";
import { categories, categoryBySlug, offerSchema, PRICES_UPDATED, productsIn } from "@/data/suministros";

const SuministrosCategoria = () => {
  const { categoria = "" } = useParams<{ categoria: string }>();
  const category = categoryBySlug(categoria);
  const { order, setQty, clear } = useOrder();
  const list = category ? productsIn(category.slug) : [];

  useSeo({
    title: category ? `${category.title} | Bonlife RD` : "Suministros | Bonlife",
    description: category?.description ?? "",
    path: `/suministros/${categoria}`,
    noindex: !category,
    jsonLd: category
      ? {
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "ItemList", name: category.title, itemListElement: offerSchema(list) },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
                { "@type": "ListItem", position: 2, name: "Suministros", item: `${SITE_URL}/suministros` },
                { "@type": "ListItem", position: 3, name: category.name, item: `${SITE_URL}/suministros/${category.slug}` },
              ],
            },
          ],
        }
      : undefined,
  });

  if (!category) return <Navigate to="/suministros" replace />;

  return (
    <div className="min-h-screen bg-background pb-24">
      <Navbar />
      <main>
        <section className="bg-[#0a1a0f] text-white pt-28 pb-10 md:pt-36 md:pb-14">
          <div className="container mx-auto px-4 max-w-5xl space-y-4">
            <nav className="text-sm text-white/60">
              <Link to="/" className="hover:text-white">Inicio</Link>
              {" / "}
              <Link to="/suministros" className="hover:text-white">Suministros</Link>
              {" / "}
              <span className="text-white/90">{category.name}</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">{category.title}</h1>
            <p className="text-base sm:text-lg text-white/80 max-w-3xl">
              {category.intro} Entregamos en todo el país.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-10 max-w-5xl">
          <div className="flex flex-col gap-4 mb-6">
            <CategoryNav current={`/suministros/${category.slug}`} />
            <p className="text-sm text-muted-foreground">
              Precios en RD$ con ITBIS incluido, actualizados en {PRICES_UPDATED}. Le confirmamos el precio final y el envío al recibir su
              pedido. Imágenes ilustrativas; la marca puede variar.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map((p) => (
              <ProductCard key={p.slug} product={p} qty={order[p.slug] ?? 0} onQty={(q) => setQty(p.slug, q)} />
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 pb-12 max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-4">Cómo elegir</h2>
          <div className="space-y-3">
            {category.guide.map((g) => (
              <p key={g} className="text-muted-foreground leading-relaxed">{g}</p>
            ))}
          </div>
        </section>

        <DeliveryInfo />

        <section className="container mx-auto px-4 py-10 max-w-5xl">
          <h2 className="text-xl font-bold text-foreground mb-4">Otras categorías</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {categories
              .filter((c) => c.slug !== category.slug)
              .map((c) => (
                <Link key={c.slug} to={`/suministros/${c.slug}`} className="rounded-2xl border border-border p-5 hover:border-primary">
                  <p className="font-bold text-foreground">{c.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{productsIn(c.slug).length} productos</p>
                </Link>
              ))}
          </div>
        </section>
      </main>
      <OrderBar order={order} onClear={clear} />
    </div>
  );
};

export default SuministrosCategoria;
