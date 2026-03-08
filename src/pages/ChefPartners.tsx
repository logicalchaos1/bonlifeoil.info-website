import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChefHat, Shield, TrendingDown, ClipboardCheck, GraduationCap,
  Filter, Thermometer, FileCheck, Users, Phone, CheckCircle2,
  Star, Award, Crown, ArrowLeft, MessageCircle, ChevronRight,
  HeartPulse, Wrench, BarChart3, BookOpen, Truck, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BonlifeLogo from '@/components/BonlifeLogo';

const ChefPartners = () => {
  const painPoints = [
    {
      icon: Thermometer,
      title: 'Control de TPM y Temperatura',
      description: 'Registros digitales de TPM (Total Polar Materials), temperatura del aceite y frecuencia de cambio — listos para inspección de Salud Pública y Turismo.',
    },
    {
      icon: Filter,
      title: 'Servicio de Filtración Profesional',
      description: 'Filtraciones programadas para extender la vida útil del aceite hasta 3x más, reduciendo costos y mejorando la calidad del producto final.',
    },
    {
      icon: ClipboardCheck,
      title: 'Plantillas de Registro Sanitario',
      description: 'Formatos pre-diseñados para cumplir con las normativas de Salud Pública y el Ministerio de Turismo — sin complicaciones.',
    },
    {
      icon: GraduationCap,
      title: 'Capacitación del Personal',
      description: 'Entrenamiento en manejo correcto de aceites, técnicas de fritura eficiente y buenas prácticas de cocina para todo el equipo.',
    },
    {
      icon: HeartPulse,
      title: 'Cumplimiento de Salud Pública',
      description: 'Te ayudamos a pasar inspecciones con documentación completa: bitácoras de aceite, registros de temperatura y certificados de calidad.',
    },
    {
      icon: Wrench,
      title: 'Soporte Técnico Dedicado',
      description: 'Un asesor Bonlife asignado a tu cocina para resolver dudas, optimizar procesos y garantizar que todo funcione perfecto.',
    },
  ];

  const tiers = [
    {
      name: 'Esencial',
      icon: Star,
      color: 'from-muted-foreground to-muted-foreground',
      badgeBg: 'bg-muted',
      badgeText: 'text-muted-foreground',
      price: 'Incluido',
      subtitle: 'con compra mínima de 10 unidades/mes',
      features: [
        '5% descuento en todos los productos',
        'Plantillas de registro TPM y temperatura',
        'Soporte por WhatsApp prioritario',
        'Capacitación inicial del personal (1 sesión)',
        'Entrega programada semanal o quincenal',
        'Acceso a material educativo digital',
      ],
    },
    {
      name: 'Profesional',
      icon: Award,
      color: 'from-primary to-primary/80',
      badgeBg: 'bg-primary/10',
      badgeText: 'text-primary',
      price: 'Incluido',
      subtitle: 'con compra mínima de 25 unidades/mes',
      popular: true,
      features: [
        '10% descuento en todos los productos',
        'Filtración profesional mensual incluida',
        'Registros digitales para Salud Pública',
        'Capacitación trimestral del personal',
        'Asesor técnico asignado',
        'Reportes mensuales de consumo y ahorro',
        'Prioridad en entregas (mismo día disponible)',
        'Kit de medición TPM prestado',
      ],
    },
    {
      name: 'Premium',
      icon: Crown,
      color: 'from-accent to-gold-light',
      badgeBg: 'bg-accent/10',
      badgeText: 'text-accent',
      price: 'Incluido',
      subtitle: 'con compra mínima de 50 unidades/mes',
      features: [
        '15% descuento en todos los productos',
        'Filtración profesional semanal incluida',
        'Auditoría completa pre-inspección',
        'Capacitación mensual + certificado',
        'Asesor técnico exclusivo 24/7',
        'Dashboard digital de métricas de cocina',
        'Entrega express garantizada',
        'Kit de medición TPM en comodato',
        'Programa de prueba de nuevos productos',
        'Placa "Chef Partner Bonlife" para cocina',
      ],
    },
  ];

  const complianceFeatures = [
    {
      icon: BarChart3,
      title: 'Dashboard de Métricas',
      description: 'Monitorea TPM, temperatura, frecuencia de cambio y costo por fritura en tiempo real.',
    },
    {
      icon: FileCheck,
      title: 'Documentación Lista',
      description: 'Bitácoras, certificados y registros listos para presentar ante inspectores.',
    },
    {
      icon: BookOpen,
      title: 'Manual de Buenas Prácticas',
      description: 'Guía completa de manejo de aceites adaptada a las normativas dominicanas.',
    },
    {
      icon: Truck,
      title: 'Logística Garantizada',
      description: 'Nunca te quedes sin aceite — entregas programadas con reabastecimiento automático.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-foreground text-primary-foreground">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <BonlifeLogo variant="light" className="text-2xl sm:text-3xl" />
          </Link>
          <Link to="/">
            <Button variant="outline" size="sm" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 text-xs sm:text-sm">
              <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Volver al </span>Inicio
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-foreground text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-[20%] left-[10%] w-[30%] h-[60%] bg-accent rounded-full blur-[100px]" />
          <div className="absolute bottom-[10%] right-[10%] w-[25%] h-[50%] bg-primary rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <ChefHat className="w-4 h-4" />
              Programa Exclusivo para Profesionales
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Bonlife <span className="text-accent">Chef Partners</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/70 mb-8 leading-relaxed">
              Más que un proveedor de aceite — somos tu socio estratégico en la cocina. 
              Precios exclusivos, soporte técnico, cumplimiento sanitario y capacitación 
              para que tu operación funcione sin preocupaciones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#planes">
                <Button size="lg" className="bg-accent hover:bg-gold-light text-foreground font-bold px-8 rounded-full">
                  Ver Planes
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </a>
              <a href="https://wa.me/18299876764?text=Hola%2C%20me%20interesa%20el%20programa%20Chef%20Partners" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-full">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contactar por WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points / Benefits */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Todo lo que tu cocina necesita, <span className="text-primary">resuelto</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Sabemos los retos diarios de manejar una cocina profesional. Por eso creamos un programa que los elimina.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {painPoints.map((item) => (
              <Card key={item.title} className="border-border/50 hover:shadow-lg transition-shadow group">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-16 md:py-20 px-4 bg-muted/40">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Shield className="w-4 h-4" />
              Cumplimiento Garantizado
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pasa cada inspección con <span className="text-accent">confianza</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Salud Pública, Ministerio de Turismo, auditorías internas — tenemos todo documentado y listo.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceFeatures.map((item) => (
              <div key={item.title} className="bg-card rounded-2xl p-6 border border-border/50 text-center">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section id="planes" className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Planes Chef Partners</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Sin costo adicional — los beneficios se activan automáticamente según tu volumen de compra mensual.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative bg-card rounded-2xl border-2 p-8 flex flex-col ${
                  tier.popular ? 'border-primary shadow-xl scale-[1.02]' : 'border-border/50'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full">
                    Más Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center gap-2 ${tier.badgeBg} ${tier.badgeText} px-3 py-1.5 rounded-full text-sm font-semibold mb-4`}>
                    <tier.icon className="w-4 h-4" />
                    {tier.name}
                  </div>
                  <div className="text-3xl font-bold mb-1">{tier.price}</div>
                  <p className="text-muted-foreground text-sm">{tier.subtitle}</p>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/18299876764?text=Hola%2C%20me%20interesa%20el%20plan%20${encodeURIComponent(tier.name)}%20de%20Chef%20Partners`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    className={`w-full rounded-full font-bold ${
                      tier.popular
                        ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80 text-foreground'
                    }`}
                    size="lg"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Solicitar Plan {tier.name}
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 md:py-20 px-4 bg-foreground text-primary-foreground">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
            ¿Cómo <span className="text-accent">funciona</span>?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', icon: Phone, title: 'Contáctanos', desc: 'Escríbenos por WhatsApp o llámanos para una consulta gratuita.' },
              { step: '02', icon: ClipboardCheck, title: 'Evaluamos tu cocina', desc: 'Visitamos tu operación y diseñamos un plan a tu medida.' },
              { step: '03', icon: Truck, title: 'Activamos tu plan', desc: 'Entregas programadas, soporte técnico y capacitación desde el día 1.' },
              { step: '04', icon: TrendingDown, title: 'Ahorras y creces', desc: 'Reduces costos, pasas inspecciones y tu equipo trabaja mejor.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-accent text-4xl font-bold mb-3">{item.step}</div>
                <div className="w-14 h-14 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-primary-foreground/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <ChefHat className="w-16 h-16 text-accent mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para transformar tu cocina?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Únete a los chefs que ya están ahorrando más, cocinando mejor y pasando cada inspección sin estrés.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/18299876764?text=Hola%2C%20quiero%20unirme%20al%20programa%20Chef%20Partners" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-accent hover:bg-gold-light text-foreground font-bold px-8 rounded-full">
                <MessageCircle className="w-5 h-5 mr-2" />
                Unirme Ahora por WhatsApp
              </Button>
            </a>
            <a href="tel:+18299876764">
              <Button size="lg" variant="outline" className="rounded-full">
                <Phone className="w-5 h-5 mr-2" />
                +1 (829) 987-6764
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground py-8 border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 text-center">
          <img src={bonlifeLogo} alt="Bonlife" className="h-8 mx-auto mb-4" />
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} Bonlife Oil — Programa Chef Partners. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ChefPartners;
