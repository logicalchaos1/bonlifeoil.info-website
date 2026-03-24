import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import palmImage from "@/assets/palm-oil-product.jpg";
import sunflowerImage from "@/assets/sunflower-oil-product.jpg";
import soyaImage from "@/assets/soya-oil-product.jpg";
import mantecaImage from "@/assets/manteca-product.jpg";
import margarineImage from "@/assets/margarine-product.jpg";
import frenchFriesImage from "@/assets/french-fries-product.jpg";
import potatoChipsImage from "@/assets/potato-chips-product.jpg";


const ProductCatalog = () => {
  const generatePDF = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPos = 20;

    // Helper function to convert image to base64
    const getBase64Image = (img: HTMLImageElement): string => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      return canvas.toDataURL('image/jpeg');
    };

    // Load images
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    };

    // Helper function to add new page if needed
    const checkPageBreak = (requiredSpace: number) => {
      if (yPos + requiredSpace > pageHeight - margin) {
        doc.addPage();
        yPos = 20;
        return true;
      }
      return false;
    };

    // Load Bonlife logo
    const logoImg = await loadImage(bonlifeLogo);
    
    // Header with logo
    doc.setFillColor(212, 175, 55); // Gold color
    doc.rect(0, 0, pageWidth, 45, 'F');
    
    // Add logo to header
    const logoBase64 = getBase64Image(logoImg);
    const logoWidth = 60;
    const logoHeight = 20;
    const logoX = (pageWidth - logoWidth) / 2;
    doc.addImage(logoBase64, 'PNG', logoX, 8, logoWidth, logoHeight);
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(255, 255, 255);
    doc.text("El verdadero aceite vegetal con el doble de duracion", pageWidth / 2, 38, { align: "center" });
    
    yPos = 55;
    doc.setTextColor(0, 0, 0);

    // Load product images
    const palmImg = await loadImage(palmImage);
    const soyaImg = await loadImage(soyaImage);
    const sunflowerImg = await loadImage(sunflowerImage);
    const mantecaImg = await loadImage(mantecaImage);
    const margarineImg = await loadImage(margarineImage);
    const frenchFriesImg = await loadImage(frenchFriesImage);
    const potatoChipsImg = await loadImage(potatoChipsImage);

    // Product 1: Aceite Bonlife RBD Palm Olein
    checkPageBreak(100);
    
    doc.setFillColor(212, 175, 55);
    doc.rect(margin - 5, yPos - 5, pageWidth - 2 * margin + 10, 10, 'F');
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("Aceite Bonlife RBD Palm Olein", margin, yPos);
    yPos += 15;
    
    // Add product image centered
    const palmBase64 = getBase64Image(palmImg);
    const imgWidth = 35;
    const imgHeight = 35;
    const imgX = (pageWidth - imgWidth) / 2;
    doc.addImage(palmBase64, 'JPEG', imgX, yPos, imgWidth, imgHeight);
    yPos += imgHeight + 8;
    
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text("Aceite virgen de alto rendimiento para uso industrial y comercial", margin, yPos);
    yPos += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const palmDesc = doc.splitTextToSize("Aceite 100% vegetal virgen, elaborado con RBD Palm Olein. Refinado, blanqueado y desodorizado con minimo de aditivos (solo 2%), garantizando pureza y estabilidad termica superior.", pageWidth - 2 * margin);
    doc.text(palmDesc, margin, yPos);
    yPos += palmDesc.length * 5 + 3;

    doc.setFont("helvetica", "bold");
    doc.text("Beneficios Principales:", margin, yPos);
    yPos += 6;
    
    doc.setFont("helvetica", "normal");
    const palmBenefits = [
      "Dura hasta 300% mas que los aceites tradicionales",
      "No transfiere sabores ni olores entre frituras",
      "Menor absorcion de grasa: productos mas secos y dorados",
      "Libre de colesterol y grasas trans",
      "Color dorado estable, incluso tras multiples usos",
      "Apto para freidoras industriales y comerciales"
    ];
    palmBenefits.forEach(benefit => {
      doc.setFillColor(212, 175, 55);
      doc.circle(margin + 2, yPos - 1.5, 1, 'F');
      doc.text(benefit, margin + 5, yPos);
      yPos += 5;
    });
    
    yPos += 5;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setFillColor(34, 139, 34);
    doc.rect(margin - 2, yPos - 5, 40, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text("$4,600 DOP", margin, yPos);
    yPos += 10;
    
    doc.setTextColor(0, 0, 0);
    yPos += 3;
    doc.setFont("helvetica", "bold");
    doc.text("Guia de Uso:", margin, yPos);
    yPos += 6;
    doc.setFont("helvetica", "normal");
    const usageGuide = [
      "Vida util de 56 horas continuas de fritura",
      "Puede freir pescado y pollo en la misma freidora sin transferencia de sabores",
      "Al filtrar el aceite de material polar (restos de pescado/pollo), complete el aceite viejo con nuevo",
      "Solo 2% de aditivos necesarios para separacion molecular de estearina y oleina",
      "Saludable para el sistema cardiovascular, superior a aceites de soya procesados"
    ];
    usageGuide.forEach(item => {
      doc.setFillColor(212, 175, 55);
      doc.circle(margin + 2, yPos - 1.5, 1, 'F');
      const splitText = doc.splitTextToSize(item, pageWidth - 2 * margin - 10);
      doc.text(splitText, margin + 5, yPos);
      yPos += splitText.length * 5;
    });
    yPos += 5;
    
    doc.setFont("helvetica", "bold");
    doc.text("Especificaciones Tecnicas:", margin, yPos);
    yPos += 6;
    doc.setFont("helvetica", "normal");
    doc.text("Acidez: 0.045% max  |  Punto de Humo: 230C  |  Duracion: 45-56 horas", margin + 5, yPos);
    yPos += 5;
    doc.text("Punto de Fusion: 24-39C  |  Indice de Peroxido: 1.70 meq/kg", margin + 5, yPos);
    yPos += 8;
    
    doc.setFont("helvetica", "italic");
    doc.text("Presentaciones: 25L  |  Vida util: 2 años (cerrado)", margin, yPos);
    yPos += 15;

    // Product 2: Aceite de Soya
    checkPageBreak(60);
    
    doc.setFillColor(70, 130, 180);
    doc.rect(margin - 5, yPos - 5, pageWidth - 2 * margin + 10, 10, 'F');
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("Aceite de Soya Bonlife", margin, yPos);
    yPos += 15;
    
    // Add product image centered
    const soyaBase64 = getBase64Image(soyaImg);
    doc.addImage(soyaBase64, 'JPEG', imgX, yPos, imgWidth, imgHeight);
    yPos += imgHeight + 8;
    
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text("Aceite vegetal refinado, estable y versatil", margin, yPos);
    yPos += 7;
    
    doc.setFont("helvetica", "normal");
    doc.setFillColor(70, 130, 180);
    doc.circle(margin + 2, yPos - 1.5, 1, 'F');
    doc.text("Rico en acidos grasos esenciales  |  Punto de humo: 220C", margin + 5, yPos);
    yPos += 5;
    doc.circle(margin + 2, yPos - 1.5, 1, 'F');
    doc.text("Ideal para cocciones rapidas, salsas y aderezos", margin + 5, yPos);
    yPos += 5;
    doc.circle(margin + 2, yPos - 1.5, 1, 'F');
    doc.text("Bajo en grasas saturadas  |  Alta presencia de Vitamina E", margin + 5, yPos);
    yPos += 7;
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setFillColor(34, 139, 34);
    doc.rect(margin - 2, yPos - 5, 40, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text("$4,000 DOP", margin, yPos);
    yPos += 10;
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text("Presentaciones: 25L  |  Vida util: 2 años (cerrado)", margin, yPos);
    yPos += 12;

    // Product 3: Aceite de Girasol
    checkPageBreak(60);
    
    doc.setFillColor(255, 165, 0);
    doc.rect(margin - 5, yPos - 5, pageWidth - 2 * margin + 10, 10, 'F');
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("Aceite de Girasol Bonlife", margin, yPos);
    yPos += 15;
    
    // Add product image centered
    const sunflowerBase64 = getBase64Image(sunflowerImg);
    doc.addImage(sunflowerBase64, 'JPEG', imgX, yPos, imgWidth, imgHeight);
    yPos += imgHeight + 8;
    
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text("100% natural, alto en acido oleico", margin, yPos);
    yPos += 7;
    
    doc.setFont("helvetica", "normal");
    doc.setFillColor(255, 165, 0);
    doc.circle(margin + 2, yPos - 1.5, 1, 'F');
    doc.text("Fuente natural de Vitamina E y antioxidantes", margin + 5, yPos);
    yPos += 5;
    doc.circle(margin + 2, yPos - 1.5, 1, 'F');
    doc.text("Ideal para cocina saludable, reposteria y ensaladas", margin + 5, yPos);
    yPos += 5;
    doc.circle(margin + 2, yPos - 1.5, 1, 'F');
    doc.text("Punto de humo: 232C  |  Tipo: Alto Oleico / Refinado", margin + 5, yPos);
    yPos += 7;
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setFillColor(34, 139, 34);
    doc.rect(margin - 2, yPos - 5, 40, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text("$4,000 DOP", margin, yPos);
    yPos += 10;
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text("Presentaciones: 25L  |  Vida util: 2 años (cerrado)", margin, yPos);
    yPos += 12;

    // Product 4: Manteca Vegetal
    checkPageBreak(60);
    
    doc.setFillColor(139, 69, 19);
    doc.rect(margin - 5, yPos - 5, pageWidth - 2 * margin + 10, 10, 'F');
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("Manteca Vegetal Bonlife", margin, yPos);
    yPos += 15;
    
    // Add product image centered
    const mantecaBase64 = getBase64Image(mantecaImg);
    doc.addImage(mantecaBase64, 'JPEG', imgX, yPos, imgWidth, imgHeight);
    yPos += imgHeight + 8;
    
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text("Premium para panificacion y reposteria", margin, yPos);
    yPos += 7;
    
    doc.setFont("helvetica", "normal");
    doc.setFillColor(139, 69, 19);
    doc.circle(margin + 2, yPos - 1.5, 1, 'F');
    doc.text("Proporciona textura suave y crujiente a masas", margin + 5, yPos);
    yPos += 5;
    doc.circle(margin + 2, yPos - 1.5, 1, 'F');
    doc.text("Mejora el volumen y apariencia de productos horneados", margin + 5, yPos);
    yPos += 5;
    doc.circle(margin + 2, yPos - 1.5, 1, 'F');
    doc.text("Enriquecida con Vitamina E, libre de grasas trans y GMO", margin + 5, yPos);
    yPos += 5;
    doc.setFont("helvetica", "italic");
    doc.text("Aplicaciones: Pasteles, galletas, panes, wafers y productos automatizados", margin + 5, yPos);
    yPos += 7;
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setFillColor(34, 139, 34);
    doc.rect(margin - 2, yPos - 5, 40, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text("$3,570 DOP", margin, yPos);
    yPos += 10;
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text("Presentaciones: 25L  |  Vida util: 2 años (cerrado)", margin, yPos);
    yPos += 12;

    // Product 5: Margarina
    checkPageBreak(60);
    
    doc.setFillColor(255, 215, 0);
    doc.rect(margin - 5, yPos - 5, pageWidth - 2 * margin + 10, 10, 'F');
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("Margarina Bonlife", margin, yPos);
    yPos += 15;
    
    // Add product image centered
    const margarineBase64 = getBase64Image(margarineImg);
    doc.addImage(margarineBase64, 'JPEG', imgX, yPos, imgWidth, imgHeight);
    yPos += imgHeight + 8;
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setFillColor(34, 139, 34);
    doc.rect(margin - 2, yPos - 5, 40, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text("$3,570 DOP", margin, yPos);
    yPos += 10;
    
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text("Alternativa saludable enriquecida con vitaminas", margin, yPos);
    yPos += 7;
    
    doc.setFont("helvetica", "normal");
    doc.setFillColor(255, 215, 0);
    doc.circle(margin + 2, yPos - 1.5, 1, 'F');
    doc.text("Bajo contenido de grasas trans", margin + 5, yPos);
    yPos += 5;
    doc.circle(margin + 2, yPos - 1.5, 1, 'F');
    doc.text("Aporta cremosidad y sabor natural", margin + 5, yPos);
    yPos += 5;
    doc.circle(margin + 2, yPos - 1.5, 1, 'F');
    doc.text("Ideal para untar, hornear y cocinar", margin + 5, yPos);
    yPos += 10;
    
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.text("Presentaciones: 15kg  |  Vida util: 2 años (cerrado)", margin, yPos);
    yPos += 12;

    // Product 6: Papas Fritas Premium
    checkPageBreak(60);
    
    doc.setFillColor(220, 38, 38);
    doc.rect(margin - 5, yPos - 5, pageWidth - 2 * margin + 10, 10, 'F');
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("Papas Fritas Premium Bonlife", margin, yPos);
    yPos += 15;
    
    // Add product image centered
    const frenchFriesBase64 = getBase64Image(frenchFriesImg);
    doc.addImage(frenchFriesBase64, 'JPEG', imgX, yPos, imgWidth, imgHeight);
    yPos += imgHeight + 8;
    
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text("Papas cortadas de calidad superior para uso comercial", margin, yPos);
    yPos += 7;
    
    doc.setFont("helvetica", "normal");
    doc.setFillColor(220, 38, 38);
    doc.circle(margin + 2, yPos - 1.5, 1, 'F');
    doc.text("Corte uniforme para coccion pareja", margin + 5, yPos);
    yPos += 5;
    doc.circle(margin + 2, yPos - 1.5, 1, 'F');
    doc.text("Ideal para freidoras industriales y comerciales", margin + 5, yPos);
    yPos += 5;
    doc.circle(margin + 2, yPos - 1.5, 1, 'F');
    doc.text("Papas frescas seleccionadas de primera calidad", margin + 5, yPos);
    yPos += 7;
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setFillColor(34, 139, 34);
    doc.rect(margin - 2, yPos - 5, 40, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text("$1,800 DOP/10kg", margin, yPos);
    yPos += 10;
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text("Producto congelado  |  Mantener refrigerado", margin, yPos);
    yPos += 12;

    // Product 7: Chips Premium
    checkPageBreak(60);
    
    doc.setFillColor(255, 140, 0);
    doc.rect(margin - 5, yPos - 5, pageWidth - 2 * margin + 10, 10, 'F');
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("Chips/Papitas Premium Bonlife", margin, yPos);
    yPos += 15;
    
    // Add product image centered
    const potatoChipsBase64 = getBase64Image(potatoChipsImg);
    doc.addImage(potatoChipsBase64, 'JPEG', imgX, yPos, imgWidth, imgHeight);
    yPos += imgHeight + 8;
    
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text("Papitas crujientes de calidad superior", margin, yPos);
    yPos += 7;
    
    doc.setFont("helvetica", "normal");
    doc.setFillColor(255, 140, 0);
    doc.circle(margin + 2, yPos - 1.5, 1, 'F');
    doc.text("Textura crujiente perfecta", margin + 5, yPos);
    yPos += 5;
    doc.circle(margin + 2, yPos - 1.5, 1, 'F');
    doc.text("Sabor premium para uso comercial y retail", margin + 5, yPos);
    yPos += 5;
    doc.circle(margin + 2, yPos - 1.5, 1, 'F');
    doc.text("Corte fino y uniforme para maxima calidad", margin + 5, yPos);
    yPos += 7;
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setFillColor(34, 139, 34);
    doc.rect(margin - 2, yPos - 5, 40, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.text("$1,800 DOP/10kg", margin, yPos);
    yPos += 10;
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text("Producto congelado  |  Mantener refrigerado", margin, yPos);
    yPos += 12;

    // New page for contact info
    doc.addPage();
    yPos = 20;

    // Coverage and Contact with branded colors
    doc.setFillColor(212, 175, 55);
    doc.rect(0, yPos - 10, pageWidth, 15, 'F');
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("Sedes y Cobertura", pageWidth / 2, yPos, { align: "center" });
    yPos += 15;
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.text("Santo Domingo, RD", margin, yPos);
    yPos += 7;
    doc.text("Punta Cana / Bavaro", margin, yPos);
    yPos += 7;
    doc.text("Santiago", margin, yPos);
    yPos += 10;
    
    doc.setFont("helvetica", "bold");
    doc.text("Entregas en todo el pais", margin, yPos);
    yPos += 20;

    doc.setFillColor(70, 130, 180);
    doc.rect(0, yPos - 10, pageWidth, 15, 'F');
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("Contacto", pageWidth / 2, yPos, { align: "center" });
    yPos += 15;
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.text("Telefono: +1 (829) 987-6764", margin, yPos);
    yPos += 7;
    doc.text("Sitio web: bonlifeoil.com", margin, yPos);
    yPos += 7;
    doc.text("Email: ventas@bonlifeoil.com", margin, yPos);

    // Footer with brand colors
    yPos = pageHeight - 25;
    doc.setFillColor(212, 175, 55);
    doc.rect(0, yPos - 5, pageWidth, 20, 'F');
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("Bonlife: Mas Rendimiento. Mas Salud. Mas Ahorro.", pageWidth / 2, yPos + 5, { align: "center" });

    // Save PDF
    doc.save("Catalogo-Bonlife.pdf");
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Catalogo de Productos Bonlife</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 sm:mb-6">
            El verdadero aceite vegetal con el doble de duracion
          </p>
          <Button onClick={generatePDF} size="lg" className="gap-2">
            <Download className="w-5 h-5" />
            Descargar Catalogo PDF
          </Button>
        </div>

        <Tabs defaultValue="palm" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 mb-6 sm:mb-8 h-auto gap-2">
            <TabsTrigger value="palm">Aceite de Palma</TabsTrigger>
            <TabsTrigger value="soya">Soya</TabsTrigger>
            <TabsTrigger value="girasol">Girasol</TabsTrigger>
            <TabsTrigger value="manteca">Manteca</TabsTrigger>
            <TabsTrigger value="margarina">Margarina</TabsTrigger>
            <TabsTrigger value="fries">Papas Fritas</TabsTrigger>
            <TabsTrigger value="chips">Chips</TabsTrigger>
          </TabsList>

          {/* Aceite Bonlife RBD Palm Olein */}
          <TabsContent value="palm">
            <Card className="border-primary/20">
              <CardHeader className="bg-gradient-to-r from-primary to-primary/80">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2 text-primary-foreground">Aceite Bonlife RBD Palm Olein</CardTitle>
                    <CardDescription className="text-lg text-primary-foreground/90">
                      Aceite virgen de alto rendimiento para uso industrial y comercial
                    </CardDescription>
                  </div>
                  <Badge variant="default" className="text-lg px-4 py-2 bg-gold text-white">$4,600 DOP</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="mb-6">
                  <img src={palmImage} alt="Palm Oil Product" className="w-full h-64 object-cover rounded-lg" />
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg mb-3">Descripcion</h4>
                  <p className="text-muted-foreground">
                    Aceite 100% vegetal virgen, de alto rendimiento, elaborado con RBD Palm Olein (fraccion liquida del aceite de palma). 
                    Refinado, blanqueado y desodorizado con el minimo de aditivos (solo 2%), garantizando pureza y estabilidad termica superior.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Beneficios</h4>
                  <ul className="grid md:grid-cols-2 gap-3">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Dura hasta 300% mas que los aceites tradicionales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>No transfiere sabores ni olores entre frituras</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Menor absorcion de grasa: productos mas secos y dorados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Libre de colesterol y grasas trans</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Color dorado estable, incluso tras multiples usos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Apto para freidoras industriales y comerciales</span>
                    </li>
                  </ul>
                  <div className="mt-4">
                    <Badge variant="default" className="text-base px-4 py-2 bg-green-600 text-white">$4,600 DOP</Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Recomendaciones de Uso</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Filtrar cada 8–10 horas de uso</li>
                    <li>• Mantener temperatura entre 170–180 °C (≈350 °F)</li>
                    <li>• No mezclar with otros aceites refinados</li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Especificaciones Tecnicas Generales</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <tbody className="divide-y">
                          <tr>
                            <td className="py-2 font-medium">Acidez (FFA)</td>
                            <td className="py-2 text-muted-foreground">0.045% max.</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium">Color (Lovibond)</td>
                            <td className="py-2 text-muted-foreground">3R max.</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium">Indice de Peroxido</td>
                            <td className="py-2 text-muted-foreground">1.70 meq/kg</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium">Punto de Fusion</td>
                            <td className="py-2 text-muted-foreground">24–39 °C</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium">Punto de Humo</td>
                            <td className="py-2 text-muted-foreground">230 °C</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium">Duracion estimada</td>
                            <td className="py-2 text-muted-foreground">45–56 horas</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-3">Variantes Disponibles</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Producto</th>
                            <th className="text-left py-2">IV (Wijs)</th>
                            <th className="text-left py-2">SMPT (°C)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr>
                            <td className="py-2 font-medium">RBD Palm Oil</td>
                            <td className="py-2 text-muted-foreground">50–55</td>
                            <td className="py-2 text-muted-foreground">33–39</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium">RBD Palm Olein CP8</td>
                            <td className="py-2 text-muted-foreground">56 min</td>
                            <td className="py-2 text-muted-foreground">24 max</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-medium">RBD Palm Olein CP6</td>
                            <td className="py-2 text-muted-foreground">60 min</td>
                            <td className="py-2 text-muted-foreground">20 max</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 rounded-lg p-4">
                  <p className="text-sm">
                    <strong>Presentaciones:</strong> 25L | 
                    <strong className="ml-3">Vida util:</strong> 2 años (cerrado)
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aceite de Soya */}
          <TabsContent value="soya">
            <Card className="border-blue-500/20">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600">
                <CardTitle className="text-3xl mb-2 text-white">Aceite de Soya Bonlife</CardTitle>
                <CardDescription className="text-lg text-white/90">
                  Aceite vegetal refinado, estable y versatil
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="mb-6">
                  <img src={soyaImage} alt="Soya Oil Product" className="w-full h-64 object-cover rounded-lg" />
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg mb-3">Descripcion</h4>
                  <p className="text-muted-foreground">
                    Aceite vegetal de soya refinado, estable y versatil, ideal para cocina general y salteados.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Beneficios</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">✓</span>
                      <span>Rico en acidos grasos esenciales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">✓</span>
                      <span>Bajo en grasas saturadas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500">✓</span>
                      <span>Ideal para cocciones rapidas, salsas y aderezos</span>
                    </li>
                  </ul>
                  <div className="mt-4">
                    <Badge variant="default" className="text-base px-4 py-2 bg-green-600 text-white">$4,000 DOP</Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Especificaciones Tecnicas</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <tbody className="divide-y">
                        <tr>
                          <td className="py-2 font-medium">Acidez</td>
                          <td className="py-2 text-muted-foreground">0.1% max.</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Indice de Yodo</td>
                          <td className="py-2 text-muted-foreground">120–140</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Punto de Humo</td>
                          <td className="py-2 text-muted-foreground">220 °C</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Color</td>
                          <td className="py-2 text-muted-foreground">Amarillo claro</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Vitamina E</td>
                          <td className="py-2 text-muted-foreground">Alta presencia</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-blue-500/10 rounded-lg p-4">
                  <p className="text-sm">
                    <strong>Presentaciones:</strong> 25L | 
                    <strong className="ml-3">Vida util:</strong> 2 años (cerrado)
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aceite de Girasol */}
          <TabsContent value="girasol">
            <Card className="border-orange-500/20">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600">
                <CardTitle className="text-3xl mb-2 text-white">Aceite de Girasol Bonlife</CardTitle>
                <CardDescription className="text-lg text-white/90">
                  100% natural, alto en acido oleico
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="mb-6">
                  <img src={sunflowerImage} alt="Sunflower Oil Product" className="w-full h-64 object-cover rounded-lg" />
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg mb-3">Descripcion</h4>
                  <p className="text-muted-foreground">
                    Aceite puro de semillas de girasol, 100% natural, alto en acido oleico, perfecto para frituras suaves y uso domestico o gourmet.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Beneficios</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">✓</span>
                      <span>Fuente natural de Vitamina E y antioxidantes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">✓</span>
                      <span>Ideal para cocina saludable, reposteria y ensaladas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">✓</span>
                      <span>Bajo en grasas saturadas</span>
                    </li>
                  </ul>
                  <div className="mt-4">
                    <Badge variant="default" className="text-base px-4 py-2 bg-green-600 text-white">$4,000 DOP</Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Especificaciones Tecnicas</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <tbody className="divide-y">
                        <tr>
                          <td className="py-2 font-medium">Acidez</td>
                          <td className="py-2 text-muted-foreground">0.1% max.</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Punto de Humo</td>
                          <td className="py-2 text-muted-foreground">232 °C</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Indice de Yodo</td>
                          <td className="py-2 text-muted-foreground">90–130</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Color</td>
                          <td className="py-2 text-muted-foreground">2 R max.</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Tipo</td>
                          <td className="py-2 text-muted-foreground">Alto Oleico / Refinado</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-orange-500/10 rounded-lg p-4">
                  <p className="text-sm">
                    <strong>Presentaciones:</strong> 25L | 
                    <strong className="ml-3">Vida util:</strong> 2 años (cerrado)
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manteca Vegetal */}
          <TabsContent value="manteca">
            <Card className="border-amber-700/20">
              <CardHeader className="bg-gradient-to-r from-amber-700 to-amber-800">
                <CardTitle className="text-3xl mb-2 text-white">Manteca Vegetal Bonlife</CardTitle>
                <CardDescription className="text-lg text-white/90">
                  Premium para panificacion y reposteria
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="mb-6">
                  <img src={mantecaImage} alt="Manteca Product" className="w-full h-64 object-cover rounded-lg" />
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg mb-3">Descripcion</h4>
                  <p className="text-muted-foreground">
                    Manteca premium elaborada con aceites fraccionados, blanqueados y desodorizados, especialmente formulada para panificacion y reposteria.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Beneficios</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-700">✓</span>
                      <span>Proporciona textura suave y crujiente a masas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-700">✓</span>
                      <span>Mejora el volumen y apariencia de productos horneados</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-700">✓</span>
                      <span>Enriquecida con Vitamina E, libre de grasas trans y GMO</span>
                    </li>
                  </ul>
                  <div className="mt-4">
                    <Badge variant="default" className="text-base px-4 py-2 bg-green-600 text-white">$3,570 DOP</Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Aplicaciones</h4>
                  <p className="text-muted-foreground">
                    Pasteles, galletas, panes, wafers y productos automatizados.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Especificaciones Tecnicas</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <tbody className="divide-y">
                        <tr>
                          <td className="py-2 font-medium">FFA (max %)</td>
                          <td className="py-2 text-muted-foreground">0.1%</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">M&I (max %)</td>
                          <td className="py-2 text-muted-foreground">0.1%</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">IV</td>
                          <td className="py-2 text-muted-foreground">42–55</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">SMPT (°C)</td>
                          <td className="py-2 text-muted-foreground">36–48</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Color</td>
                          <td className="py-2 text-muted-foreground">3 R / 30 Y</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Antioxidante</td>
                          <td className="py-2 text-muted-foreground">200 PPM max</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-amber-700/10 rounded-lg p-4">
                  <p className="text-sm">
                    <strong>Presentaciones:</strong> 25L | 
                    <strong className="ml-3">Vida util:</strong> 2 años (cerrado)
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Margarina */}
          <TabsContent value="margarina">
            <Card className="border-yellow-500/20">
              <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-600">
                <CardTitle className="text-3xl mb-2 text-white">Margarina Bonlife</CardTitle>
                <CardDescription className="text-lg text-white/90">
                  Alternativa saludable enriquecida con vitaminas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="mb-6">
                  <img src={margarineImage} alt="Margarine Product" className="w-full h-64 object-cover rounded-lg" />
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg mb-3">Descripcion</h4>
                  <p className="text-muted-foreground">
                    Margarina de base vegetal enriquecida con vitaminas, alternativa saludable a la mantequilla tradicional.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Beneficios</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600">✓</span>
                      <span>Bajo contenido de grasas trans</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600">✓</span>
                      <span>Aporta cremosidad y sabor natural</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600">✓</span>
                      <span>Ideal para untar, hornear y cocinar</span>
                    </li>
                  </ul>
                  <div className="mt-4">
                    <Badge variant="default" className="text-base px-4 py-2 bg-green-600 text-white">$3,570 DOP</Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Especificaciones Tecnicas</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <tbody className="divide-y">
                        <tr>
                          <td className="py-2 font-medium">FFA (max %)</td>
                          <td className="py-2 text-muted-foreground">0.2%</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">M&I (max %)</td>
                          <td className="py-2 text-muted-foreground">0.16%</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">IV</td>
                          <td className="py-2 text-muted-foreground">40–44</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">SMPT (°C)</td>
                          <td className="py-2 text-muted-foreground">37–41</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Color</td>
                          <td className="py-2 text-muted-foreground">8 R</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium">Mezcla grasa minima</td>
                          <td className="py-2 text-muted-foreground">80%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-yellow-500/10 rounded-lg p-4">
                  <p className="text-sm">
                    <strong>Presentaciones:</strong> 15kg | 
                    <strong className="ml-3">Vida util:</strong> 2 años (cerrado)
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Papas Fritas Premium */}
          <TabsContent value="fries">
            <Card className="border-red-600/20">
              <CardHeader className="bg-gradient-to-r from-red-600 to-red-700">
                <CardTitle className="text-3xl mb-2 text-white">Papas Fritas Premium Bonlife</CardTitle>
                <CardDescription className="text-lg text-white/90">
                  Papas cortadas de calidad superior para uso comercial
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="mb-6">
                  <img src={frenchFriesImage} alt="French Fries Product" className="w-full h-64 object-cover rounded-lg" />
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg mb-3">Descripcion</h4>
                  <p className="text-muted-foreground">
                    Papas fritas premium cortadas uniformemente para uso comercial y restaurantes. Producto congelado de la mas alta calidad.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Beneficios</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">✓</span>
                      <span>Corte uniforme para coccion pareja</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">✓</span>
                      <span>Ideal para freidoras industriales y comerciales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">✓</span>
                      <span>Papas frescas seleccionadas de primera calidad</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">✓</span>
                      <span>Textura crujiente por fuera, suave por dentro</span>
                    </li>
                  </ul>
                  <div className="mt-4">
                    <Badge variant="default" className="text-base px-4 py-2 bg-green-600 text-white">$1,800 DOP/10kg</Badge>
                  </div>
                </div>

                <div className="bg-red-600/10 rounded-lg p-4">
                  <p className="text-sm">
                    <strong>Presentacion:</strong> Producto congelado | 
                    <strong className="ml-3">Almacenamiento:</strong> Mantener refrigerado a -18°C
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chips/Papitas Premium */}
          <TabsContent value="chips">
            <Card className="border-orange-600/20">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-orange-700">
                <CardTitle className="text-3xl mb-2 text-white">Chips/Papitas Premium Bonlife</CardTitle>
                <CardDescription className="text-lg text-white/90">
                  Papitas crujientes de calidad superior
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="mb-6">
                  <img src={potatoChipsImage} alt="Potato Chips Product" className="w-full h-64 object-cover rounded-lg" />
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg mb-3">Descripcion</h4>
                  <p className="text-muted-foreground">
                    Chips de papa premium con textura crujiente perfecta. Corte fino y uniforme para maxima calidad en cada porcion.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-3">Beneficios</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600">✓</span>
                      <span>Textura crujiente perfecta</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600">✓</span>
                      <span>Sabor premium para uso comercial y retail</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600">✓</span>
                      <span>Corte fino y uniforme para maxima calidad</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600">✓</span>
                      <span>Ideal para snacks, acompañamientos y combos</span>
                    </li>
                  </ul>
                  <div className="mt-4">
                    <Badge variant="default" className="text-base px-4 py-2 bg-green-600 text-white">$1,800 DOP/10kg</Badge>
                  </div>
                </div>

                <div className="bg-orange-600/10 rounded-lg p-4">
                  <p className="text-sm">
                    <strong>Presentacion:</strong> Producto congelado | 
                    <strong className="ml-3">Almacenamiento:</strong> Mantener refrigerado a -18°C
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contact Info */}
        <div className="mt-12 p-8 bg-primary/5 rounded-lg border border-primary/20">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Sedes y Cobertura</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Santo Domingo, RD</li>
                <li>Punta Cana / Bavaro</li>
                <li>Santiago</li>
              </ul>
              <p className="mt-4 font-semibold">Entregas en todo el pais</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Contacto</h3>
              <ul className="space-y-2">
                <li><a href="tel:+18299876764" className="hover:text-primary">+1 (829) 987-6764</a></li>
                <li><a href="https://bonlifeoil.com" className="hover:text-primary">bonlifeoil.com</a></li>
                <li><a href="mailto:ventas@bonlifeoil.com" className="hover:text-primary">ventas@bonlifeoil.com</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;