export const ComparisonTable = () => {
  const competitors = [
    {
      name: "Bonlife",
      subtitle: "RBD Palma (99.9% puro)",
      volume: "25 L",
      price: "5,428",
      priceWithTax: "5,428",
      duration: "↑ RD$ 97/h",
      durationHours: 56,
      features: "99.9% refinado, sin aditivos, vida útil 5x más larga",
      savings: "BASE",
      savingsSubtitle: "costo estándar",
      isBonlife: true,
      costPerHour: 97,
    },
    {
      name: "Capullo",
      subtitle: "(soya refinada)",
      volume: "20 L",
      price: "3,074",
      priceWithTax: "3,074",
      duration: "↓ RD$ 256/h",
      durationHours: 12,
      features: "Alto costo operativo, requiere cambios frecuentes",
      savings: "+ 164%",
      savingsSubtitle: "más caro por hora",
      costPerHour: 256,
    },
    {
      name: "Mazola",
      subtitle: "(maíz)",
      volume: "17 L",
      price: "3,712",
      priceWithTax: "3,712",
      duration: "↓ RD$ 309/h",
      durationHours: 12,
      features: "Degradación rápida a altas temperaturas",
      savings: "+ 218%",
      savingsSubtitle: "más caro por hora",
      costPerHour: 309,
    },
    {
      name: "Crisol",
      subtitle: "(soya)",
      volume: "15.8 L",
      price: "3,045",
      priceWithTax: "3,045",
      duration: "↓ RD$ 232/h",
      durationHours: 13,
      features: "Baja estabilidad térmica, sabor residual fuerte",
      savings: "+ 139%",
      savingsSubtitle: "más caro por hora",
      costPerHour: 232,
    },
    {
      name: "El Gallo",
      subtitle: "(soya)",
      volume: "14.8 L",
      price: "3,016",
      priceWithTax: "3,016",
      duration: "↓ RD$ 204/h",
      durationHours: 15,
      features: "Duración limitada en frituras continuas",
      savings: "+ 110%",
      savingsSubtitle: "más caro por hora",
      costPerHour: 204,
    },
    {
      name: "Aceite Económico",
      subtitle: "(mezcla soya)",
      volume: "13.6 L",
      price: "2,367",
      priceWithTax: "2,367",
      duration: "↓ RD$ 176/h",
      durationHours: 13,
      features: "Alto contenido de residuos, espuma excesiva",
      savings: "+ 81%",
      savingsSubtitle: "más caro por hora",
      costPerHour: 176,
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
                    Volumen<br />Real
                  </th>
                  <th className="py-4 px-3 text-center font-bold border-r border-premium-light">
                    Precio<br />con ITBIS
                  </th>
                  <th className="py-4 px-3 text-center font-bold border-r border-premium-light">
                    Costo Real<br />por Hora<br />de Fritura
                  </th>
                  <th className="py-4 px-4 text-left font-bold border-r border-premium-light">
                    Características<br />principales
                  </th>
                  <th className="py-4 px-3 text-center font-bold">
                    Diferencia<br />vs Bonlife
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
                    <td className="py-4 px-3 text-center font-bold border-r border-border">
                      <span className={item.isBonlife ? "text-primary text-xl" : "text-destructive text-xl"}>
                        {item.duration}
                      </span>
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
                {competitors.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-24 text-sm font-semibold text-right">
                      {item.name}
                      {item.isBonlife && <div className="text-xs text-primary">99.9% puro</div>}
                    </div>
                    <div className="flex-1 bg-secondary rounded-lg overflow-hidden relative h-12">
                      <div
                        className={`${
                          item.isBonlife ? "bg-premium" : "bg-destructive/70"
                        } h-full flex items-center justify-end px-3 text-white font-bold transition-all duration-700`}
                        style={{ width: `${(item.costPerHour / 309) * 100}%` }}
                      >
                        {item.costPerHour}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs text-muted-foreground px-24">
                <span>0</span>
                <span>100</span>
                <span>200</span>
                <span>300</span>
              </div>
            </div>

            {/* Duration Chart */}
            <div>
              <h4 className="text-xl font-bold text-center mb-6">
                DURACIÓN EN FREIDORA <span className="text-muted-foreground">(HORAS)</span>
              </h4>
              <div className="space-y-3">
                {competitors.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-24 text-sm font-semibold text-right truncate">
                      {item.name}
                    </div>
                    <div className="flex-1 bg-secondary rounded-lg overflow-hidden relative h-12">
                      <div
                        className={`${
                          item.isBonlife ? "bg-premium" : "bg-gold/60"
                        } h-full flex items-center justify-end px-3 text-white font-bold transition-all duration-700`}
                        style={{ width: `${(item.durationHours / 56) * 100}%` }}
                      >
                        {item.durationHours}h
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs text-muted-foreground px-24">
                <span>0h</span>
                <span>28h</span>
                <span>56h</span>
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
                  Bonlife cuesta más por bidón... <span className="font-bold">pero rinde muchísimo más.</span>
                </p>
                <div className="flex flex-col md:flex-row gap-4 text-base md:text-lg">
                  <div>
                    Costo real por hora: <span className="font-bold text-gold">Bonlife: RD$ 97/h</span>
                  </div>
                  <div>
                    <span className="font-bold text-gold">Competencia: RD$ 176-309/h</span> (81-218% más caro)
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
