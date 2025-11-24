import { ComparisonHero } from "@/components/ComparisonHero";
import { ComparisonTable } from "@/components/ComparisonTable";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { BenefitsSection } from "@/components/BenefitsSection";
import { ContactSection } from "@/components/ContactSection";
import ProductCatalog from "@/components/ProductCatalog";
import { Button } from "@/components/ui/button";
import { Printer, Download, MessageCircle, BookOpen } from "lucide-react";
import { generateCatalogPDF } from "@/utils/generateCatalogPDF";
import { generateBookletPDF } from "@/utils/generateBookletPDF";

const Index = () => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCatalog = async () => {
    await generateCatalogPDF();
  };

  const handleDownloadBooklet = async () => {
    await generateBookletPDF();
  };

  return (
    <div className="min-h-screen">
      {/* Action Buttons - Fixed position - Mobile optimized */}
      <div className="no-print fixed top-2 right-2 sm:top-4 sm:right-4 z-50 flex flex-col gap-2">
        <Button 
          onClick={handleDownloadBooklet}
          size="sm"
          className="gap-1 shadow-lg bg-premium hover:bg-premium-dark text-white text-xs sm:text-sm sm:gap-2 h-8 sm:h-10 px-2 sm:px-4"
        >
          <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Folleto Imprimible</span>
          <span className="sm:hidden">Folleto</span>
        </Button>
        <Button 
          onClick={handleDownloadCatalog}
          size="sm"
          className="gap-1 shadow-lg bg-gold hover:bg-gold/90 text-white text-xs sm:text-sm sm:gap-2 h-8 sm:h-10 px-2 sm:px-4"
        >
          <Download className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Descargar Catálogo</span>
          <span className="sm:hidden">Catálogo</span>
        </Button>
        <Button 
          onClick={handlePrint}
          size="sm"
          className="gap-1 shadow-lg bg-premium hover:bg-premium-dark text-white text-xs sm:text-sm sm:gap-2 h-8 sm:h-10 px-2 sm:px-4"
        >
          <Printer className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Imprimir Página</span>
          <span className="sm:hidden">Imprimir</span>
        </Button>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/18299876764?text=Hola,%20me%20interesa%20obtener%20información%20sobre%20los%20productos%20Bonlife"
        target="_blank"
        rel="noopener noreferrer"
        className="no-print fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-3 sm:p-4 shadow-lg transition-all hover:scale-110 flex items-center justify-center group"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="hidden lg:group-hover:inline-block ml-2 font-medium whitespace-nowrap">
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
