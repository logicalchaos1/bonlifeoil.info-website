import { ComparisonHero } from "@/components/ComparisonHero";
import { ComparisonTable } from "@/components/ComparisonTable";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { BenefitsSection } from "@/components/BenefitsSection";
import { ContactSection } from "@/components/ContactSection";
import ProductCatalog from "@/components/ProductCatalog";
import { Button } from "@/components/ui/button";
import { Printer, Download } from "lucide-react";
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
      {/* Action Buttons - Fixed position */}
      <div className="no-print fixed top-4 right-4 z-50 flex gap-3">
        <Button 
          onClick={handleDownloadCatalog}
          size="lg"
          className="gap-2 shadow-lg bg-gold hover:bg-gold/90 text-white"
        >
          <Download className="w-5 h-5" />
          Descargar Catálogo
        </Button>
        <Button 
          onClick={handlePrint}
          size="lg"
          className="gap-2 shadow-lg bg-premium hover:bg-premium-dark text-white"
        >
          <Printer className="w-5 h-5" />
          Imprimir Página
        </Button>
      </div>

      <ComparisonHero />
      <ComparisonTable />
      <SavingsCalculator />
      <BenefitsSection />
      <ProductCatalog />
    </div>
  );
};

export default Index;
