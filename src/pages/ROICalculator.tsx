import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Calculator, TrendingDown, DollarSign, Droplets, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useSeo } from "@/hooks/use-seo";

const ROICalculator = () => {
  useSeo({
    title: "Calculadora de Ahorro en Aceite de Freír | Bonlife Oil",
    description: "Calcule cuánto ahorra su hotel o restaurante al cambiar a aceite para freír Bonlife en República Dominicana.",
    path: "/calculadora-ahorro",
  });
  const [monthlySpend, setMonthlySpend] = useState("");
  const [litersPerMonth, setLitersPerMonth] = useState("");
  const [oilChangesPerWeek, setOilChangesPerWeek] = useState("");
  const [calculated, setCalculated] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const spend = parseFloat(monthlySpend) || 0;
  const liters = parseFloat(litersPerMonth) || 0;
  const changes = parseFloat(oilChangesPerWeek) || 0;

  // Bonlife savings calculations
  const costSavings = spend * 0.20; // 20% savings
  const annualSavings = costSavings * 12;
  const oilReduction = changes > 0 ? Math.round(changes * 0.30) : 0; // 30% fewer changes
  const reducedChanges = changes - oilReduction;
  const litersSaved = liters * 0.15; // 15% less oil absorption

  const handleCalculate = () => {
    if (spend <= 0) return;
    setCalculated(true);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setLoading(true);
    const { error } = await supabase.from("leads").insert({
      name: name.trim().slice(0, 100),
      company: company.trim().slice(0, 200) || null,
      phone: phone.trim().slice(0, 20),
      email: email.trim().slice(0, 255) || null,
      monthly_consumption: `$${spend}/mes, ${liters}L/mes`,
      source: "roi_calculator",
    });

    setLoading(false);
    if (error) {
      toast.error("Error al enviar. Intente de nuevo.");
      return;
    }

    toast.success("¡Solicitud enviada! Le contactaremos en menos de 24 horas.");
    setShowLeadForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm mb-6">
                <Calculator className="w-4 h-4" /> Calculadora de ROI
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                ¿Cuánto Puede Ahorrar Su Hotel?
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
                Ingrese su consumo actual y descubra cuánto ahorraría con Bonlife Oil Premium 99.9% pureza
              </p>
            </motion.div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Calculator inputs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-2xl p-8 mb-8"
            >
              <h2 className="text-xl font-bold text-foreground mb-6">Su Consumo Actual</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Gasto Mensual en Aceite (USD)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="5,000"
                      value={monthlySpend}
                      onChange={(e) => { setMonthlySpend(e.target.value); setCalculated(false); }}
                      className="pl-9"
                      min="0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Litros Consumidos / Mes
                  </label>
                  <div className="relative">
                    <Droplets className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="2,000"
                      value={litersPerMonth}
                      onChange={(e) => { setLitersPerMonth(e.target.value); setCalculated(false); }}
                      className="pl-9"
                      min="0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Cambios de Aceite / Semana
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="14"
                      value={oilChangesPerWeek}
                      onChange={(e) => { setOilChangesPerWeek(e.target.value); setCalculated(false); }}
                      className="pl-9"
                      min="0"
                    />
                  </div>
                </div>
              </div>
              <Button onClick={handleCalculate} className="mt-6 w-full md:w-auto px-8 py-6 text-lg" disabled={spend <= 0}>
                <Calculator className="w-5 h-5 mr-2" /> Calcular Mi Ahorro
              </Button>
            </motion.div>

            {/* Results */}
            {calculated && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 text-center">
                    <TrendingDown className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Ahorro Mensual</p>
                    <p className="text-3xl font-bold text-primary">${costSavings.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
                    <p className="text-xs text-muted-foreground mt-1">20% menos vs competencia</p>
                  </div>
                  <div className="bg-accent/50 border border-border rounded-2xl p-6 text-center">
                    <DollarSign className="w-8 h-8 text-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Ahorro Anual</p>
                    <p className="text-3xl font-bold text-foreground">${annualSavings.toLocaleString("en-US", { maximumFractionDigits: 0 })}</p>
                    <p className="text-xs text-muted-foreground mt-1">Proyección a 12 meses</p>
                  </div>
                  <div className="bg-card border border-border rounded-2xl p-6 text-center">
                    <Droplets className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Litros Ahorrados / Mes</p>
                    <p className="text-3xl font-bold text-foreground">{litersSaved.toLocaleString("en-US", { maximumFractionDigits: 0 })}L</p>
                    <p className="text-xs text-muted-foreground mt-1">15% menos absorción</p>
                  </div>
                </div>

                {changes > 0 && (
                  <div className="bg-card border border-border rounded-2xl p-6 mb-8">
                    <h3 className="font-bold text-foreground mb-4">Reducción de Cambios de Aceite</h3>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Actual</p>
                        <p className="text-2xl font-bold text-destructive">{changes}/sem</p>
                      </div>
                      <ArrowRight className="w-6 h-6 text-primary" />
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Con Bonlife</p>
                        <p className="text-2xl font-bold text-primary">{reducedChanges}/sem</p>
                      </div>
                      <div className="ml-auto bg-primary/10 px-4 py-2 rounded-xl">
                        <p className="text-sm font-bold text-primary">-{oilReduction} cambios/sem</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      Mayor punto de humo = aceite dura más tiempo sin degradarse
                    </p>
                  </div>
                )}

                {/* CTA */}
                <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-primary-foreground text-center">
                  <h3 className="text-2xl font-bold mb-2">
                    Ahorre ${annualSavings.toLocaleString("en-US", { maximumFractionDigits: 0 })} al Año
                  </h3>
                  <p className="opacity-90 mb-6">
                    Solicite una prueba gratuita y compruebe los resultados en su propia cocina
                  </p>
                  {showLeadForm ? (
                    <form onSubmit={handleLeadSubmit} className="max-w-md mx-auto space-y-3">
                      <Input placeholder="Nombre *" value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} className="bg-white text-foreground" />
                      <Input placeholder="Hotel / Restaurante" value={company} onChange={(e) => setCompany(e.target.value)} maxLength={200} className="bg-white text-foreground" />
                      <div className="grid grid-cols-2 gap-3">
                        <Input placeholder="Teléfono *" value={phone} onChange={(e) => setPhone(e.target.value)} required maxLength={20} type="tel" className="bg-white text-foreground" />
                        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" maxLength={255} className="bg-white text-foreground" />
                      </div>
                      <Button type="submit" variant="secondary" className="w-full py-6 text-lg" disabled={loading}>
                        {loading ? "Enviando..." : "Solicitar Prueba Gratuita"}
                      </Button>
                    </form>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button variant="secondary" size="lg" className="text-lg px-8" onClick={() => setShowLeadForm(true)}>
                        Solicitar Prueba Gratuita
                      </Button>
                      <a
                        href={`https://wa.me/18299876764?text=${encodeURIComponent(`Hola Bonlife, acabo de calcular que puedo ahorrar $${annualSavings.toLocaleString("en-US", { maximumFractionDigits: 0 })} al año. Quiero más información.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#20BA5A] transition-colors text-lg"
                      >
                        Cotizar por WhatsApp
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-primary-foreground/70 py-8 text-center text-sm">
        <p>© {new Date().getFullYear()} Bonlife Oil — Calculadora de Ahorro para Hoteles</p>
      </footer>
    </div>
  );
};

export default ROICalculator;
