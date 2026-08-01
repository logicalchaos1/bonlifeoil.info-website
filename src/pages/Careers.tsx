import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Briefcase, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BonlifeLogo from '@/components/BonlifeLogo';
import { jobs } from '@/data/jobs';

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
              Únete al equipo Bonlife
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Empleos <span className="text-accent">Bonlife</span>
            </h1>
            <p className="text-base sm:text-lg text-primary-foreground/70">
              Vacantes disponibles actualmente en Bonlife Oil.
            </p>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-5">
            {jobs.map((job) => (
              <Link
                key={job.slug}
                to={`/empleos/${job.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border/50 rounded-2xl p-6 hover:shadow-lg hover:border-primary/40 transition-all"
              >
                <div>
                  <h2 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {job.title}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-3">{job.summary}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary" /> {job.location}</span>
                    <span className="inline-flex items-center gap-1.5"><job.shiftIcon className="w-3.5 h-3.5 text-primary" /> {job.shift}</span>
                    <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-primary" /> {job.type}</span>
                  </div>
                </div>
                <Button className="rounded-full shrink-0 w-full sm:w-auto">
                  Ver Vacante
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ))}
          </div>
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
