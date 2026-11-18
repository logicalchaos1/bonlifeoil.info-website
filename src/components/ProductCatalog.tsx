import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import aceiteImage from "@/assets/aceite-vegetal-bonlife.jpg";
import margarineImage from "@/assets/margarine-product.jpg";
import mayonesaImage from "@/assets/mayonesa-product.jpg";
import mayonesaSachetsImage from "@/assets/mayonesa-sachets-product.jpg";

type ProductSpec = {
  label: string;
  value: string;
};

type ProductNote = {
  label: string;
  value: string;
};

type Product = {
  id: string;
  tabLabel: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  price: string;
  benefits: string[];
  specs?: ProductSpec[];
  extraTitle?: string;
  extraText?: string;
  notes: ProductNote[];
};

const products: Product[] = [
  {
    id: "aceite",
    tabLabel: "Aceite Vegetal",
    name: "Aceite Vegetal Bonlife",
    tagline: "Aceite virgen de alto rendimiento para uso industrial y comercial",
    description:
      "Aceite 100% vegetal, refinado, blanqueado y desodorizado con mínimo de aditivos para ofrecer pureza, estabilidad térmica y mejor rendimiento en fritura.",
    image: aceiteImage,
    price: "$4,600 DOP",
    benefits: [
      "Dura hasta 300% más que los aceites tradicionales",
      "No transfiere sabores ni olores entre frituras",
      "Menor absorción de grasa para productos más secos y dorados",
      "Libre de colesterol y grasas trans",
      "Color dorado estable incluso tras múltiples usos",
      "Apto para freidoras industriales y comerciales",
    ],
    specs: [
      { label: "Acidez (FFA)", value: "0.045% max." },
      { label: "Índice de Peróxido", value: "1.70 meq/kg" },
      { label: "Punto de Fusión", value: "24–39 °C" },
      { label: "Punto de Humo", value: "230 °C" },
      { label: "Duración estimada", value: "45–56 horas" },
    ],
    extraTitle: "Recomendaciones de uso",
    extraText:
      "Filtrar cada 8–10 horas, mantener temperatura entre 170–180 °C y completar con aceite nuevo después de cada filtrado para maximizar el rendimiento.",
    notes: [
      { label: "Presentaciones", value: "25L" },
      { label: "Vida útil", value: "2 años (cerrado)" },
    ],
  },
  {
    id: "margarina",
    tabLabel: "Margarina",
    name: "Margarina Bonlife",
    tagline: "Alternativa saludable enriquecida con vitaminas",
    description:
      "Margarina de base vegetal enriquecida con vitaminas, pensada para aportar cremosidad, sabor y rendimiento en cocina, panificación y servicio.",
    image: margarineImage,
    price: "$3,570 DOP",
    benefits: [
      "Bajo contenido de grasas trans",
      "Aporta cremosidad y sabor natural",
      "Ideal para untar, hornear y cocinar",
    ],
    specs: [
      { label: "FFA (max %)", value: "0.2%" },
      { label: "M&I (max %)", value: "0.16%" },
      { label: "IV", value: "40–44" },
      { label: "Mezcla grasa mínima", value: "80%" },
    ],
    notes: [
      { label: "Presentaciones", value: "15kg" },
      { label: "Vida útil", value: "2 años (cerrado)" },
    ],
  },
  {
    id: "mayonesa",
    tabLabel: "Mayonesa",
    name: "Mayonesa Bonlife",
    tagline: "Elaborada con limón y huevo, cremosidad y sabor consistente",
    description:
      "Mayonesa elaborada con aceite vegetal de soya refinado, huevo y limón, formulada para uso en cocinas profesionales, sándwiches, ensaladas y salsas base. Textura cremosa y sabor equilibrado en presentación de alto rendimiento para servicio de volumen.",
    image: mayonesaImage,
    price: "$4,000 DOP/Caja (4x1 galón)",
    benefits: [
      "Elaborada con limón y huevo para sabor tradicional",
      "Presentación de alto rendimiento para uso profesional",
      "Ideal para sándwiches, ensaladas y salsas base",
    ],
    notes: [
      { label: "Presentación", value: "Caja de 4 x 1 galón (8 lb c/u)" },
      { label: "Vida útil", value: "Ver fecha de vencimiento en el envase" },
    ],
  },
  {
    id: "mayonesa-sachets",
    tabLabel: "Mayonesa Sachets",
    name: "Mayonesa Bonlife en Sachets",
    tagline: "Porciones individuales de 12 ml, mismo producto que el galón",
    description:
      "La misma Mayonesa Bonlife elaborada con aceite vegetal de soya refinado, huevo y limón, en presentación de sachets individuales de 12 ml. Ideal para servicio a la mesa, delivery, combos y porciones controladas en restaurantes y hoteles.",
    image: mayonesaSachetsImage,
    price: "$2,500 DOP/Caja (144 sachets x 12ml)",
    benefits: [
      "Mismo sabor y calidad que la Mayonesa Bonlife de galón",
      "Porciones individuales higiénicas, listas para servir",
      "Ideal para delivery, combos y servicio a la mesa",
    ],
    notes: [
      { label: "Presentación", value: "Caja de 12 packs x 12 sachets (144 x 12 ml)" },
      { label: "Vida útil", value: "Ver fecha de vencimiento en el envase" },
    ],
  },
];

