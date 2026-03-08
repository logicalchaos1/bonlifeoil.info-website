"use client";

import React from 'react';
import { motion } from 'framer-motion';
import bonlifeLogo from "@/assets/bonlife-logo.png";
import { TrendingUp, Shield, Sparkles, Award, ChevronDown } from "lucide-react";
import { Button } from '@/components/ui/button';

export const ComparisonHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a1a0f]">
      {/* Video/Image Background Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a1a0f] z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent z-10"></div>
        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-20 pt-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-white text-sm font-medium"
          >
            <span className="flex h-2 w-2 rounded-full bg-gold animate-ping"></span>
            Líder en Rendimiento para HORECA
          </motion.div>
          
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-4xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight"
          >
            El Estándar de Oro en <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold">Aceites Vegetales</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            99.9% de pureza certificada para cocinas que no comprometen la calidad. 
            Ahorre hasta un 20% en su presupuesto operativo anual.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button 
              size="lg" 
              className="bg-gold hover:bg-gold-light text-white text-lg px-10 py-7 rounded-full shadow-2xl shadow-gold/20 transition-all hover:scale-105"
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Solicitar Cotización
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white/5 backdrop-blur-md border-white/20 text-white hover:bg-white/10 text-lg px-10 py-7 rounded-full transition-all"
              onClick={() => document.getElementById('comparacion')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver Comparativa
            </Button>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-16">
            {[
              { icon: <TrendingUp className="text-gold" />, label: "Ahorro Real", value: "20%" },
              { icon: <Shield className="text-gold" />, label: "Pureza", value: "99.9%" },
              { icon: <Award className="text-gold" />, label: "Entrega", value: "24h" },
              { icon: <Sparkles className="text-gold" />, label: "Calidad", value: "Premium" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group"
              >
                <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/60 uppercase tracking-wider font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/40">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};