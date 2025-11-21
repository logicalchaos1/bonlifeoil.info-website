import { useState } from "react";
import { Calculator } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const SavingsCalculator = () => {
  const [monthlyHours, setMonthlyHours] = useState<string>("480");

  const bonlifeCostPerHour = 97;
  const competitors = [
    { name: "Capullo", costPerHour: 256 },
    { name: "Mazola", costPerHour: 309 },
    { name: "Crisol", costPerHour: 232 },
    { name: "El Gallo", costPerHour: 204 },
    { name: "Aceite Económico", costPerHour: 176 },
  ];

  const hours = parseFloat(monthlyHours) || 0;
  const bonlifeMonthlyCost = hours * bonlifeCostPerHour;

  const calculateSavings = (competitorCostPerHour: number) => {
    const competitorMonthlyCost = hours * competitorCostPerHour;
    const savings = competitorMonthlyCost - bonlifeMonthlyCost;
    const savingsPercent = bonlifeMonthlyCost > 0 
      ? ((savings / competitorMonthlyCost) * 100).toFixed(0)
      : 0;
    return { savings, savingsPercent, competitorMonthlyCost };
  };

  const avgCompetitorCost = competitors.reduce((sum, c) => sum + c.costPerHour, 0) / competitors.length;
  const avgSavings = calculateSavings(avgCompetitorCost);

  return (
    <section className="py-24 bg-gradient-to-br from-secondary to-background">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-premium text-white px-6 py-3 rounded-full mb-4">
              <Calculator className="w-6 h-6" />
              <span className="font-bold text-lg">CALCULADORA DE AHORRO</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              ¿Cuánto Puede <span className="text-premium">Ahorrar Su Restaurante</span>?
            </h2>
            <p className="text-xl text-muted-foreground">
              Descubra el ahorro real con Bonlife comparado con aceites de la competencia
            </p>
          </div>

          {/* Calculator Card */}
          <Card className="p-8 md:p-12 bg-white shadow-2xl border-2 border-gold/20">
            {/* Input Section */}
            <div className="mb-10">
              <Label htmlFor="monthlyHours" className="text-lg font-semibold mb-3 block">
                Horas de fritura por mes
              </Label>
              <div className="flex items-center gap-4">
                <Input
                  id="monthlyHours"
                  type="number"
                  value={monthlyHours}
                  onChange={(e) => setMonthlyHours(e.target.value)}
                  className="text-2xl font-bold h-16 text-center border-2 border-premium/30 focus:border-premium"
                  min="0"
                  step="1"
                />
                <span className="text-xl font-semibold text-muted-foreground">horas/mes</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Ejemplo: Un restaurante típico usa 16 horas/día × 30 días = 480 horas/mes
              </p>
            </div>

            {/* Results Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              {/* Bonlife Cost */}
              <div className="bg-gradient-to-br from-premium to-premium-dark rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gold">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  Costo Mensual con Bonlife
                </h3>
                <div className="text-5xl font-bold text-gold mb-2">
                  RD$ {bonlifeMonthlyCost.toLocaleString('es-DO', { maximumFractionDigits: 0 })}
                </div>
                <div className="text-sm opacity-90">
                  RD$ {bonlifeCostPerHour}/hora × {hours.toLocaleString('es-DO')} horas
                </div>
              </div>

              {/* Average Competitor Cost */}
              <div className="bg-gradient-to-br from-destructive/90 to-destructive rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">
                  Costo Promedio Competencia
                </h3>
                <div className="text-5xl font-bold mb-2">
                  RD$ {avgSavings.competitorMonthlyCost.toLocaleString('es-DO', { maximumFractionDigits: 0 })}
                </div>
                <div className="text-sm opacity-90">
                  RD$ {avgCompetitorCost.toFixed(0)}/hora × {hours.toLocaleString('es-DO')} horas
                </div>
              </div>
            </div>

            {/* Savings Highlight */}
            <div className="bg-gradient-to-r from-gold/20 to-gold/10 rounded-2xl p-8 mb-8 border-2 border-gold">
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground mb-2">SU AHORRO MENSUAL CON BONLIFE</div>
                <div className="text-6xl md:text-7xl font-bold text-premium mb-3">
                  RD$ {avgSavings.savings.toLocaleString('es-DO', { maximumFractionDigits: 0 })}
                </div>
                <div className="text-2xl font-bold text-destructive">
                  Ahorra {avgSavings.savingsPercent}% vs. competencia promedio
                </div>
                <div className="mt-6 pt-6 border-t-2 border-gold/30">
                  <div className="text-xl font-semibold text-foreground">
                    Ahorro Anual Proyectado: <span className="text-premium text-3xl">RD$ {(avgSavings.savings * 12).toLocaleString('es-DO', { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Comparison */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center">
                Ahorro Detallado por Competidor
              </h3>
              <div className="grid gap-4">
                {competitors.map((competitor) => {
                  const { savings, savingsPercent } = calculateSavings(competitor.costPerHour);
                  return (
                    <div
                      key={competitor.name}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center gap-4 mb-2 md:mb-0">
                        <div className="font-bold text-lg min-w-[120px]">{competitor.name}</div>
                        <div className="text-sm text-muted-foreground">
                          RD$ {competitor.costPerHour}/hora
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-premium">
                          +RD$ {savings.toLocaleString('es-DO', { maximumFractionDigits: 0 })}
                        </div>
                        <div className="text-sm text-destructive font-semibold">
                          Ahorra {savingsPercent}% al mes
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p className="text-xl text-muted-foreground mb-4">
              Los cálculos están basados en datos reales del mercado dominicano
            </p>
            <p className="text-lg font-semibold text-premium">
              ¿Listo para reducir sus costos operativos? Contáctenos hoy mismo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
