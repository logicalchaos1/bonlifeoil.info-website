export const ComparisonTable = () => {
  const competitors = [
    {
      name: "Bonlife",
      subtitle: "RBD Palín (99.9% puro)",
      volume: "25 L",
      price: "5.428",
      priceWithTax: "5.428",
      duration: "↑ RD 97/h",
      features: "98.9% descodovizado, sin aditives, vilea a-staple dura 5x",
      savings: "≥ 62%",
      savingsSubtitle: "más costo por hora",
      isBonlife: true,
    },
    {
      name: "Capullo",
      subtitle: "(soya + girasol)",
      volume: "20 L",
      price: "3.074",
      priceWithTax: "3.074",
      duration: "↑ RD 256/h",
      features: "Alto costo por hora, prutaclan rapula",
      savings: "≥ 68%",
      savingsSubtitle: "más caidio por hora",
    },
    {
      name: "Mazola",
      subtitle: "(maíz)",
      volume: "17 L",
      price: "3.712",
      priceWithTax: "3.712",
      duration: "↑ RD 309/h",
      features: "Alto costo por hora",
      savings: "≥ 68%",
      savingsSubtitle: "más caidio por hora",
    },
    {
      name: "Crisol",
      subtitle: "(soya)",
      volume: "15,8 L",
      price: "3.045",
      priceWithTax: "3.045",
      duration: "↑ RD 68 9/h",
      features: "Fuerte sabor, baja estbilidad",
      savings: "≥ 69%",
      savingsSubtitle: "más caidio por hora",
    },
    {
      name: "El Gallo",
      subtitle: "(soya)",
      volume: "14,8 L",
      price: "3.016",
      priceWithTax: "3.016",
      duration: "↑ RD 305/h",
      features: "No dura un día completo",
      savings: "≥ 67%",
      savingsSubtitle: "más caidio por hora",
    },
    {
      name: "Aceite Especial",
      subtitle: "(soya economico)",
      volume: "13,6 L",
      price: "2.367",
      priceWithTax: "2.367",
      duration: "↑ RD 275/h",
      features: "Mucho cesiduo",
      savings: "≥ 65%",
      savingsSubtitle: "más caidio por hora",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-background to-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-premium to-premium-dark rounded-t-3xl py-8 px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-2">
              <span className="text-gold">COMPARACIÓN DE ACEITES—</span>
            </h2>
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">
              BONLIFE <span className="text-white/80">vs</span> COMPETENCIA
            </h3>
            <p className="text-xl md:text-2xl text-gold font-semibold">
              (25 L equivalente)
            </p>
          </div>

          {/* Table */}
          <div className="bg-white shadow-2xl overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="bg-premium text-white">
                  <th className="py-4 px-4 text-left font-bold border-r border-premium-light">
                    Marca / Tipo<br />de Aceite
                  </th>
                  <th className="py-4 px-3 text-center font-bold border-r border-premium-light">
                    Precio<br />(RD$)
                  </th>
                  <th className="py-4 px-3 text-center font-bold border-r border-premium-light">
                    Precio<br />con ITBIS<br />con ITBIS
                  </th>
                  <th className="py-4 px-3 text-center font-bold border-r border-premium-light">
                    Duración<br />promedio<br />de uso
                  </th>
                  <th className="py-4 px-4 text-left font-bold border-r border-premium-light">
                    Característi-<br />cas principales
                  </th>
                  <th className="py-4 px-3 text-center font-bold">
                    Ahorro<br />estimado<br />vs Bonlife
                  </th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((item, index) => (
                  <tr
                    key={index}
                    className={`${
                      item.isBonlife
                        ? "bg-gradient-to-r from-gold/20 to-gold/10"
                        : index % 2 === 0
                        ? "bg-amber-50"
                        : "bg-white"
                    } border-b border-border hover:bg-secondary/30 transition-colors`}
                  >
                    <td className="py-4 px-4 border-r border-border">
                      <div className="flex items-center gap-3">
                        {item.isBonlife && (
                          <div className="w-8 h-8 flex-shrink-0">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="text-gold">
                              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                          </div>
                        )}
                        <div>
                          <div className={`font-bold text-lg ${item.isBonlife ? "text-gold text-2xl" : "text-foreground"}`}>
                            {item.name}
                          </div>
                          <div className="text-sm text-muted-foreground">{item.subtitle}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-center font-semibold border-r border-border">
                      {item.volume}
                    </td>
                    <td className="py-4 px-3 text-center font-bold text-lg border-r border-border">
                      {item.priceWithTax}
                    </td>
                    <td className="py-4 px-3 text-center font-bold text-primary border-r border-border">
                      {item.duration}
                    </td>
                    <td className="py-4 px-4 text-sm border-r border-border">
                      {item.features}
                    </td>
                    <td className="py-4 px-3 text-center">
                      <div className={`font-bold text-2xl ${item.isBonlife ? "text-primary" : "text-destructive"}`}>
                        {item.savings}
                      </div>
                      <div className="text-xs text-muted-foreground">{item.savingsSubtitle}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Charts Section */}
          <div className="grid md:grid-cols-2 gap-8 bg-white px-6 py-8">
            {/* Cost per Hour Chart */}
            <div>
              <h4 className="text-xl font-bold text-center mb-6">
                COSTO POR HORA <span className="text-muted-foreground">(RD$)</span>
              </h4>
              <div className="space-y-3">
                {[
                  { name: "Bonlife", value: 97, color: "bg-premium", label: "354% puré" },
                  { name: "Capille", value: 68, color: "bg-gold" },
                  { name: "Wrssoll", value: 65, color: "bg-gold" },
                  { name: "Chisil", value: 62, color: "bg-gold" },
                  { name: "El callo", value: 59, color: "bg-gold" },
                  { name: "Espcll", value: 56, color: "bg-gold" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-24 text-sm font-semibold text-right">
                      {item.name}
                      {item.label && <div className="text-xs text-muted-foreground">{item.label}</div>}
                    </div>
                    <div className="flex-1 h-12 bg-secondary rounded-lg overflow-hidden">
                      <div
                        className={`${item.color} h-full flex items-center justify-end px-3 text-white font-bold transition-all duration-500`}
                        style={{ width: `${item.value}%` }}
                      >
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs text-muted-foreground px-24">
                <span>0</span>
                <span>100</span>
              </div>
            </div>

            {/* Duration Chart */}
            <div>
              <h4 className="text-xl font-bold text-center mb-6">
                DURACIÓN <span className="text-muted-foreground">(HORAS)</span>
              </h4>
              <div className="space-y-3">
                {[
                  { name: "Bonlife", value: 90 },
                  { name: "Capille", value: 60 },
                  { name: "Chisil", value: 48 },
                  { name: "El Galle resaut", value: 38 },
                  { name: "Aceite Especial (soyu/economico)", value: 30 },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-32 text-sm font-semibold text-right truncate">
                      {item.name}
                    </div>
                    <div className="flex-1 h-12 bg-secondary rounded-lg overflow-hidden">
                      <div
                        className={`${
                          idx === 0 ? "bg-premium" : "bg-gold"
                        } h-full flex items-center justify-end px-3 text-white font-bold transition-all duration-500`}
                        style={{ width: `${item.value}%` }}
                      >
                        {item.value > 35 && item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs text-muted-foreground px-32">
                <span>0</span>
                <span>45-h</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-r from-premium to-premium-dark rounded-b-3xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="text-3xl md:text-5xl font-bold text-gold">
                RESUMEN
              </div>
              <div className="flex-1 text-white space-y-2">
                <p className="text-lg md:text-xl">
                  Bonlife cuesta más por bidón .. <span className="font-bold">pero rinde muchísimo más.</span>
                </p>
                <div className="flex flex-col md:flex-row gap-4 text-base md:text-lg">
                  <div>
                    Costo real por hora: <span className="font-bold text-gold">Bonlife: RD8 97/h</span>
                  </div>
                  <div>
                    <span className="font-bold text-gold">Competencia: 60% –70%</span> por cada horar de freidora
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