const ProductCatalog = () => {
  return (
    <section id="productos" className="bg-gradient-to-b from-background to-muted/20 px-4 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-12">
          <h2 className="mb-3 text-2xl font-bold sm:text-3xl md:text-4xl">Catálogo de Productos Bonlife</h2>
          <p className="mb-6 text-base text-muted-foreground sm:text-lg md:text-xl">
            El verdadero aceite vegetal con el doble de duración
          </p>
          <a href="/catalogo-bonlife.pdf" download>
            <Button size="lg" className="gap-2">
              <Download className="h-5 w-5" />
              Descargar Catálogo PDF
            </Button>
          </a>
        </div>

        <Tabs defaultValue="aceite" className="w-full">
          <TabsList className="mb-6 grid h-auto w-full grid-cols-2 gap-2 bg-transparent p-0 sm:grid-cols-4">
            {products.map((product) => (
              <TabsTrigger
                key={product.id}
                value={product.id}
                className="whitespace-normal rounded-xl border border-border bg-card px-3 py-3 text-center text-xs shadow-sm data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:text-sm"
              >
                {product.tabLabel}
              </TabsTrigger>
            ))}
          </TabsList>

          {products.map((product) => (
            <TabsContent key={product.id} value={product.id}>
              <Card className="overflow-hidden border-border/60 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <CardTitle className="mb-2 text-2xl md:text-3xl">{product.name}</CardTitle>
                      <CardDescription className="text-base text-primary-foreground/85 md:text-lg">
                        {product.tagline}
                      </CardDescription>
                    </div>
                    <Badge className="w-fit bg-background text-foreground">{product.price}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start">
                    <div className="overflow-hidden rounded-2xl border border-border bg-muted/20">
                      <img src={product.image} alt={product.name} loading="lazy" className="h-72 w-full object-cover" />
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h4 className="mb-3 text-lg font-semibold">Descripción</h4>
                        <p className="text-muted-foreground">{product.description}</p>
                      </div>
                      <div>
                        <h4 className="mb-3 text-lg font-semibold">Beneficios</h4>
                        <ul className="grid gap-3 sm:grid-cols-2">
                          {product.benefits.map((benefit) => (
                            <li key={benefit} className="flex items-start gap-3 rounded-xl border border-border bg-muted/20 p-3">
                              <span className="mt-0.5 text-primary">✓</span>
                              <span className="text-sm text-foreground">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {(product.specs || product.extraText) && (
                    <div className="grid gap-6 md:grid-cols-2">
                      {product.specs && (
                        <div>
                          <h4 className="mb-3 text-lg font-semibold">Especificaciones Técnicas</h4>
                          <div className="overflow-hidden rounded-xl border border-border bg-background">
                            <table className="w-full text-sm">
                              <tbody className="divide-y divide-border">
                                {product.specs.map((spec) => (
                                  <tr key={spec.label}>
                                    <td className="px-4 py-3 font-medium">{spec.label}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{spec.value}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {product.extraText && (
                        <div>
                          <h4 className="mb-3 text-lg font-semibold">{product.extraTitle}</h4>
                          <div className="rounded-xl border border-border bg-muted/20 p-4 text-muted-foreground">
                            {product.extraText}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {product.notes.map((note) => (
                        <p key={note.label} className="text-sm text-foreground">
                          <strong>{note.label}:</strong> {note.value}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold">Sedes y Cobertura</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Santo Domingo, RD</li>
                <li>Punta Cana / Bávaro</li>
                <li>Santiago</li>
              </ul>
              <p className="mt-4 font-semibold">Entregas en todo el país</p>
            </div>
            <div>
              <h3 className="mb-4 text-2xl font-bold">Contacto</h3>
              <ul className="space-y-2">
                <li><a href="tel:+18299876764" className="hover:text-primary">+1 (829) 987-6764</a></li>
                <li><a href="https://bonlifeoil.com" className="hover:text-primary">bonlifeoil.com</a></li>
                <li><a href="mailto:ventas@bonlifeoil.com" className="hover:text-primary">ventas@bonlifeoil.com</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;
