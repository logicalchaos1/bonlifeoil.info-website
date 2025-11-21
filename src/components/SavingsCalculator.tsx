import { useState } from "react";
import { Calculator, TrendingDown, Clock, Droplet, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const SavingsCalculator = () => {
  const [currentBrand, setCurrentBrand] = useState<string>("capullo");
  const [currentPrice, setCurrentPrice] = useState<string>("3074");
  const [currentVolume, setCurrentVolume] = useState<string>("20");
  const [monthlyHours, setMonthlyHours] = useState<string>("480");

  // Bonlife specs (25L container)
  const bonlifePrice = 5428;
  const bonlifeVolume = 25;
  const bonlifeDurationHours = 56;
  const bonlifeCostPerHour = bonlifePrice / bonlifeDurationHours; // 97

  // Competitor data
  const competitorSpecs: Record<string, { duration: number; name: string }> = {
    capullo: { duration: 12, name: "Capullo (Soya)" },
    mazola: { duration: 12, name: "Mazola (Maíz)" },
    crisol: { duration: 13, name: "Crisol (Soya)" },
    elgallo: { duration: 15, name: "El Gallo (Soya)" },
    economico: { duration: 13, name: "Aceite Económico" },
  };

  const price = parseFloat(currentPrice) || 0;
  const volume = parseFloat(currentVolume) || 1;
  const hours = parseFloat(monthlyHours) || 0;
  const currentDuration = competitorSpecs[currentBrand]?.duration || 12;

  // Calculations for current oil
  const currentCostPerHour = price / currentDuration;
  const currentMonthlyCost = currentCostPerHour * hours;
  const currentOilChangesPerMonth = hours / currentDuration;
  const currentContainersPerMonth = currentOilChangesPerMonth; // 1 container per change

  // Calculations for Bonlife
  const bonlifeMonthlyCost = bonlifeCostPerHour * hours;
  const bonlifeOilChangesPerMonth = hours / bonlifeDurationHours;
  const bonlifeContainersPerMonth = bonlifeOilChangesPerMonth;

  // Savings
  const monthlySavings = currentMonthlyCost - bonlifeMonthlyCost;
  const annualSavings = monthlySavings * 12;
  const savingsPercent = currentMonthlyCost > 0 ? ((monthlySavings / currentMonthlyCost) * 100).toFixed(0) : 0;
  const containersSaved = currentContainersPerMonth - bonlifeContainersPerMonth;
  const changesSaved = currentOilChangesPerMonth - bonlifeOilChangesPerMonth;

  return (
    <section className="py-24 bg-gradient-to-br from-secondary to-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
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
              Compare su aceite actual con Bonlife - vea el ahorro real en todos los aspectos
            </p>
          </div>

          {/* Calculator Card */}
          <Card className="p-8 md:p-12 bg-white shadow-2xl border-2 border-gold/20">
            {/* Input Section */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              {/* Current Oil Inputs */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-center mb-6 text-destructive">Su Aceite Actual</h3>
                
                <div>
                  <Label htmlFor="currentBrand" className="text-base font-semibold mb-2 block">
                    Marca de aceite que usa
                  </Label>
                  <Select value={currentBrand} onValueChange={setCurrentBrand}>
                    <SelectTrigger className="h-12 text-base border-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(competitorSpecs).map(([key, { name }]) => (
                        <SelectItem key={key} value={key}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="currentPrice" className="text-base font-semibold mb-2 block">
                    Precio por bidón/envase (RD$)
                  </Label>
                  <Input
                    id="currentPrice"
                    type="number"
                    value={currentPrice}
                    onChange={(e) => setCurrentPrice(e.target.value)}
                    className="text-xl font-bold h-12 border-2"
                    min="0"
                    step="1"
                  />
                </div>

                <div>
                  <Label htmlFor="currentVolume" className="text-base font-semibold mb-2 block">
                    Volumen del envase (Litros)
                  </Label>
                  <Input
                    id="currentVolume"
                    type="number"
                    value={currentVolume}
                    onChange={(e) => setCurrentVolume(e.target.value)}
                    className="text-xl font-bold h-12 border-2"
                    min="1"
                    step="0.1"
                  />
                </div>

                <div className="bg-destructive/10 rounded-lg p-4 text-sm">
                  <div className="font-semibold mb-1">Duración en freidora:</div>
                  <div className="text-2xl font-bold text-destructive">{currentDuration} horas</div>
                  <div className="text-xs text-muted-foreground mt-1">Promedio para aceites de {competitorSpecs[currentBrand]?.name}</div>
                </div>
              </div>

              {/* Monthly Usage */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-center mb-6 text-premium">Bonlife RBD Palma</h3>
                
                <div>
                  <Label htmlFor="monthlyHours" className="text-base font-semibold mb-2 block">
                    Horas de fritura por mes
                  </Label>
                  <Input
                    id="monthlyHours"
                    type="number"
                    value={monthlyHours}
                    onChange={(e) => setMonthlyHours(e.target.value)}
                    className="text-xl font-bold h-12 border-2 border-premium/30 focus:border-premium"
                    min="0"
                    step="1"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Ejemplo: 16 horas/día × 30 días = 480 horas/mes
                  </p>
                </div>

                <div className="bg-premium/10 rounded-lg p-4">
                  <div className="text-sm font-semibold mb-1">Precio Bonlife 25L:</div>
                  <div className="text-2xl font-bold text-premium">RD$ {bonlifePrice.toLocaleString('es-DO')}</div>
                </div>

                <div className="bg-premium/10 rounded-lg p-4">
                  <div className="text-sm font-semibold mb-1">Duración en freidora:</div>
                  <div className="text-2xl font-bold text-premium">{bonlifeDurationHours} horas</div>
                  <div className="text-xs text-muted-foreground mt-1">99.9% puro, máxima estabilidad térmica</div>
                </div>
              </div>
            </div>

            {/* Comparison Results */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {/* Current Oil Cost */}
              <div className="bg-gradient-to-br from-destructive/90 to-destructive rounded-2xl p-6 text-white">
                <h4 className="text-lg font-bold mb-4 opacity-90">Costo Mensual Actual</h4>
                <div className="text-5xl font-bold mb-2">
                  RD$ {currentMonthlyCost.toLocaleString('es-DO', { maximumFractionDigits: 0 })}
                </div>
                <div className="text-sm opacity-90">
                  RD$ {currentCostPerHour.toFixed(2)}/hora × {hours.toLocaleString('es-DO')} horas
                </div>
              </div>

              {/* Bonlife Cost */}
              <div className="bg-gradient-to-br from-premium to-premium-dark rounded-2xl p-6 text-white">
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gold">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  Costo Mensual con Bonlife
                </h4>
                <div className="text-5xl font-bold text-gold mb-2">
                  RD$ {bonlifeMonthlyCost.toLocaleString('es-DO', { maximumFractionDigits: 0 })}
                </div>
                <div className="text-sm opacity-90">
                  RD$ {bonlifeCostPerHour.toFixed(2)}/hora × {hours.toLocaleString('es-DO')} horas
                </div>
              </div>
            </div>

            {/* Savings Highlight */}
            <div className="bg-gradient-to-r from-gold/20 to-gold/10 rounded-2xl p-8 mb-10 border-2 border-gold">
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground mb-2">SU AHORRO TOTAL</div>
                <div className="text-6xl md:text-7xl font-bold text-premium mb-3">
                  RD$ {monthlySavings.toLocaleString('es-DO', { maximumFractionDigits: 0 })}
                </div>
                <div className="text-2xl font-bold text-destructive mb-6">
                  Ahorra {savingsPercent}% cada mes
                </div>
                <div className="grid md:grid-cols-2 gap-6 pt-6 border-t-2 border-gold/30">
                  <div>
                    <div className="text-sm font-semibold text-muted-foreground mb-1">Ahorro Mensual</div>
                    <div className="text-3xl font-bold text-premium">
                      RD$ {monthlySavings.toLocaleString('es-DO', { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-muted-foreground mb-1">Ahorro Anual</div>
                    <div className="text-3xl font-bold text-premium">
                      RD$ {annualSavings.toLocaleString('es-DO', { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Savings Breakdown */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Cost per Hour Savings */}
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-muted-foreground mb-1">Costo por Hora</div>
                    <div className="text-2xl font-bold text-primary mb-1">
                      -{((currentCostPerHour - bonlifeCostPerHour) / currentCostPerHour * 100).toFixed(0)}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      De RD$ {currentCostPerHour.toFixed(0)} a RD$ {bonlifeCostPerHour.toFixed(0)}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Oil Changes Savings */}
              <Card className="p-6 bg-gradient-to-br from-premium/5 to-premium/10 border-premium/20">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-premium rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingDown className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-muted-foreground mb-1">Cambios de Aceite</div>
                    <div className="text-2xl font-bold text-premium mb-1">
                      -{changesSaved.toFixed(1)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {bonlifeOilChangesPerMonth.toFixed(1)} vs {currentOilChangesPerMonth.toFixed(1)} cambios/mes
                    </div>
                  </div>
                </div>
              </Card>

              {/* Container Savings */}
              <Card className="p-6 bg-gradient-to-br from-gold/5 to-gold/10 border-gold/20">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <Droplet className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-muted-foreground mb-1">Envases Menos</div>
                    <div className="text-2xl font-bold text-gold mb-1">
                      -{containersSaved.toFixed(1)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {bonlifeContainersPerMonth.toFixed(1)} vs {currentContainersPerMonth.toFixed(1)} envases/mes
                    </div>
                  </div>
                </div>
              </Card>

              {/* Time Savings */}
              <Card className="p-6 bg-gradient-to-br from-secondary to-secondary/50 border-border">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-background" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-muted-foreground mb-1">Tiempo Ahorrado</div>
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {(changesSaved * 0.5).toFixed(1)}h
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Menos tiempo cambiando aceite (~30 min/cambio)
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </Card>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p className="text-xl text-muted-foreground mb-4">
              Cálculos basados en datos reales del mercado y pruebas de estabilidad térmica
            </p>
            <p className="text-lg font-semibold text-premium">
              Reduzca costos, mejore eficiencia, y aumente rentabilidad con Bonlife
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
