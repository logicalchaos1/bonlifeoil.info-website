import { ComparisonHero } from "@/components/ComparisonHero";
import { ComparisonTable } from "@/components/ComparisonTable";
import { BenefitsSection } from "@/components/BenefitsSection";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <ComparisonHero />
      <ComparisonTable />
      <BenefitsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
