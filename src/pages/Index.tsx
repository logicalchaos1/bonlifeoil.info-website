import { ComparisonHero } from "@/components/ComparisonHero";
import { ComparisonTable } from "@/components/ComparisonTable";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { BenefitsSection } from "@/components/BenefitsSection";
import { ContactSection } from "@/components/ContactSection";
import ProductCatalog from "@/components/ProductCatalog";

const Index = () => {
  return (
    <div className="min-h-screen">
      <ComparisonHero />
      <ComparisonTable />
      <SavingsCalculator />
      <BenefitsSection />
      <ProductCatalog />
      <ContactSection />
    </div>
  );
};

export default Index;
