"use client";

import React, { Suspense, lazy } from 'react';
import Navbar from "@/components/Navbar";
import { ComparisonHero } from "@/components/ComparisonHero";
import { ComparisonTable } from "@/components/ComparisonTable";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { BenefitsSection } from "@/components/BenefitsSection";
import { MessageCircle } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";

const ContactSection = lazy(() =>
  import("@/components/ContactSection").then((m) => ({ default: m.ContactSection }))
);
const ProductCatalog = lazy(() => import("@/components/ProductCatalog"));
const DownloadsSection = lazy(() => import("@/components/DownloadsSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const ExitIntentPopup = lazy(() =>
  import("@/components/ExitIntentPopup").then((m) => ({ default: m.ExitIntentPopup }))
);

const Index = () => {
  useSeo({
    title: "Bonlife Oil | Aceite para Freír y Aceite Vegetal al por Mayor en RD",
    description:
      "Distribuidor de aceite para freír y aceite vegetal para hoteles y restaurantes en República Dominicana. Palma, soya y girasol en garrafón de 25L. Entrega en Santo Domingo y Punta Cana.",
    path: "/",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <ComparisonHero />
        
        <div className="relative">
          {/* Subtle background decoration */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-[120px]"></div>
          </div>
          
          <div className="relative z-10">
            <ComparisonTable />
            <SavingsCalculator />
            <BenefitsSection />
            <Suspense fallback={null}>
              <ProductCatalog />
              <TestimonialsSection />
              <DownloadsSection />
              <ContactSection />
            </Suspense>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0a1a0f] text-white py-10 sm:py-16 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
            <div className="col-span-2 md:col-span-1 space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gold">BONLIFE</h3>
              <p className="text-white/60 leading-relaxed text-sm sm:text-base">
                Líderes en soluciones de aceites vegetales premium para la industria gastronómica en República Dominicana.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 sm:mb-6 uppercase tracking-wider text-xs sm:text-sm text-white/40">Navegación</h4>
              <ul className="space-y-3 sm:space-y-4 text-white/80 text-sm">
                <li><a href="/" className="hover:text-gold transition-colors">Inicio</a></li>
                <li><a href="/aceite-para-freir" className="hover:text-gold transition-colors">Aceite para Freír</a></li>
                <li><a href="/calculadora-ahorro" className="hover:text-gold transition-colors">Calculadora de Ahorro</a></li>
                <li><a href="/blog" className="hover:text-gold transition-colors">Blog</a></li>
                <li><a href="/referidos" className="hover:text-gold transition-colors">Programa de Referidos</a></li>
                <li><a href="/chef-partners" className="hover:text-gold transition-colors">Chef Partners</a></li>
                <li><a href="/reporte-piloto" className="hover:text-gold transition-colors">Reporte Piloto</a></li>
                <li><a href="/formulario-comprador" className="hover:text-gold transition-colors">Formulario de Compra</a></li>
                <li><a href="/empleos" className="hover:text-gold transition-colors">Empleos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 sm:mb-6 uppercase tracking-wider text-xs sm:text-sm text-white/40">Legal</h4>
              <ul className="space-y-3 sm:space-y-4 text-white/80 text-sm">
                <li><a href="#" className="hover:text-gold transition-colors">Términos de Uso</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Certificaciones</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-bold mb-4 sm:mb-6 uppercase tracking-wider text-xs sm:text-sm text-white/40">Contacto</h4>
              <ul className="space-y-3 sm:space-y-4 text-white/80 text-sm">
                <li>Santo Domingo, RD</li>
                <li>+1 (829) 987-6764</li>
                <li>ventas@bonlifeoil.com</li>
              </ul>
            </div>
          </div>
          <div className="pt-6 sm:pt-8 border-t border-white/10 text-center text-white/40 text-xs sm:text-sm">
            © {new Date().getFullYear()} Bonlife Oil. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/18299876764"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-3 sm:p-4 shadow-2xl transition-all hover:scale-110 flex items-center justify-center group"
      >
        <MessageCircle size={24} className="sm:w-7 sm:h-7" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 whitespace-nowrap font-bold hidden sm:inline">
          ¿Necesitas ayuda?
        </span>
      </a>

      <Suspense fallback={null}>
        <ExitIntentPopup />
      </Suspense>
    </div>
  );
};

export default Index;