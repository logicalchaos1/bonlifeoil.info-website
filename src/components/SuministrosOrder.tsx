import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, Minus, Plus, Truck } from "lucide-react";
import { DELIVERY, formatPrice, products, type Product } from "@/data/suministros";

const STORAGE_KEY = "bonlife-suministros-pedido";
const WHATSAPP = "18299876764";

type Order = Record<string, number>;

const load = (): Order => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
};

// Order quantities, kept in localStorage so they survive moving between catalog pages.
export const useOrder = () => {
  const [order, setOrder] = useState<Order>(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
    } catch {
      // Private mode or blocked storage: the order still works for this page view.
    }
  }, [order]);

  const setQty = (slug: string, qty: number) =>
    setOrder((o) => {
      const next = { ...o };
      if (qty > 0) next[slug] = Math.min(qty, 999);
      else delete next[slug];
      return next;
    });

  return { order, setQty, clear: () => setOrder({}) };
};

const shippingNote = (total: number) =>
  total >= DELIVERY.freeFrom ? "envío incluido" : `envío se cotiza; incluido desde ${formatPrice(DELIVERY.freeFrom)}`;

const whatsappLink = (order: Order) => {
  const lines = products
    .filter((p) => order[p.slug])
    .map((p) => {
      const qty = order[p.slug];
      const price = p.price ? ` = ${formatPrice(p.price * qty)}` : " (cotizar)";
      return `• ${qty} × ${p.name} (${p.unit})${price}`;
    });
  const total = products.reduce((sum, p) => sum + (p.price ?? 0) * (order[p.slug] ?? 0), 0);
  const text = [
    "Hola Bonlife, quiero hacer este pedido de suministros:",
    ...lines,
    total ? `Subtotal: ${formatPrice(total)} (${shippingNote(total)})` : "",
    "Ciudad / sector de entrega: ",
  ]
    .filter(Boolean)
    .join("\n");
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
};

export const ProductCard = ({
  product,
  qty,
  onQty,
}: {
  product: Product;
  qty: number;
  onQty: (qty: number) => void;
}) => (
  <article className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
    <img
      src={`/suministros/${product.image}`}
      alt={`${product.name}, ${product.unit.toLowerCase()} (imagen ilustrativa)`}
      width={800}
      height={800}
      loading="lazy"
      className="w-full aspect-square object-cover"
    />
    <div className="p-4 flex flex-col gap-2 flex-1">
      <h3 className="font-bold text-foreground leading-snug">{product.name}</h3>
      <p className="text-xs text-muted-foreground">{product.unit}</p>
      <p className="text-sm text-muted-foreground flex-1">{product.description}</p>
      <p className="text-lg font-bold text-primary">
        {product.price ? formatPrice(product.price) : "Precio por cotización"}
      </p>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          size="icon"
          variant="outline"
          aria-label={`Quitar uno: ${product.name}`}
          onClick={() => onQty(qty - 1)}
          disabled={qty === 0}
        >
          <Minus className="w-4 h-4" />
        </Button>
        <span className="w-8 text-center font-semibold tabular-nums" aria-live="polite">{qty}</span>
        <Button
          type="button"
          size="icon"
          variant="outline"
          aria-label={`Agregar uno: ${product.name}`}
          onClick={() => onQty(qty + 1)}
        >
          <Plus className="w-4 h-4" />
        </Button>
        <span className="text-xs text-muted-foreground ml-1">{qty ? "en su pedido" : "Agregar"}</span>
      </div>
    </div>
  </article>
);

// Sticky bar with the running order and the WhatsApp button.
export const OrderBar = ({ order, onClear }: { order: Order; onClear: () => void }) => {
  const items = Object.values(order).reduce((a, b) => a + b, 0);
  if (!items) return null;
  const total = products.reduce((sum, p) => sum + (p.price ?? 0) * (order[p.slug] ?? 0), 0);
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#0a1a0f] text-white border-t border-white/10 px-4 py-3">
      <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center gap-3 justify-between">
        <p className="text-sm">
          <strong>{items}</strong> {items === 1 ? "artículo" : "artículos"}
          {total > 0 && (
            <>
              {" · "}Subtotal <strong>{formatPrice(total)}</strong> <span className="text-white/60">({shippingNote(total)})</span>
            </>
          )}
        </p>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="ghost" className="text-white/70 hover:text-white" onClick={onClear}>
            Vaciar
          </Button>
          <a href={whatsappLink(order)} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none">
            <Button className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full">
              <MessageCircle className="w-5 h-5 mr-2" />
              Enviar pedido por WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export const DeliveryInfo = () => (
  <section className="bg-muted/40 py-12 md:py-16">
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="flex items-center gap-3 mb-6">
        <Truck className="w-7 h-7 text-primary" />
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{DELIVERY.headline}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DELIVERY.zones.map((z) => (
          <div key={z.zone} className="rounded-2xl border border-border bg-card p-5">
            <p className="font-bold text-foreground">{z.zone}</p>
            <p className="text-sm text-muted-foreground mt-1">{z.time}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground mt-4">{DELIVERY.note}</p>
    </div>
  </section>
);

export const CategoryNav = ({ current }: { current?: string }) => {
  const links = [
    { to: "/suministros", label: "Todo" },
    { to: "/suministros/papel-e-higiene", label: "Papel e higiene" },
    { to: "/suministros/limpieza", label: "Limpieza" },
    { to: "/suministros/desechables", label: "Desechables" },
    { to: "/suministros/amenidades-hoteleras", label: "Amenidades hoteleras" },
  ];
  return (
    <nav aria-label="Categorías de suministros" className="flex flex-wrap gap-2">
      {links.map((l) => (
        <Link
          key={l.to}
          to={l.to}
          aria-current={current === l.to ? "page" : undefined}
          className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
            current === l.to
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border text-foreground hover:border-primary"
          }`}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
};
