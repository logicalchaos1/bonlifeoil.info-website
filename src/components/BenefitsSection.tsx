"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Zap, Thermometer, Truck, Heart, BarChart3 } from 'lucide-react';

export const BenefitsSection = () => {
  const benefits = [
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "99.9% Pureza Certificada",
      description: "Aceite vegetal de la más alta calidad, libre de impurezas. Frituras más limpias y crujientes.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "20% Ahorro Garantizado",
      description: "Precio competitivo garantizado. Ahorre en su presupuesto anual sin comprometer calidad.",
    },
    {
      icon: <Thermometer className="w-8 h-8" />,
      title: "Estabilidad Térmica",
      description: "Soporta altas temperaturas prolongadas sin degradación. Menos cambios de aceite.",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Entrega en 24 Horas",
      description: "Servicio rápido y confiable en Santo Domingo, Punta Cana y zonas turísticas.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Salud Cardiovascular",
      description: "Rico en Omega-3 y antioxidantes. Eleve la experiencia gastronómica de sus clientes.",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Mayor Rendimiento",
      description: "Más litros de uso efectivo. Reduce desperdicios y optimiza su inversión operativa.",
    },
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Por Qué Elegir <span className="text-primary">Bonlife</span></h2>
          <p className="text-lg text-muted-foreground">
            Combinamos tecnología de refinamiento avanzada con un servicio logístico impecable para potenciar su negocio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-sm border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500 group"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};