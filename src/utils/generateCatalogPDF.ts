import jsPDF from "jspdf";
import palmImage from "@/assets/palm-oil-product.jpg";
import sunflowerImage from "@/assets/sunflower-oil-product.jpg";
import soyaImage from "@/assets/soya-oil-product.jpg";
import mantecaImage from "@/assets/manteca-product.jpg";
import margarineImage from "@/assets/margarine-product.jpg";
import bonlifeLogo from "@/assets/bonlife-logo.png";

export const generateCatalogPDF = async () => {
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

  // Image dimensions for products
  const imgWidth = 35;
  const imgHeight = 35;
  const imgX = (pageWidth - imgWidth) / 2;

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
