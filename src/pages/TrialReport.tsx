import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, Printer, CheckCircle, AlertTriangle, TrendingUp, Clock, DollarSign, Heart, Users, Calendar, Droplets } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bonlifeLogo from "@/assets/bonlife-logo.png";

// Trial photos served from public folder
const trialPhoto1 = "/trial/royalton-day1-1.jpg";
const trialPhoto2 = "/trial/royalton-day1-2.jpg";
const trialPhoto3 = "/trial/royalton-day1-3.jpg";
const trialPhoto4 = "/trial/royalton-week1.jpg";
const trialPhoto5 = "/trial/royalton-final.jpg";

const TrialReport = () => {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  const trialData = {
    client: "Hotel Royalton",
    location: "Punta Cana, República Dominicana",
    startDate: "22 de Enero, 2025",
    endDate: "5 de Febrero, 2025",
    duration: 15,
    garrafonesUsed: 10,
    previousOil: "La Joya (Aceite de Soya)",
    filteringSchedule: "2 veces por semana",
    efficiencyGain: "30%",
  };

  const timeline = [
    {
      date: "22 de Enero, 2025",
      title: "Inicio del Programa Piloto",
      description: "Instalación inicial de aceite Bonlife RBD Palma 99.9% puro en freidoras principales.",
      photos: [trialPhoto1, trialPhoto2, trialPhoto3],
      observations: "Reemplazo completo del aceite La Joya por Bonlife. Capacitación inicial al personal de cocina."
    },
    {
      date: "25 de Enero, 2025",
      title: "Primera Filtración Programada",
      description: "Primer ciclo de filtrado según protocolo establecido.",
      photos: [],
      observations: "El aceite mantiene su claridad y propiedades después de 3 días de uso continuo."
    },
    {
      date: "29 de Enero, 2025",
      title: "Evaluación de Medio Término",
      description: "Inspección del estado del aceite y rendimiento de freidoras.",
      photos: [],
      observations: "Coloración natural del aceite de palma visible. Personal informado sobre diferencias visuales vs. aceite quemado."
    },
    {
      date: "1 de Febrero, 2025",
      title: "Filtración y Monitoreo",
      description: "Segundo ciclo de filtrado de la semana.",
      photos: [],
      observations: "Aceite en excelentes condiciones. Sin necesidad de cambio."
    },
    {
      date: "2 de Febrero, 2025",
      title: "Pausa Temporal",
      description: "Breve período de transición mientras se reabastecía el inventario.",
      photos: [],
      observations: "Se utilizó aceite alternativo (La Joya) temporalmente. Este breve período permitió al equipo comparar directamente el rendimiento entre ambos productos.",
      isWarning: true
    },
    {
      date: "3 de Febrero, 2025",
      title: "Continuación del Programa",
      description: "Reabastecimiento de aceite Bonlife y toma de muestras fotográficas.",
      photos: [trialPhoto4, trialPhoto5],
      observations: "Nuevos garrafones entregados y puestos en operación. El aceite continúa en uso activo al cierre de este informe."
    },
    {
      date: "5 de Febrero, 2025",
      title: "Cierre del Programa Piloto",
      description: "Evaluación final y documentación de resultados. Aceite Bonlife aún en uso.",
      photos: [],
      observations: "Prueba exitosa completada. 10 garrafones utilizados con 30% más de rendimiento gracias al filtrado. Nota: El aceite instalado el 3 de febrero continúa en operación.",
      isSuccess: true
    },
  ];

  const testimonials = [
    {
      role: "Chef Ejecutivo",
      quote: "Los alimentos fritos están saliendo con mejor calidad. El aceite se comporta mejor y dura mucho más tiempo que el que usábamos antes.",
    },
    {
      role: "Personal de Cocina",
      quote: "Notamos que el aceite Bonlife no hace tanta espuma y los productos fritos tienen mejor textura y color dorado.",
    },
  ];

  const costComparison = {
    bonlife: {
      name: "Bonlife RBD Palma",
      pricePerUnit: 4800,
      unitsNeeded: 1,
      totalCost: 4800,
      duration: "4x más duración",
      itbis: 864,
    },
    competitor: {
      name: "La Joya (Soya)",
      pricePerUnit: 2000,
      unitsNeeded: 4,
      totalCost: 8000,
      duration: "Cambio diario requerido",
      itbis: 1440,
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-break-before { page-break-before: always; }
          .print-break-after { page-break-after: always; }
          .print-avoid-break { page-break-inside: avoid; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .bg-premium { background-color: #1a365d !important; }
          .bg-gold { background-color: #d69e2e !important; }
        }
      `}</style>

      {/* Action Buttons */}
      <div className="no-print fixed top-4 right-4 z-50 flex gap-2">
        <Button onClick={() => navigate("/")} variant="outline" size="sm" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Button>
        <Button onClick={handlePrint} size="sm" className="gap-2 bg-premium hover:bg-premium-dark text-white">
          <Printer className="w-4 h-4" />
          Imprimir
        </Button>
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-premium to-premium-dark text-white py-8 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img src={bonlifeLogo} alt="Bonlife Logo" className="h-16 w-auto" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">INFORME DE PROGRAMA PILOTO</h1>
                <p className="text-gold font-semibold text-lg">Aceite de Fritura Industrial</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-80">Fecha del Informe</p>
              <p className="font-bold text-lg">6 de Febrero, 2025</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl px-4 py-8 space-y-8">
        {/* Client Info Card */}
        <Card className="print-avoid-break border-2 border-premium/20">
          <CardHeader className="bg-secondary/50">
            <CardTitle className="text-2xl text-premium flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              Información del Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Cliente</p>
                <p className="text-xl font-bold text-foreground">{trialData.client}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ubicación</p>
                <p className="text-lg font-semibold text-foreground">{trialData.location}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duración del Piloto</p>
                <p className="text-lg font-semibold text-foreground">{trialData.duration} días</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fecha de Inicio</p>
                <p className="text-lg font-semibold text-foreground">{trialData.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fecha de Finalización</p>
                <p className="text-lg font-semibold text-foreground">{trialData.endDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Garrafones Utilizados</p>
                <p className="text-lg font-semibold text-foreground">{trialData.garrafonesUsed} unidades</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 print-avoid-break">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-10 h-10 text-primary mx-auto mb-3" />
              <p className="text-3xl font-bold text-primary">30%</p>
              <p className="text-sm text-muted-foreground">Mayor Duración con Filtrado</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gold/10 to-gold/5 border-gold/20">
            <CardContent className="p-6 text-center">
              <DollarSign className="w-10 h-10 text-gold mx-auto mb-3" />
              <p className="text-3xl font-bold text-gold">3.5-4x</p>
              <p className="text-sm text-muted-foreground">Eficiencia de Costo</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-premium/10 to-premium/5 border-premium/20">
            <CardContent className="p-6 text-center">
              <Droplets className="w-10 h-10 text-premium mx-auto mb-3" />
              <p className="text-3xl font-bold text-premium">99.9%</p>
              <p className="text-sm text-muted-foreground">Pureza del Aceite</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="p-6 text-center">
              <Heart className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-green-600">Mejor</p>
              <p className="text-sm text-muted-foreground">Salud Cardiovascular</p>
            </CardContent>
          </Card>
        </div>

        {/* Cost Comparison */}
        <Card className="print-avoid-break print-break-before border-2 border-gold/30">
          <CardHeader className="bg-gradient-to-r from-gold/20 to-gold/10">
            <CardTitle className="text-2xl text-premium flex items-center gap-2">
              <DollarSign className="w-6 h-6" />
              Análisis Comparativo de Costos
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bonlife Column */}
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border-2 border-primary/30">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="text-xl font-bold text-primary">Bonlife RBD Palma</h3>
                    <p className="text-sm text-muted-foreground">99.9% Puro - Recomendado</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Precio por garrafón (25L):</span>
                    <span className="font-bold">RD$ 4,800</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ITBIS (18%):</span>
                    <span className="font-bold">RD$ 864</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total con ITBIS:</span>
                    <span className="font-bold text-lg">RD$ 5,664</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Garrafones necesarios:</span>
                    <span className="font-bold text-primary text-xl">1 unidad</span>
                  </div>
                  <hr className="border-primary/30" />
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">COSTO TOTAL:</span>
                    <span className="font-bold text-primary text-2xl">RD$ 5,664</span>
                  </div>
                </div>
              </div>

              {/* Competitor Column */}
              <div className="bg-gradient-to-br from-destructive/10 to-destructive/5 rounded-xl p-6 border-2 border-destructive/30">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                  <div>
                    <h3 className="text-xl font-bold text-destructive">La Joya (Soya)</h3>
                    <p className="text-sm text-muted-foreground">Aceite Anterior - No Recomendado</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Precio por unidad:</span>
                    <span className="font-bold">RD$ 2,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ITBIS (18%):</span>
                    <span className="font-bold">RD$ 360</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total por unidad:</span>
                    <span className="font-bold text-lg">RD$ 2,360</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unidades necesarias:</span>
                    <span className="font-bold text-destructive text-xl">4 unidades</span>
                  </div>
                  <hr className="border-destructive/30" />
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">COSTO TOTAL:</span>
                    <span className="font-bold text-destructive text-2xl">RD$ 9,440</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Summary */}
            <div className="mt-6 bg-gradient-to-r from-premium to-premium-dark rounded-xl p-6 text-white text-center">
              <p className="text-lg mb-2">AHORRO CON BONLIFE</p>
              <p className="text-4xl font-bold text-gold mb-2">RD$ 3,776 por ciclo</p>
              <p className="text-lg opacity-90">Equivalente a un <span className="font-bold text-gold">40% de ahorro</span> en costos de aceite</p>
            </div>
            
            {/* Price Disclaimer */}
            <p className="text-xs text-muted-foreground text-center mt-4 italic">
              * Los precios mostrados son estimados de referencia y pueden variar según proveedor y fecha de compra.
            </p>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="print-break-before">
          <CardHeader className="bg-secondary/50">
            <CardTitle className="text-2xl text-premium flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Cronología del Programa Piloto
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-8">
              {timeline.map((event, index) => (
                <div key={index} className={`print-avoid-break relative pl-8 border-l-2 pb-8 last:pb-0 ${
                  event.isWarning ? "border-destructive/50" : event.isSuccess ? "border-primary/50" : "border-premium/30"
                }`}>
                  <div className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full border-2 border-white ${
                    event.isWarning ? "bg-destructive" : event.isSuccess ? "bg-primary" : "bg-premium"
                  }`} />
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      event.isWarning ? "bg-destructive/20 text-destructive" : "bg-gold/20 text-gold"
                    }`}>
                      {event.date}
                    </span>
                    {event.isWarning && (
                      <span className="inline-block bg-destructive/10 text-destructive px-2 py-0.5 rounded text-xs font-medium">
                        Período de Interrupción
                      </span>
                    )}
                    {event.isSuccess && (
                      <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-medium">
                        Aceite Aún en Uso
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{event.title}</h3>
                  <p className="text-muted-foreground mb-3">{event.description}</p>
                  <div className={`rounded-lg p-3 mb-4 ${
                    event.isWarning ? "bg-destructive/10" : "bg-secondary/50"
                  }`}>
                    <p className="text-sm"><strong>Observaciones:</strong> {event.observations}</p>
                  </div>
                  {event.photos && event.photos.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {event.photos.map((photo, photoIndex) => (
                        <img
                          key={photoIndex}
                          src={photo}
                          alt={`Foto ${photoIndex + 1} - ${event.title}`}
                          className="rounded-lg shadow-md w-full h-32 object-cover border border-border"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Health Benefits */}
        <Card className="print-avoid-break border-2 border-green-500/20">
          <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-500/5">
            <CardTitle className="text-2xl text-green-700 flex items-center gap-2">
              <Heart className="w-6 h-6" />
              Beneficios para la Salud de los Clientes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-lg text-destructive mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Riesgos del Aceite de Soya (La Joya)
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">✗</span>
                    Mayor riesgo de arterias obstruidas
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">✗</span>
                    Problemas cardiovasculares a largo plazo
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">✗</span>
                    Degradación rápida genera compuestos nocivos
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">✗</span>
                    Cambio diario requerido aumenta riesgo de error humano
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg text-green-700 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Ventajas del Aceite Bonlife RBD Palma
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    99.9% puro, sin aditivos dañinos
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    Estable a altas temperaturas, no genera toxinas
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    Mejor perfil de ácidos grasos
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    Mayor control de calidad con cambios menos frecuentes
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <Card className="print-avoid-break border-2 border-gold/30">
          <CardHeader className="bg-gradient-to-r from-gold/20 to-gold/10">
            <CardTitle className="text-2xl text-premium flex items-center gap-2">
              <Users className="w-6 h-6" />
              Comentarios del Personal
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-secondary/30 rounded-xl p-6 border border-border">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-premium/20 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-premium" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground mb-2">{testimonial.role}</p>
                      <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-foreground">
                <strong>Observación General:</strong> El personal de cocina notó mejoras significativas en la calidad de los alimentos fritos, 
                menor formación de espuma, y una duración notablemente mayor del aceite en comparación con La Joya.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="print-avoid-break print-break-before border-2 border-premium/20">
          <CardHeader className="bg-gradient-to-r from-premium/10 to-premium/5">
            <CardTitle className="text-2xl text-premium flex items-center gap-2">
              <Users className="w-6 h-6" />
              Recomendaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="bg-secondary/50 rounded-xl p-5">
                <h4 className="font-bold text-lg text-foreground mb-2">1. Capacitación del Personal de Cocina</h4>
                <p className="text-muted-foreground mb-3">
                  Durante el piloto, observamos que el aceite se cambió con más frecuencia de la necesaria debido a desconocimiento 
                  sobre las características visuales del aceite de palma. Recomendamos una sesión de entrenamiento que cubra:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Diferencia entre coloración natural vs. aceite quemado</li>
                  <li>Indicadores correctos para determinar cuándo cambiar el aceite</li>
                  <li>Protocolo de filtrado óptimo (2 veces por semana)</li>
                  <li>Beneficios del aceite de palma RBD vs. aceite de soya</li>
                </ul>
              </div>

              <div className="bg-secondary/50 rounded-xl p-5">
                <h4 className="font-bold text-lg text-foreground mb-2">2. Sistema de Monitoreo y Control</h4>
                <p className="text-muted-foreground mb-3">
                  Implementar un sistema de seguimiento riguroso que registre:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Fecha y hora de cada cambio de aceite</li>
                  <li>Fecha y hora de cada filtrado</li>
                  <li>Responsable del procedimiento</li>
                  <li>Observaciones sobre el estado del aceite</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  Este sistema permitirá al departamento de compras optimizar pedidos y al chef mantener control de calidad.
                </p>
              </div>

              <div className="bg-secondary/50 rounded-xl p-5">
                <h4 className="font-bold text-lg text-foreground mb-2">3. Programa de Filtrado Consistente</h4>
                <p className="text-muted-foreground">
                  El filtrado regular (mínimo 2 veces por semana) extendió la vida útil del aceite un 30% adicional. 
                  Mantener este protocolo garantizará los máximos ahorros y la mejor calidad de fritura.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conclusion */}
        <Card className="print-avoid-break bg-gradient-to-br from-premium to-premium-dark text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Conclusión</h2>
            <p className="text-lg mb-6 max-w-3xl mx-auto opacity-90">
              El programa piloto de 15 días en Hotel Royalton Punta Cana ha demostrado de manera concluyente que 
              el aceite Bonlife RBD Palma 99.9% puro ofrece una <span className="text-gold font-bold">eficiencia de costo 3.5-4x superior</span>, 
              mejor rendimiento operativo, y beneficios significativos para la salud de los clientes en comparación 
              con el aceite de soya utilizado anteriormente.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-gold font-semibold">
              <span className="bg-white/10 px-4 py-2 rounded-full">✓ Prueba Exitosa</span>
              <span className="bg-white/10 px-4 py-2 rounded-full">✓ 40% Ahorro en Costos</span>
              <span className="bg-white/10 px-4 py-2 rounded-full">✓ Mejor Calidad</span>
              <span className="bg-white/10 px-4 py-2 rounded-full">✓ Mayor Salud</span>
            </div>
          </CardContent>
        </Card>

        {/* Contact Footer */}
        <div className="text-center py-8 print-avoid-break">
          <img src={bonlifeLogo} alt="Bonlife Logo" className="h-12 w-auto mx-auto mb-4" />
          <p className="text-muted-foreground">
            Para más información o para iniciar su programa de aceite Bonlife
          </p>
          <p className="font-bold text-premium text-lg mt-2">
            WhatsApp: +1 829-987-6764
          </p>
        </div>
      </main>
    </div>
  );
};

export default TrialReport;
