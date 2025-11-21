import { ComparisonHero } from "@/components/ComparisonHero";
import { ComparisonTable } from "@/components/ComparisonTable";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { BenefitsSection } from "@/components/BenefitsSection";
import { ContactSection } from "@/components/ContactSection";
import ProductCatalog from "@/components/ProductCatalog";
import { Button } from "@/components/ui/button";
import { Printer, Download, MessageCircle } from "lucide-react";
import { generateCatalogPDF } from "@/utils/generateCatalogPDF";

const Index = () => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCatalog = async () => {
    await generateCatalogPDF();
  };

  return (
    <div className="min-h-screen">
      {/* Action Buttons - Fixed position - Responsive */}
      <div className="no-print fixed top-4 right-4 z-50 flex flex-col sm:flex-row gap-2 sm:gap-3">
        <Button 
          onClick={handleDownloadCatalog}
          size="lg"
          className="gap-2 shadow-lg bg-gold hover:bg-gold/90 text-white text-sm sm:text-base"
        >
          <Download className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Descargar Catálogo</span>
          <span className="sm:hidden">Catálogo</span>
        </Button>
        <Button 
          onClick={handlePrint}
          size="lg"
          className="gap-2 shadow-lg bg-premium hover:bg-premium-dark text-white text-sm sm:text-base"
        >
          <Printer className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Imprimir Página</span>
          <span className="sm:hidden">Imprimir</span>
        </Button>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/18299876764?text=Hola,%20me%20interesa%20obtener%20información%20sobre%20los%20productos%20Bonlife"
        target="_blank"
        rel="noopener noreferrer"
        className="no-print fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg transition-all hover:scale-110 flex items-center justify-center group"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden group-hover:inline-block ml-2 font-medium whitespace-nowrap">
          Contactar
        </span>
      </a>

      <ComparisonHero />
      <ComparisonTable />
      <SavingsCalculator />
      <BenefitsSection />
      <ProductCatalog />
    </div>
  );
};

export default Index;
