"use client";

import React from 'react';
import { Check, X, Star, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const ComparisonTable = () => {
  const competitors = [
    {
      name: "Bonlife Premium",
      type: "RBD Palma (99.9%)",
      volume: "25 L",
      costPerHour: 82,
      duration: 56,
      features: "Vida útil 5x más larga, sin aditivos",
      isBonlife: true,
    },
    {
      name: "Capullo",
      type: "Soya Refinada",
      volume: "20 L",
      costPerHour: 217,
      duration: 12,
      features: "Requiere cambios frecuentes",
      isBonlife: false,
    },
    {
      name: "Mazola",
      type: "Maíz",
      volume: "17 L",
      costPerHour: 262,
      duration: 12,
      features: "Degradación rápida",
      isBonlife: false,
    },
    {
      name: "Crisol",
      type: "Soya",
      volume: "15.8 L",
      costPerHour: 199,
      duration: 13,
      features: "Baja estabilidad térmica",
      isBonlife: false,
    },
  ];

  return (
    <section id="comparacion" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">La Ciencia del <span className="text-primary">Rendimiento</span></h2>
          <p className="text-lg text-muted-foreground">
            No todos los aceites son iguales. Bonlife está diseñado para soportar las condiciones más exigentes de la cocina profesional.
          </p>
        </div>

        <div className="max-w-6xl mx-auto overflow-hidden rounded-3xl border border-border shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="p-6 font-bold text-sm uppercase tracking-wider text-muted-foreground">Marca / Tipo</th>
                  <th className="p-6 font-bold text-sm uppercase tracking-wider text-muted-foreground text-center">Volumen</th>
                  <th className="p-6 font-bold text-sm uppercase tracking-wider text-muted-foreground text-center">Duración (h)</th>
                  <th className="p-6 font-bold text-sm uppercase tracking-wider text-muted-foreground text-center">Costo / Hora</th>
                  <th className="p-6 font-bold text-sm uppercase tracking-wider text-muted-foreground">Diferencia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {competitors.map((item, i) => (
                  <tr 
                    key={i} 
                    className={cn(
                      "transition-colors hover:bg-secondary/30",
                      item.isBonlife ? "bg-primary/5" : "bg-white"
                    )}
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        {item.isBonlife && <Star className="text-gold fill-gold" size={20} />}
                        <div>
                          <div className={cn("font-bold text-lg", item.isBonlife ? "text-primary" : "text-foreground")}>
                            {item.name}
                          </div>
                          <div className="text-sm text-muted-foreground">{item.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 text-center font-medium">{item.volume}</td>
                    <td className="p-6 text-center">
                      <div className={cn(
                        "inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-bold",
                        item.isBonlife ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
                      )}>
                        {item.duration}h
                      </div>
                    </td>
                    <td className="p-6 text-center font-bold text-lg">
                      RD$ {item.costPerHour}
                    </td>
                    <td className="p-6">
                      {item.isBonlife ? (
                        <div className="flex items-center gap-2 text-primary font-bold">
                          <Check size={18} />
                          Máximo Ahorro
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-destructive font-medium">
                          <X size={18} />
                          +{Math.round(((item.costPerHour - 82) / 82) * 100)}% más caro
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { title: "Estabilidad Térmica", desc: "Mantiene sus propiedades hasta los 230°C sin degradarse." },
            { title: "Cero Transferencia", desc: "Fría pescado y papas en el mismo aceite sin mezclar sabores." },
            { title: "Menor Absorción", desc: "Alimentos más crujientes y menos grasosos para sus clientes." },
          ].map((feature, i) => (
            <div key={i} className="flex gap-4">
              <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                <Check size={20} />
              </div>
              <div>
                <h4 className="font-bold mb-1">{feature.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};