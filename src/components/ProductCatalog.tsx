import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const ProductCatalog = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Catálogo de Productos Bonlife</h2>
          <p className="text-xl text-muted-foreground">
            El verdadero aceite vegetal con el doble de duración
          </p>
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