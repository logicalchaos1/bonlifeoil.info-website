import bonlifeLogo from "@/assets/bonlife-logo.png";
import { TrendingUp, Shield, Sparkles, Award } from "lucide-react";

export const ComparisonHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary-light to-premium-light pt-20 sm:pt-0">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      
      {/* Floating decorative shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-premium/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10">
        <div className="text-center mb-12 sm:mb-16 space-y-6">
          {/* Logo with enhanced animation */}
          <div className="flex justify-center mb-6 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
              <img src={bonlifeLogo} alt="Bonlife Logo" className="relative h-24 sm:h-32 md:h-40 w-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300" />
            </div>
          </div>
          
          {/* Main headline */}
          <div className="space-y-4 animate-fade-in animation-delay-200">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight">
              Aceites Premium que
              <span className="block text-gold mt-2">Transforman tu Negocio</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto px-4">
              La diferencia es clara: calidad superior, ahorro garantizado
            </p>
          </div>

          {/* Stats badges */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8 animate-fade-in animation-delay-400">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20 hover:bg-white/15 transition-all hover:scale-105">
              <div className="flex items-center gap-3">
                <div className="bg-gold/20 p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-gold" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">20%</div>
                  <div className="text-xs text-white/80">Ahorro</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20 hover:bg-white/15 transition-all hover:scale-105">
              <div className="flex items-center gap-3">
                <div className="bg-premium/20 p-2 rounded-lg">
                  <Shield className="w-5 h-5 text-premium" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">99.9%</div>
                  <div className="text-xs text-white/80">Pureza</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20 hover:bg-white/15 transition-all hover:scale-105">
              <div className="flex items-center gap-3">
                <div className="bg-gold/20 p-2 rounded-lg">
                  <Award className="w-5 h-5 text-gold" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">24h</div>
                  <div className="text-xs text-white/80">Entrega</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20 hover:bg-white/15 transition-all hover:scale-105">
              <div className="flex items-center gap-3">
                <div className="bg-premium/20 p-2 rounded-lg">
                  <Sparkles className="w-5 h-5 text-premium" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-xs text-white/80">Calidad</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="mt-8 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Bonlife Premium</h3>
                  <ul className="space-y-2 text-sm sm:text-base text-white/90">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                      99.9% pureza certificada
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                      20% ahorro garantizado
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                      Omega-3 y antioxidantes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                      Entrega en 24 horas
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                      Mayor estabilidad térmica
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white/70 mb-2">Competidores</h3>
                  <ul className="space-y-2 text-sm sm:text-base text-white/60">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span>
                      Menor pureza y calidad
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span>
                      Precios más altos
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span>
                      Aditivos adicionales
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span>
                      Tiempos de entrega lentos
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-white/40 rounded-full"></span>
                      Cambios frecuentes de aceite
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};