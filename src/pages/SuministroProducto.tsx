import { Link, Navigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Minus, Plus } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";
import { DeliveryInfo, OrderBar, ProductCard, useOrder } from "@/components/SuministrosOrder";
import {
  categoryBySlug,
  deliveryFaqs,
  formatPrice,
  PRICES_UPDATED,
  productBySlug,
  productPath,
  productPageSchema,
  productsIn,
} from "@/data/suministros";

const SuministroProducto = () => {
  const { categoria = "", producto = "" } = useParams<{ categoria: string; producto: string }>();
  const product = productBySlug(categoria, producto);
  const category = product ? categoryBySlug(product.category) : undefined;
  const { order, setQty, clear } = useOrder();

  useSeo({
    title: product?.seoTitle ?? "Suministros | Bonlife",
    description: product?.seoDescription ?? "",
    path: product ? productPath(product) : `/suministros/${categoria}/${producto}`,
    noindex: !product,
    jsonLd: product ? productPageSchema(product) : undefined,
  });

  if (!product || !category) return <Navigate to={categoryBySlug(categoria) ? `/suministros/${categoria}` : "/suministros"} replace />;

  const qty = order[product.slug] ?? 0;
  const related = productsIn(product.category).filter((p) => p.slug !== product.slug).slice(0, 3);
  const faqs = [...product.faqs, ...deliveryFaqs(product)];

  return (
    <div className="min-h-screen bg-background pb-24">
      <Navbar />
      {/* Dark band so the transparent navbar's white text stays readable. */}
      <div className="bg-[#0a1a0f] h-20 md:h-24" />
      <main className="pt-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <nav className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Inicio</Link>
            {" / "}
            <Link to="/suministros" className="hover:text-primary">Suministros</Link>
            {" / "}
            <Link to={`/suministros/${category.slug}`} className="hover:text-primary">{category.name}</Link>
            {" / "}
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <img
              src={`/suministros/${product.image}`}
              alt={`${product.name}, ${product.unit.toLowerCase()} (imagen ilustrativa)`}
              width={1000}
              height={1000}
              className="w-full rounded-2xl border border-border aspect-square object-cover"
            />
            <div className="space-y-5">
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight">{product.name}</h1>
              <p className="text-muted-foreground">{product.unit}</p>
              <p className="text-3xl font-bold text-primary">
                {product.price ? formatPrice(product.price) : "Precio por cotización"}
              </p>
              <p className="text-xs text-muted-foreground">
                {product.price ? `ITBIS incluido · Precio actualizado en ${PRICES_UPDATED}. ` : ""}
                Imagen ilustrativa; la marca y la presentación pueden variar.
              </p>
              <div className="flex items-center gap-3">
                <Button type="button" size="icon" variant="outline" aria-label="Quitar uno" onClick={() => setQty(product.slug, qty - 1)} disabled={qty === 0}>
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-10 text-center text-lg font-semibold tabular-nums" aria-live="polite">{qty}</span>
                <Button type="button" size="icon" variant="outline" aria-label="Agregar uno" onClick={() => setQty(product.slug, qty + 1)}>
                  <Plus className="w-4 h-4" />
                </Button>
                {qty === 0 && (
                  <Button type="button" className="rounded-full" onClick={() => setQty(product.slug, 1)}>
                    Agregar al pedido
                  </Button>
                )}
              </div>
              <p className="text-foreground leading-relaxed">{product.intro}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-12">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Especificaciones</h2>
              <table className="w-full text-sm">
                <tbody>
                  {product.specs.map((s) => (
                    <tr key={s.label} className="border-b border-border">
                      <th scope="row" className="text-left font-medium text-foreground py-2.5 pr-4 align-top">{s.label}</th>
                      <td className="text-muted-foreground py-2.5">{s.value}</td>
                    </tr>
                  ))}
                  {product.price && (
                    <tr className="border-b border-border">
                      <th scope="row" className="text-left font-medium text-foreground py-2.5 pr-4">Precio</th>
                      <td className="text-muted-foreground py-2.5">{formatPrice(product.price)} con ITBIS</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">Ideal para</h2>
              <ul className="space-y-3">
                {product.uses.map((u) => (
                  <li key={u} className="flex gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <div className="mt-12">
          <DeliveryInfo />
        </div>

        <section className="container mx-auto px-4 py-12 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Preguntas frecuentes</h2>
          <div className="space-y-6">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-bold text-foreground mb-2">{f.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="container mx-auto px-4 pb-12 max-w-5xl">
            <div className="flex items-baseline justify-between gap-4 mb-4">
              <h2 className="text-2xl font-bold text-foreground">Más en {category.name.toLowerCase()}</h2>
              <Link to={`/suministros/${category.slug}`} className="text-sm text-primary underline shrink-0">Ver todo</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} qty={order[p.slug] ?? 0} onQty={(q) => setQty(p.slug, q)} />
              ))}
            </div>
          </section>
        )}
      </main>
      <OrderBar order={order} onClear={clear} />
    </div>
  );
};

export default SuministroProducto;
