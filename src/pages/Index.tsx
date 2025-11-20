import { ComparisonHero } from "@/components/ComparisonHero";
import { BenefitsSection } from "@/components/BenefitsSection";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <ComparisonHero />
      <BenefitsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
