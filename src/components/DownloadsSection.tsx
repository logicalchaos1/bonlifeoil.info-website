import React, { useState } from 'react';
import { Download, FileText, BookOpen, DollarSign, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';

const downloads = [
  {
    title: 'Catálogo Completo',
    description: 'Ficha técnica de todos los productos con especificaciones, beneficios e imágenes.',
    icon: FileText,
    action: async () => {
      const { generateCatalogPDF } = await import('@/utils/generateCatalogPDF');
      await generateCatalogPDF();
    },
  },
  {
    title: 'Booklet Comercial',
    description: 'Presentación compacta ideal para compartir con clientes y socios.',
    icon: BookOpen,
    action: async () => {
      const { generateBookletPDF } = await import('@/utils/generateBookletPDF');
      await generateBookletPDF();
    },
  },
  {
    title: 'Lista de Precios',
    description: 'Tabla de precios actualizada de todos los productos Bonlife.',
    icon: DollarSign,
    action: async () => {
      const { generatePriceListPDF } = await import('@/utils/generatePriceListPDF');
      await generatePriceListPDF();
    },
  },
  {
    title: 'Ficha Técnica — Margarina',
    description: 'Especificaciones técnicas, aplicaciones y almacenamiento de la Margarina Bonlife.',
    icon: ClipboardList,
    action: async () => {
      const { generateMargarinaFichaTecnica } = await import('@/utils/generateMargarinaFichaTecnica');
      await generateMargarinaFichaTecnica();
    },
  },
];

const DownloadsSection = () => {
  const [loadingTitle, setLoadingTitle] = useState<string | null>(null);

  const handleDownload = async (title: string, action: () => Promise<void>) => {
    try {
      setLoadingTitle(title);
      await action();
    } finally {
      setLoadingTitle(null);
    }
  };

  return (
    <section id="descargas" className="bg-muted/30 px-4 py-16 md:py-20">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold md:text-4xl">Documentos para Descargar</h2>
          <p className="text-lg text-muted-foreground">
            Descargue nuestros materiales en PDF para compartir con su equipo
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {downloads.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <item.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
              <p className="mb-5 flex-1 text-sm text-muted-foreground">{item.description}</p>
              <Button
                onClick={() => handleDownload(item.title, item.action)}
                className="w-full gap-2"
                disabled={loadingTitle === item.title}
              >
                <Download className="h-4 w-4" />
                {loadingTitle === item.title ? 'Generando PDF...' : 'Descargar PDF'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DownloadsSection;
