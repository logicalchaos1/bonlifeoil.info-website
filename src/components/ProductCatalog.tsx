import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import jsPDF from "jspdf";

const ProductCatalog = () => {
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPos = 20;

    // Header
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Catálogo de Productos Bonlife", pageWidth / 2, yPos, { align: "center" });
    
    yPos += 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("El verdadero aceite vegetal con el doble de duración", pageWidth / 2, yPos, { align: "center" });
    
    yPos += 15;
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;

    // Product 1: Aceite Bonlife RBD Palm Olein
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Aceite Bonlife RBD Palm Olein", margin, yPos);
    yPos += 7;
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Precio: $4,600 DOP", margin, yPos);
    yPos += 7;
    
    doc.setFont("helvetica", "italic");
    doc.text("Aceite virgen de alto rendimiento para uso industrial y comercial", margin, yPos);
    yPos += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const palmBenefits = [
      "• Dura hasta 300% más que los aceites tradicionales",
      "• No transfiere sabores ni olores entre frituras",
      "• Menor absorción de grasa: productos más secos y dorados",
      "• Libre de colesterol y grasas trans",
      "• Punto de humo: 230°C | Duración: 45-56 horas"
    ];
    palmBenefits.forEach(benefit => {
      doc.text(benefit, margin + 5, yPos);
      yPos += 5;
    });
    
    yPos += 5;
    doc.text("Presentaciones: 20L, 25L, 50L | Vida útil: 12 meses", margin + 5, yPos);
    yPos += 10;

    // Product 2: Aceite de Soya
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Aceite de Soya Bonlife", margin, yPos);
    yPos += 7;
    
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text("Aceite vegetal refinado, estable y versátil", margin, yPos);
    yPos += 6;
    
    doc.setFont("helvetica", "normal");
    doc.text("• Rico en ácidos grasos esenciales | Punto de humo: 220°C", margin + 5, yPos);
    yPos += 5;
    doc.text("• Ideal para cocciones rápidas, salsas y aderezos", margin + 5, yPos);
    yPos += 10;

    // Product 3: Aceite de Girasol
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Aceite de Girasol Bonlife", margin, yPos);
    yPos += 7;
    
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text("100% natural, alto en ácido oleico", margin, yPos);
    yPos += 6;
    
    doc.setFont("helvetica", "normal");
    doc.text("• Fuente natural de Vitamina E | Punto de humo: 232°C", margin + 5, yPos);
    yPos += 5;
    doc.text("• Ideal para cocina saludable, repostería y ensaladas", margin + 5, yPos);
    yPos += 10;

    // Product 4: Manteca Vegetal
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Manteca Vegetal Bonlife", margin, yPos);
    yPos += 7;
    
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text("Premium para panificación y repostería", margin, yPos);
    yPos += 6;
    
    doc.setFont("helvetica", "normal");
    doc.text("• Textura suave y crujiente | Enriquecida con Vitamina E", margin + 5, yPos);
    yPos += 5;
    doc.text("• Ideal para pasteles, galletas, panes y productos horneados", margin + 5, yPos);
    yPos += 10;

    // Product 5: Margarina
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Margarina Bonlife", margin, yPos);
    yPos += 7;
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Precio: $3,570 DOP", margin, yPos);
    yPos += 7;
    
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text("Alternativa saludable enriquecida con vitaminas", margin, yPos);
    yPos += 6;
    
    doc.setFont("helvetica", "normal");
    doc.text("• Bajo contenido de grasas trans | Cremosidad y sabor natural", margin + 5, yPos);
    yPos += 5;
    doc.text("• Ideal para untar, hornear y cocinar", margin + 5, yPos);
    yPos += 10;

    // Product 6: Mantequilla
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Mantequilla Bonlife", margin, yPos);
    yPos += 7;
    
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text("Producto vegetal de procesamiento mínimo", margin, yPos);
    yPos += 6;
    
    doc.setFont("helvetica", "normal");
    doc.text("• Textura cremosa y estable | Libre de colesterol", margin + 5, yPos);
    yPos += 5;
    doc.text("• Excelente para cocina, panadería y repostería industrial", margin + 5, yPos);
    yPos += 15;

    // New page for contact info
    doc.addPage();
    yPos = 20;

    // Coverage and Contact
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Sedes y Cobertura", margin, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("📍 Santo Domingo, RD", margin, yPos);
    yPos += 6;
    doc.text("📍 Punta Cana / Bávaro", margin, yPos);
    yPos += 6;
    doc.text("📍 Santiago", margin, yPos);
    yPos += 10;
    
    doc.setFont("helvetica", "bold");
    doc.text("Entregas en todo el país", margin, yPos);
    yPos += 6;
    doc.setFont("helvetica", "normal");
    doc.text("Mínimo de envío nacional: 2 garrafones (50 L)", margin, yPos);
    yPos += 15;

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Contacto", margin, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("📞 +1 (829) 987-6764", margin, yPos);
    yPos += 6;
    doc.text("🌐 bonlifeoil.com", margin, yPos);
    yPos += 6;
    doc.text("📧 ventas@bonlifeoil.com", margin, yPos);

    // Footer
    yPos = doc.internal.pageSize.getHeight() - 20;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Bonlife: Más Rendimiento. Más Salud. Más Ahorro.", pageWidth / 2, yPos, { align: "center" });

    // Save PDF
    doc.save("Catalogo-Bonlife.pdf");
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Catálogo de Productos Bonlife</h2>
          <p className="text-xl text-muted-foreground mb-6">
            El verdadero aceite vegetal con el doble de duración
          </p>
          <Button onClick={generatePDF} size="lg" className="gap-2">
            <Download className="w-5 h-5" />
            Descargar Catálogo PDF
          </Button>
        </div>

        <Tabs defaultValue="palm" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 mb-8">
            <TabsTrigger value="palm">Aceite de Palma</TabsTrigger>
            <TabsTrigger value="soya">Soya</TabsTrigger>
            <TabsTrigger value="girasol">Girasol</TabsTrigger>
            <TabsTrigger value="manteca">Manteca</TabsTrigger>
            <TabsTrigger value="margarina">Margarina</TabsTrigger>
            <TabsTrigger value="mantequilla">Mantequilla</TabsTrigger>
          </TabsList>

          {/* Aceite Bonlife RBD Palm Olein */}
          <TabsContent value="palm">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2">Aceite Bonlife RBD Palm Olein</CardTitle>
                    <CardDescription className="text-lg">
                      Aceite virgen de alto rendimiento para uso industrial y comercial
                    </CardDescription>
                  </div>
                  <Badge variant="default" className="text-lg px-4 py-2">Premium</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-3">Descripción</h4>
                  <p className="text-muted-foreground">
                    Aceite 100% vegetal virgen, de alto rendimiento, elaborado con RBD Palm Olein (fracción líquida del aceite de palma). 
                    Refinado, blanqueado y desodorizado con el mínimo de aditivos (solo 2%), garantizando pureza y estabilidad térmica superior.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Beneficios</h4>
                  <ul className="grid md:grid-cols-2 gap-3">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Dura hasta 300% más que los aceites tradicionales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>No transfiere sabores ni olores entre frituras</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Menor absorción de grasa: productos más secos y dorados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Libre de colesterol y grasas trans</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Color dorado estable, incluso tras múltiples usos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Apto para freidoras industriales y comerciales</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Recomendaciones de Uso</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Filtrar cada 8–10 horas de uso</li>
                    <li>• Mantener temperatura entre 170–180 °C (≈350 °F)</li>
                    <li>• No mezclar with otros aceites refinados</li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Especificaciones Técnicas Generales</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <tbody className="divide-y">
                          <tr>
                            <td className="py-2 font-medium">Acidez (FFA)</td>
                            <td className="py-2 text-muted-foreground">0.045% máx.</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium">Color (Lovibond)</td>
                            <td className="py-2 text-muted-foreground">3R máx.</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium">Índice de Peróxido</td>
                            <td className="py-2 text-muted-foreground">1.70 meq/kg</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium">Punto de Fusión</td>
                            <td className="py-2 text-muted-foreground">24–39 °C</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium">Punto de Humo</td>
                            <td className="py-2 text-muted-foreground">230 °C</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium">Duración estimada</td>
                            <td className="py-2 text-muted-foreground">45–56 horas</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-3">Variantes Disponibles</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Producto</th>
                            <th className="text-left py-2">IV (Wijs)</th>
                            <th className="text-left py-2">SMPT (°C)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr>
                            <td className="py-2 font-medium">RBD Palm Oil</td>
                            <td className="py-2 text-muted-foreground">50–55</td>
                            <td className="py-2 text-muted-foreground">33–39</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium">RBD Palm Olein CP8</td>
                            <td className="py-2 text-muted-foreground">56 min</td>
                            <td className="py-2 text-muted-foreground">24 máx</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium">RBD Palm Olein CP6</td>
                            <td className="py-2 text-muted-foreground">60 min</td>
                            <td className="py-2 text-muted-foreground">20 máx</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 rounded-lg p-4">
                  <p className="text-sm">
                    <strong>Presentaciones:</strong> 20L, 25L, 50L | 
                    <strong className="ml-3">Vida útil:</strong> 12 meses (cerrado)
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aceite de Soya */}
          <TabsContent value="soya">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl mb-2">Aceite de Soya Bonlife</CardTitle>
                <CardDescription className="text-lg">
                  Aceite vegetal refinado, estable y versátil
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-3">Descripción</h4>
                  <p className="text-muted-foreground">
                    Aceite vegetal de soya refinado, estable y versátil, ideal para cocina general y salteados.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Beneficios</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Rico en ácidos grasos esenciales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Bajo en grasas saturadas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Ideal para cocciones rápidas, salsas y aderezos</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Especificaciones Técnicas</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <tbody className="divide-y">
                        <tr>
                          <td className="py-2 font-medium">Acidez</td>
                          <td className="py-2 text-muted-foreground">0.1% máx.</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Índice de Yodo</td>
                          <td className="py-2 text-muted-foreground">120–140</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Punto de Humo</td>
                          <td className="py-2 text-muted-foreground">220 °C</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Color</td>
                          <td className="py-2 text-muted-foreground">Amarillo claro</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Vitamina E</td>
                          <td className="py-2 text-muted-foreground">Alta presencia</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aceite de Girasol */}
          <TabsContent value="girasol">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl mb-2">Aceite de Girasol Bonlife</CardTitle>
                <CardDescription className="text-lg">
                  100% natural, alto en ácido oleico
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-3">Descripción</h4>
                  <p className="text-muted-foreground">
                    Aceite puro de semillas de girasol, 100% natural, alto en ácido oleico, perfecto para frituras suaves y uso doméstico o gourmet.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Beneficios</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Fuente natural de Vitamina E y antioxidantes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Ideal para cocina saludable, repostería y ensaladas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Bajo en grasas saturadas</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Especificaciones Técnicas</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <tbody className="divide-y">
                        <tr>
                          <td className="py-2 font-medium">Acidez</td>
                          <td className="py-2 text-muted-foreground">0.1% máx.</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Punto de Humo</td>
                          <td className="py-2 text-muted-foreground">232 °C</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Índice de Yodo</td>
                          <td className="py-2 text-muted-foreground">90–130</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Color</td>
                          <td className="py-2 text-muted-foreground">2 R máx.</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Tipo</td>
                          <td className="py-2 text-muted-foreground">Alto Oleico / Refinado</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manteca Vegetal */}
          <TabsContent value="manteca">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl mb-2">Manteca Vegetal Bonlife</CardTitle>
                <CardDescription className="text-lg">
                  Premium para panificación y repostería
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-3">Descripción</h4>
                  <p className="text-muted-foreground">
                    Manteca premium elaborada con aceites fraccionados, blanqueados y desodorizados, especialmente formulada para panificación y repostería.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Beneficios</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Proporciona textura suave y crujiente a masas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Mejora el volumen y apariencia de productos horneados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Enriquecida con Vitamina E, libre de grasas trans y GMO</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Aplicaciones</h4>
                  <p className="text-muted-foreground">
                    Pasteles, galletas, panes, wafers y productos automatizados.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Especificaciones Técnicas</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <tbody className="divide-y">
                        <tr>
                          <td className="py-2 font-medium">FFA (máx %)</td>
                          <td className="py-2 text-muted-foreground">0.1%</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">M&I (máx %)</td>
                          <td className="py-2 text-muted-foreground">0.1%</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">IV</td>
                          <td className="py-2 text-muted-foreground">42–55</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">SMPT (°C)</td>
                          <td className="py-2 text-muted-foreground">36–48</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Color</td>
                          <td className="py-2 text-muted-foreground">3 R / 30 Y</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Antioxidante</td>
                          <td className="py-2 text-muted-foreground">200 PPM máx</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Margarina */}
          <TabsContent value="margarina">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl mb-2">Margarina Bonlife</CardTitle>
                <CardDescription className="text-lg">
                  Alternativa saludable enriquecida con vitaminas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-3">Descripción</h4>
                  <p className="text-muted-foreground">
                    Margarina de base vegetal enriquecida con vitaminas, alternativa saludable a la mantequilla tradicional.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Beneficios</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Bajo contenido de grasas trans</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Aporta cremosidad y sabor natural</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Ideal para untar, hornear y cocinar</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Especificaciones Técnicas</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <tbody className="divide-y">
                        <tr>
                          <td className="py-2 font-medium">FFA (máx %)</td>
                          <td className="py-2 text-muted-foreground">0.2%</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">M&I (máx %)</td>
                          <td className="py-2 text-muted-foreground">0.16%</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">IV</td>
                          <td className="py-2 text-muted-foreground">40–44</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">SMPT (°C)</td>
                          <td className="py-2 text-muted-foreground">37–41</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Color</td>
                          <td className="py-2 text-muted-foreground">8 R</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Mezcla grasa mínima</td>
                          <td className="py-2 text-muted-foreground">80%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mantequilla */}
          <TabsContent value="mantequilla">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl mb-2">Mantequilla Bonlife</CardTitle>
                <CardDescription className="text-lg">
                  Producto vegetal de procesamiento mínimo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-3">Descripción</h4>
                  <p className="text-muted-foreground">
                    Producto derivado del aceite vegetal virgen, procesado mínimamente para conservar aroma y sabor naturales.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Beneficios</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Textura cremosa y estable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Excelente para repostería fina</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Libre de colesterol</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Aplicaciones</h4>
                  <p className="text-muted-foreground">
                    Ideal para cocina, panadería y repostería industrial.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contact Info */}
        <div className="mt-12 p-8 bg-primary/5 rounded-lg border border-primary/20">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Sedes y Cobertura</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>📍 Santo Domingo, RD</li>
                <li>📍 Punta Cana / Bávaro</li>
                <li>📍 Santiago</li>
              </ul>
              <p className="mt-4 font-semibold">Entregas en todo el país</p>
              <p className="text-sm text-muted-foreground">Mínimo de envío nacional: 2 garrafones (50 L)</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Contacto</h3>
              <ul className="space-y-2">
                <li>📞 <a href="tel:+18299876764" className="hover:text-primary">+1 (829) 987-6764</a></li>
                <li>🌐 <a href="https://bonlifeoil.com" className="hover:text-primary">bonlifeoil.com</a></li>
                <li>📧 <a href="mailto:ventas@bonlifeoil.com" className="hover:text-primary">ventas@bonlifeoil.com</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;