import React from 'react';
import { Download, FileText, BookOpen, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateCatalogPDF } from '@/utils/generateCatalogPDF';
import { generateBookletPDF } from '@/utils/generateBookletPDF';
import { generatePriceListPDF } from '@/utils/generatePriceListPDF';

const downloads = [
  {
    title: 'Catálogo Completo',
    description: 'Ficha técnica de todos los productos con especificaciones, beneficios e imágenes.',
    icon: FileText,
    action: generateCatalogPDF,
    filename: 'Catalogo-Bonlife.pdf',
  },
  {
    title: 'Booklet Comercial',
    description: 'Presentación compacta ideal para compartir con clientes y socios.',
    icon: BookOpen,
    action: generateBookletPDF,
    filename: 'Booklet-Bonlife.pdf',
  },
  {
    title: 'Lista de Precios',
    description: 'Tabla de precios actualizada de todos los productos Bonlife.',
    icon: DollarSign,
    action: generatePriceListPDF,
    filename: 'Lista-de-Precios-Bonlife.pdf',
  },
];

const DownloadsSection = () => {
  return (
    <section id="descargas" className="py-16 md:py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Documentos para Descargar</h2>
          <p className="text-muted-foreground text-lg">
            Descargue nuestros materiales en PDF para compartir con su equipo
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {downloads.map((item) => (
            <div
              key={item.title}
              className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm mb-5 flex-1">{item.description}</p>
              <Button onClick={item.action} className="gap-2 w-full">
                <Download className="w-4 h-4" />
                Descargar PDF
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DownloadsSection;
