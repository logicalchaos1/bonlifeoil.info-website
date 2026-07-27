import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, MessageCircle, Moon, MapPin, Clock, Filter,
  ThermometerSun, CheckCircle2, ShieldCheck, Briefcase,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import BonlifeLogo from '@/components/BonlifeLogo';

const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hola Bonlife, quiero aplicar a la posición de Trabajador de Filtración de Aceite (Turno Nocturno) en Bávaro.'
);

const requirements = [
  'Disponibilidad para trabajar turno nocturno',
  'Experiencia previa en cocina, freidoras o mantenimiento de equipos (preferible, no obligatorio)',
  'Capacidad de seguir protocolos de seguridad e higiene alimentaria',
  'Responsable, puntual y con atención al detalle',
  'Residir en Bávaro o zonas cercanas',
];

const responsibilities = [
  {
    icon: Filter,
    title: 'Filtración de aceite',
    description: 'Filtrar el aceite de las freidoras según el cronograma establecido (cada 8–10 horas) para maximizar su vida útil y mantener la calidad de fritura.',
  },
  {
    icon: ThermometerSun,
    title: 'Control de temperatura',
    description: 'Monitorear y registrar la temperatura del aceite durante el turno, asegurando que se mantenga dentro del rango óptimo.',
  },
  {
    icon: ShieldCheck,
    title: 'Higiene y seguridad',
    description: 'Cumplir con los protocolos de manejo seguro de aceite caliente y equipos de fritura, y mantener la estación de trabajo limpia y organizada.',
  },
  {
    icon: CheckCircle2,
    title: 'Registro de bitácora',
    description: 'Completar los registros de filtración y cambio de aceite requeridos para control de calidad interno.',
  },
];

const Careers = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-foreground text-primary-foreground">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <BonlifeLogo variant="light" className="text-2xl sm:text-3xl" />
          </Link>
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10 text-xs sm:text-sm">
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
        <div className="container mx-auto px-4 py-12 sm:py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
              <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Vacante Disponible
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Trabajador de Filtración de Aceite <span className="text-accent">— Turno Nocturno</span>
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm text-primary-foreground/70 mb-6 sm:mb-8">
              <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4 text-accent" /> Bávaro, República Dominicana</span>
              <span className="inline-flex items-center gap-1.5"><Moon className="w-4 h-4 text-accent" /> Turno nocturno</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4 text-accent" /> Tiempo completo</span>
            </div>
            <a
              href={`https://wa.me/18299876764?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-accent hover:bg-gold-light text-foreground font-bold px-8 rounded-full">
                <MessageCircle className="w-5 h-5 mr-2" />
                Aplicar por WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Descripción del puesto</h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Bonlife busca un trabajador de filtración de aceite para turno nocturno en Bávaro. Esta persona
            será responsable de filtrar y dar mantenimiento al aceite de freidora siguiendo nuestros
            protocolos de calidad, ayudando a extender su vida útil y mantener los estándares de fritura
            que nuestros clientes esperan.
          </p>
        </div>
      </section>

      {/* Responsibilities */}
      <section className="py-16 md:py-20 px-4 bg-muted/40">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Responsabilidades</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {responsibilities.map((item) => (
              <div key={item.title} className="bg-card rounded-2xl p-6 border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Requisitos</h2>
          <ul className="space-y-4">
            {requirements.map((req) => (
              <li key={req} className="flex items-start gap-3 text-sm sm:text-base">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 px-4 bg-foreground text-primary-foreground text-center">
        <div className="container mx-auto max-w-2xl">
          <Briefcase className="w-14 h-14 text-accent mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Interesado en la posición?</h2>
          <p className="text-primary-foreground/70 mb-8">
            Escríbenos por WhatsApp con tu nombre y disponibilidad, y te contactaremos para coordinar una entrevista.
          </p>
          <a
            href={`https://wa.me/18299876764?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-accent hover:bg-gold-light text-foreground font-bold px-8 rounded-full">
              <MessageCircle className="w-5 h-5 mr-2" />
              Aplicar Ahora
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground py-6 sm:py-8 border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 text-center">
          <BonlifeLogo variant="light" className="text-2xl mx-auto mb-3" />
          <p className="text-primary-foreground/50 text-xs sm:text-sm">
            © {new Date().getFullYear()} Bonlife Oil — Empleos. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Careers;
