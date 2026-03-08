"use client";

import React from 'react';
import Navbar from "@/components/Navbar";
import { ComparisonHero } from "@/components/ComparisonHero";
import { ComparisonTable } from "@/components/ComparisonTable";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { BenefitsSection } from "@/components/BenefitsSection";
import { ContactSection } from "@/components/ContactSection";
import ProductCatalog from "@/components/ProductCatalog";
import DownloadsSection from "@/components/DownloadsSection";
import { MessageCircle } from "lucide-react";

const Index = () => {
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
            <ProductCatalog />
            <DownloadsSection />
            <ContactSection />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0a1a0f] text-white py-16 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gold">BONLIFE</h3>
              <p className="text-white/60 leading-relaxed">
                Líderes en soluciones de aceites vegetales premium para la industria gastronómica en República Dominicana.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-wider text-sm text-white/40">Navegación</h4>
              <ul className="space-y-4 text-white/80">
                <li><a href="#" className="hover:text-gold transition-colors">Inicio</a></li>
                <li><a href="#comparacion" className="hover:text-gold transition-colors">Comparativa</a></li>
                <li><a href="#calculadora" className="hover:text-gold transition-colors">Calculadora</a></li>
                <li><a href="#productos" className="hover:text-gold transition-colors">Productos</a></li>
                <li><a href="#descargas" className="hover:text-gold transition-colors">Descargas</a></li>
                <li><a href="/reporte-piloto" className="hover:text-gold transition-colors">Reporte Piloto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-wider text-sm text-white/40">Legal</h4>
              <ul className="space-y-4 text-white/80">
                <li><a href="#" className="hover:text-gold transition-colors">Términos de Uso</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Certificaciones</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-wider text-sm text-white/40">Contacto</h4>
              <ul className="space-y-4 text-white/80">
                <li>Santo Domingo, RD</li>
                <li>+1 (829) 987-6764</li>
                <li>ventas@bonlifeoil.com</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-white/40 text-sm">
            © {new Date().getFullYear()} Bonlife Oil. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/18299876764"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-2xl transition-all hover:scale-110 flex items-center justify-center group"
      >
        <MessageCircle size={28} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 whitespace-nowrap font-bold">
          ¿Necesitas ayuda?
        </span>
      </a>
    </div>
  );
};

export default Index;