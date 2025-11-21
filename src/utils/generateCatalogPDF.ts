import jsPDF from "jspdf";
import palmImage from "@/assets/palm-oil-product.jpg";
import sunflowerImage from "@/assets/sunflower-oil-product.jpg";
import soyaImage from "@/assets/soya-oil-product.jpg";
import mantecaImage from "@/assets/manteca-product.jpg";
import margarineImage from "@/assets/margarine-product.jpg";

export const generateCatalogPDF = async () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const safeMargin = 20;
  let yPos = 20;
  let pageNumber = 1;

  // Helper function to convert image to base64
  const getBase64Image = (img: HTMLImageElement): string => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(img, 0, 0);
    return canvas.toDataURL('image/jpeg', 0.95);
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

  // Helper function to add decorative border
  const addPageBorder = () => {
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.8);
    doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);
    
    doc.setLineWidth(0.3);
    doc.rect(margin + 1, margin + 1, pageWidth - 2 * margin - 2, pageHeight - 2 * margin - 2);
  };

  // Helper function to add page footer with page number
  const addPageFooter = () => {
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(51, 51, 51);
    doc.text(`Página ${pageNumber}`, pageWidth / 2, pageHeight - 10, { align: "center" });
    
    doc.setFontSize(7);
    doc.text("www.bonlifeoil.com", pageWidth - safeMargin, pageHeight - 10, { align: "right" });
    doc.text("+1 (829) 987-6764", safeMargin, pageHeight - 10);
  };

  // Helper function to add new page
  const addNewPage = () => {
    doc.addPage();
    pageNumber++;
    yPos = safeMargin + 10;
    addPageBorder();
  };

  // Helper function to check page break
  const checkPageBreak = (requiredSpace: number) => {
    if (yPos + requiredSpace > pageHeight - safeMargin - 20) {
      addPageFooter();
      addNewPage();
      return true;
    }
    return false;
  };

  // Helper function to add decorative divider
  const addDivider = () => {
    const centerY = yPos;
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.5);
    
    const centerX = pageWidth / 2;
    doc.line(safeMargin, centerY, centerX - 15, centerY);
    doc.line(centerX + 15, centerY, pageWidth - safeMargin, centerY);
    
    doc.setFillColor(212, 175, 55);
    doc.circle(centerX, centerY, 2, 'F');
    doc.circle(centerX - 5, centerY, 1, 'F');
    doc.circle(centerX + 5, centerY, 1, 'F');
    
    yPos += 8;
  };

  // ============ COVER PAGE ============
  addPageBorder();
  
  doc.setFillColor(212, 175, 55);
  doc.rect(0, 0, pageWidth, 25, 'F');
  doc.setFillColor(232, 210, 120);
  doc.rect(0, 25, pageWidth, 3, 'F');
  
  yPos = 70;
  doc.setFontSize(36);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(25, 42, 86);
  doc.text("BONLIFE", pageWidth / 2, yPos, { align: "center" });
  
  yPos += 15;
  doc.setFontSize(18);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(212, 175, 55);
  doc.text("CATÁLOGO DE PRODUCTOS", pageWidth / 2, yPos, { align: "center" });
  
  yPos += 8;
  doc.setFontSize(11);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(41, 66, 108);
  doc.text("Aceites y Grasas Vegetales Premium", pageWidth / 2, yPos, { align: "center" });
  
  yPos += 20;
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1);
  doc.line(pageWidth / 2 - 40, yPos, pageWidth / 2 + 40, yPos);
  
  yPos += 30;
  doc.setFillColor(25, 42, 86);
  doc.roundedRect(safeMargin + 10, yPos, pageWidth - 2 * safeMargin - 20, 40, 3, 3, 'F');
  
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(232, 210, 120);
  doc.text("El Verdadero Aceite Vegetal", pageWidth / 2, yPos + 15, { align: "center" });
  
  doc.setFontSize(16);
  doc.text("con el Doble de Duración", pageWidth / 2, yPos + 28, { align: "center" });
  
  yPos += 55;
  const features = [
    "✓ 300% Más Rendimiento",
    "✓ Sin Grasas Trans",
    "✓ Calidad Premium"
  ];
  
  const boxWidth = 50;
  const boxSpacing = (pageWidth - 2 * safeMargin - 3 * boxWidth) / 2;
  let xPos = safeMargin;
  
  features.forEach((feature) => {
    doc.setFillColor(232, 210, 120);
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.5);
    doc.roundedRect(xPos, yPos, boxWidth, 15, 2, 2, 'FD');
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(25, 42, 86);
    doc.text(feature, xPos + boxWidth / 2, yPos + 9, { align: "center" });
    
    xPos += boxWidth + boxSpacing;
  });
  
  yPos = pageHeight - 55;
  doc.setFillColor(232, 210, 120);
  doc.rect(0, yPos, pageWidth, 3, 'F');
  doc.setFillColor(212, 175, 55);
  doc.rect(0, yPos + 3, pageWidth, 25, 'F');
  
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(25, 42, 86);
  doc.text("Más Rendimiento • Más Salud • Más Ahorro", pageWidth / 2, yPos + 16, { align: "center" });
  
  addPageFooter();

  // Load product images
  const palmImg = await loadImage(palmImage);
  const soyaImg = await loadImage(soyaImage);
  const sunflowerImg = await loadImage(sunflowerImage);
  const mantecaImg = await loadImage(mantecaImage);
  const margarineImg = await loadImage(margarineImage);

  // ============ INTRODUCTION PAGE ============
  addNewPage();
  
  yPos = safeMargin + 15;
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(25, 42, 86);
  doc.text("Bienvenido a Bonlife", safeMargin, yPos);
  
  yPos += 12;
  addDivider();
  yPos += 5;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 51, 51);
  const introText = doc.splitTextToSize(
    "Bonlife es líder en aceites y grasas vegetales de alta calidad para la industria alimentaria. " +
    "Nuestros productos están formulados con la más alta tecnología para ofrecer el mejor rendimiento, " +
    "estabilidad térmica superior y beneficios nutricionales excepcionales.",
    pageWidth - 2 * safeMargin
  );
  doc.text(introText, safeMargin, yPos);
  yPos += introText.length * 5 + 10;
  
  doc.setFillColor(25, 42, 86);
  doc.roundedRect(safeMargin, yPos, pageWidth - 2 * safeMargin, 8, 2, 2, 'F');
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(232, 210, 120);
  doc.text("¿Por Qué Elegir Bonlife?", safeMargin + 3, yPos + 6);
  
  yPos += 15;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 51, 51);
  
  const benefits = [
    { icon: "◆", text: "Rendimiento Superior: Hasta 300% más duración que aceites convencionales" },
    { icon: "◆", text: "Pureza Garantizada: Mínimos aditivos, máxima calidad" },
    { icon: "◆", text: "Salud Cardiovascular: Productos diseñados pensando en el bienestar" },
    { icon: "◆", text: "Versatilidad: Soluciones para todas las necesidades de su negocio" },
    { icon: "◆", text: "Soporte Técnico: Asesoría especializada para optimizar su producción" }
  ];
  
  benefits.forEach(benefit => {
    doc.setTextColor(212, 175, 55);
    doc.setFont("helvetica", "bold");
    doc.text(benefit.icon, safeMargin + 2, yPos);
    
    doc.setTextColor(51, 51, 51);
    doc.setFont("helvetica", "normal");
    const splitText = doc.splitTextToSize(benefit.text, pageWidth - 2 * safeMargin - 8);
    doc.text(splitText, safeMargin + 6, yPos);
    yPos += splitText.length * 5 + 3;
  });
  
  yPos += 10;
  addDivider();
  
  yPos += 5;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(25, 42, 86);
  doc.text("Nuestra Línea de Productos", safeMargin, yPos);
  
  yPos += 10;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 51, 51);
  
  const productList = [
    "Aceite Bonlife RBD Palm Olein • El aceite de mayor rendimiento del mercado",
    "Aceite de Soya • Versátil y rico en nutrientes esenciales",
    "Aceite de Girasol • 100% natural, alto en ácido oleico",
    "Manteca Vegetal • Premium para panificación y repostería",
    "Margarina • Alternativa saludable enriquecida con vitaminas"
  ];
  
  productList.forEach(product => {
    doc.setFillColor(212, 175, 55);
    doc.circle(safeMargin + 2, yPos - 1.5, 1.2, 'F');
    doc.text(product, safeMargin + 6, yPos);
    yPos += 6;
  });
  
  addPageFooter();

  // ============ PRODUCT PAGES ============
  const imgWidth = 50;
  const imgHeight = 50;
  const imgX = (pageWidth - imgWidth) / 2;

  // Product 1: Aceite Bonlife RBD Palm Olein
  addNewPage();
  
  doc.setFillColor(212, 175, 55);
  doc.roundedRect(safeMargin - 5, yPos, pageWidth - 2 * safeMargin + 10, 15, 3, 3, 'F');
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(25, 42, 86);
  doc.text("Aceite Bonlife RBD Palm Olein", pageWidth / 2, yPos + 10, { align: "center" });
  yPos += 22;
  
  const palmBase64 = getBase64Image(palmImg);
  doc.setFillColor(200, 200, 200);
  doc.roundedRect(imgX + 1, yPos + 1, imgWidth, imgHeight, 3, 3, 'F');
  doc.addImage(palmBase64, 'JPEG', imgX, yPos, imgWidth, imgHeight);
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.8);
  doc.roundedRect(imgX, yPos, imgWidth, imgHeight, 3, 3, 'D');
  yPos += imgHeight + 10;
  
  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  doc.setTextColor(41, 66, 108);
  doc.text("Aceite virgen de alto rendimiento para uso industrial y comercial", pageWidth / 2, yPos, { align: "center" });
  yPos += 10;
  
  addDivider();
  yPos += 3;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(51, 51, 51);
  const palmDesc = doc.splitTextToSize(
    "Aceite 100% vegetal virgen, elaborado con RBD Palm Olein. Refinado, blanqueado y desodorizado " +
    "con mínimo de aditivos (solo 2%), garantizando pureza y estabilidad térmica superior.",
    pageWidth - 2 * safeMargin
  );
  doc.text(palmDesc, safeMargin, yPos);
  yPos += palmDesc.length * 4.5 + 8;
  
  doc.setFillColor(25, 42, 86);
  doc.roundedRect(safeMargin, yPos, pageWidth - 2 * safeMargin, 7, 2, 2, 'F');
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(232, 210, 120);
  doc.text("Beneficios Principales", safeMargin + 3, yPos + 5);
  yPos += 12;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(51, 51, 51);
  
  const palmBenefits = [
    "Dura hasta 300% más que los aceites tradicionales",
    "No transfiere sabores ni olores entre frituras",
    "Menor absorción de grasa: productos más secos y dorados",
    "Libre de colesterol y grasas trans",
    "Color dorado estable tras múltiples usos",
    "Apto para freidoras industriales y comerciales"
  ];
  
  palmBenefits.forEach(benefit => {
    doc.setFillColor(212, 175, 55);
    doc.circle(safeMargin + 2.5, yPos - 1.5, 1.3, 'F');
    doc.text(benefit, safeMargin + 7, yPos);
    yPos += 5.5;
  });
  
  checkPageBreak(65);
  yPos += 3;
  
  doc.setFillColor(34, 139, 34);
  doc.setDrawColor(34, 139, 34);
  doc.roundedRect(safeMargin, yPos, 55, 12, 2, 2, 'FD');
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("$4,600 DOP", safeMargin + 27.5, yPos + 8, { align: "center" });
  
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(51, 51, 51);
  doc.text("Presentación: 25L", safeMargin + 62, yPos + 6);
  doc.text("Vida útil: 2 años (cerrado)", safeMargin + 62, yPos + 10);
  yPos += 18;
  
  doc.setFillColor(25, 42, 86);
  doc.roundedRect(safeMargin, yPos, pageWidth - 2 * safeMargin, 7, 2, 2, 'F');
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(232, 210, 120);
  doc.text("Guía de Uso", safeMargin + 3, yPos + 5);
  yPos += 12;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(51, 51, 51);
  
  const usageGuide = [
    "Vida útil de 56 horas continuas de fritura",
    "Puede freír pescado y pollo sin transferencia de sabores",
    "Al filtrar, complete con aceite nuevo",
    "Solo 2% de aditivos necesarios",
    "Saludable para el sistema cardiovascular"
  ];
  
  usageGuide.forEach(item => {
    doc.setFillColor(212, 175, 55);
    doc.circle(safeMargin + 2.5, yPos - 1.5, 1.3, 'F');
    const splitText = doc.splitTextToSize(item, pageWidth - 2 * safeMargin - 7);
    doc.text(splitText, safeMargin + 7, yPos);
    yPos += splitText.length * 4.5 + 1.5;
  });
  
  checkPageBreak(25);
  yPos += 5;
  
  doc.setFillColor(232, 210, 120);
  doc.roundedRect(safeMargin, yPos, pageWidth - 2 * safeMargin, 7, 2, 2, 'F');
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(25, 42, 86);
  doc.text("Especificaciones Técnicas", safeMargin + 3, yPos + 5);
  yPos += 12;
  
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 51, 51);
  
  const specs = [
    ["Acidez:", "0.045% máx"],
    ["Punto de Humo:", "230°C"],
    ["Duración:", "45-56 horas"],
    ["Punto de Fusión:", "24-39°C"],
    ["Índice de Peróxido:", "1.70 meq/kg"]
  ];
  
  const colWidth = (pageWidth - 2 * safeMargin - 10) / 2;
  specs.forEach(([label, value], idx) => {
    const xStart = safeMargin + 5 + (idx % 2) * colWidth;
    const yStart = yPos + Math.floor(idx / 2) * 5;
    
    doc.setFont("helvetica", "bold");
    doc.text(label, xStart, yStart);
    doc.setFont("helvetica", "normal");
    doc.text(value, xStart + 30, yStart);
  });
  yPos += Math.ceil(specs.length / 2) * 5 + 5;
  
  addPageFooter();

  // Product 2: Aceite de Soya
  addNewPage();
  
  doc.setFillColor(70, 130, 180);
  doc.roundedRect(safeMargin - 5, yPos, pageWidth - 2 * safeMargin + 10, 15, 3, 3, 'F');
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("Aceite de Soya Bonlife", pageWidth / 2, yPos + 10, { align: "center" });
  yPos += 22;
  
  const soyaBase64 = getBase64Image(soyaImg);
  doc.setFillColor(200, 200, 200);
  doc.roundedRect(imgX + 1, yPos + 1, imgWidth, imgHeight, 3, 3, 'F');
  doc.addImage(soyaBase64, 'JPEG', imgX, yPos, imgWidth, imgHeight);
  doc.setDrawColor(70, 130, 180);
  doc.setLineWidth(0.8);
  doc.roundedRect(imgX, yPos, imgWidth, imgHeight, 3, 3, 'D');
  yPos += imgHeight + 10;
  
  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  doc.setTextColor(41, 66, 108);
  doc.text("Aceite vegetal refinado, estable y versátil", pageWidth / 2, yPos, { align: "center" });
  yPos += 10;
  
  addDivider();
  yPos += 5;
  
  doc.setFillColor(25, 42, 86);
  doc.roundedRect(safeMargin, yPos, pageWidth - 2 * safeMargin, 7, 2, 2, 'F');
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(232, 210, 120);
  doc.text("Características Destacadas", safeMargin + 3, yPos + 5);
  yPos += 12;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(51, 51, 51);
  
  const soyaBenefits = [
    "Rico en ácidos grasos esenciales omega-3 y omega-6",
    "Punto de humo elevado: 220°C",
    "Perfecto para cocciones rápidas, salsas y aderezos",
    "Bajo en grasas saturadas, alto en Vitamina E",
    "Excelente estabilidad oxidativa"
  ];
  
  soyaBenefits.forEach(benefit => {
    doc.setFillColor(70, 130, 180);
    doc.circle(safeMargin + 2.5, yPos - 1.5, 1.3, 'F');
    const splitText = doc.splitTextToSize(benefit, pageWidth - 2 * safeMargin - 7);
    doc.text(splitText, safeMargin + 7, yPos);
    yPos += splitText.length * 4.5 + 1.5;
  });
  
  yPos += 5;
  
  doc.setFillColor(34, 139, 34);
  doc.roundedRect(safeMargin, yPos, 55, 12, 2, 2, 'FD');
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("$4,000 DOP", safeMargin + 27.5, yPos + 8, { align: "center" });
  
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(51, 51, 51);
  doc.text("Presentación: 25L", safeMargin + 62, yPos + 6);
  doc.text("Vida útil: 2 años (cerrado)", safeMargin + 62, yPos + 10);
  yPos += 18;
  
  addPageFooter();

  // Product 3: Aceite de Girasol
  addNewPage();
  
  doc.setFillColor(255, 165, 0);
  doc.roundedRect(safeMargin - 5, yPos, pageWidth - 2 * safeMargin + 10, 15, 3, 3, 'F');
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(25, 42, 86);
  doc.text("Aceite de Girasol Bonlife", pageWidth / 2, yPos + 10, { align: "center" });
  yPos += 22;
  
  const sunflowerBase64 = getBase64Image(sunflowerImg);
  doc.setFillColor(200, 200, 200);
  doc.roundedRect(imgX + 1, yPos + 1, imgWidth, imgHeight, 3, 3, 'F');
  doc.addImage(sunflowerBase64, 'JPEG', imgX, yPos, imgWidth, imgHeight);
  doc.setDrawColor(255, 165, 0);
  doc.setLineWidth(0.8);
  doc.roundedRect(imgX, yPos, imgWidth, imgHeight, 3, 3, 'D');
  yPos += imgHeight + 10;
  
  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  doc.setTextColor(41, 66, 108);
  doc.text("100% natural, alto en ácido oleico", pageWidth / 2, yPos, { align: "center" });
  yPos += 10;
  
  addDivider();
  yPos += 5;
  
  doc.setFillColor(25, 42, 86);
  doc.roundedRect(safeMargin, yPos, pageWidth - 2 * safeMargin, 7, 2, 2, 'F');
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(232, 210, 120);
  doc.text("Beneficios del Aceite de Girasol", safeMargin + 3, yPos + 5);
  yPos += 12;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(51, 51, 51);
  
  const sunflowerBenefits = [
    "Fuente natural de Vitamina E y antioxidantes",
    "Ideal para cocina saludable, repostería y ensaladas",
    "Punto de humo excepcional: 232°C",
    "Alto Oleico / Refinado para máxima estabilidad",
    "Sabor ligero que realza ingredientes"
  ];
  
  sunflowerBenefits.forEach(benefit => {
    doc.setFillColor(255, 165, 0);
    doc.circle(safeMargin + 2.5, yPos - 1.5, 1.3, 'F');
    const splitText = doc.splitTextToSize(benefit, pageWidth - 2 * safeMargin - 7);
    doc.text(splitText, safeMargin + 7, yPos);
    yPos += splitText.length * 4.5 + 1.5;
  });
  
  yPos += 5;
  
  doc.setFillColor(34, 139, 34);
  doc.roundedRect(safeMargin, yPos, 55, 12, 2, 2, 'FD');
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("$4,000 DOP", safeMargin + 27.5, yPos + 8, { align: "center" });
  
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(51, 51, 51);
  doc.text("Presentación: 25L", safeMargin + 62, yPos + 6);
  doc.text("Vida útil: 2 años (cerrado)", safeMargin + 62, yPos + 10);
  yPos += 18;
  
  addPageFooter();

  // Product 4: Manteca Vegetal
  addNewPage();
  
  doc.setFillColor(139, 69, 19);
  doc.roundedRect(safeMargin - 5, yPos, pageWidth - 2 * safeMargin + 10, 15, 3, 3, 'F');
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("Manteca Vegetal Bonlife", pageWidth / 2, yPos + 10, { align: "center" });
  yPos += 22;
  
  const mantecaBase64 = getBase64Image(mantecaImg);
  doc.setFillColor(200, 200, 200);
  doc.roundedRect(imgX + 1, yPos + 1, imgWidth, imgHeight, 3, 3, 'F');
  doc.addImage(mantecaBase64, 'JPEG', imgX, yPos, imgWidth, imgHeight);
  doc.setDrawColor(139, 69, 19);
  doc.setLineWidth(0.8);
  doc.roundedRect(imgX, yPos, imgWidth, imgHeight, 3, 3, 'D');
  yPos += imgHeight + 10;
  
  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  doc.setTextColor(41, 66, 108);
  doc.text("Premium para panificación y repostería profesional", pageWidth / 2, yPos, { align: "center" });
  yPos += 10;
  
  addDivider();
  yPos += 5;
  
  doc.setFillColor(25, 42, 86);
  doc.roundedRect(safeMargin, yPos, pageWidth - 2 * safeMargin, 7, 2, 2, 'F');
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(232, 210, 120);
  doc.text("Aplicaciones y Ventajas", safeMargin + 3, yPos + 5);
  yPos += 12;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(51, 51, 51);
  
  const mantecaBenefits = [
    "Textura suave y crujiente perfecta",
    "Mejora volumen y apariencia",
    "Enriquecida con Vitamina E, sin grasas trans",
    "Estabilidad en procesos automatizados",
    "Ideal para pasteles, galletas, panes"
  ];
  
  mantecaBenefits.forEach(benefit => {
    doc.setFillColor(139, 69, 19);
    doc.circle(safeMargin + 2.5, yPos - 1.5, 1.3, 'F');
    const splitText = doc.splitTextToSize(benefit, pageWidth - 2 * safeMargin - 7);
    doc.text(splitText, safeMargin + 7, yPos);
    yPos += splitText.length * 4.5 + 1.5;
  });
  
  yPos += 5;
  
  doc.setFillColor(34, 139, 34);
  doc.roundedRect(safeMargin, yPos, 55, 12, 2, 2, 'FD');
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("$3,570 DOP", safeMargin + 27.5, yPos + 8, { align: "center" });
  
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(51, 51, 51);
  doc.text("Presentación: 25L", safeMargin + 62, yPos + 6);
  doc.text("Vida útil: 2 años (cerrado)", safeMargin + 62, yPos + 10);
  yPos += 18;
  
  addPageFooter();

  // Product 5: Margarina
  addNewPage();
  
  doc.setFillColor(212, 175, 55);
  doc.roundedRect(safeMargin - 5, yPos, pageWidth - 2 * safeMargin + 10, 15, 3, 3, 'F');
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(25, 42, 86);
  doc.text("Margarina Bonlife", pageWidth / 2, yPos + 10, { align: "center" });
  yPos += 22;
  
  const margarineBase64 = getBase64Image(margarineImg);
  doc.setFillColor(200, 200, 200);
  doc.roundedRect(imgX + 1, yPos + 1, imgWidth, imgHeight, 3, 3, 'F');
  doc.addImage(margarineBase64, 'JPEG', imgX, yPos, imgWidth, imgHeight);
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.8);
  doc.roundedRect(imgX, yPos, imgWidth, imgHeight, 3, 3, 'D');
  yPos += imgHeight + 10;
  
  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  doc.setTextColor(41, 66, 108);
  doc.text("Alternativa saludable enriquecida con vitaminas", pageWidth / 2, yPos, { align: "center" });
  yPos += 10;
  
  addDivider();
  yPos += 5;
  
  doc.setFillColor(25, 42, 86);
  doc.roundedRect(safeMargin, yPos, pageWidth - 2 * safeMargin, 7, 2, 2, 'F');
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(232, 210, 120);
  doc.text("Beneficios Nutricionales", safeMargin + 3, yPos + 5);
  yPos += 12;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(51, 51, 51);
  
  const margarineBenefits = [
    "Bajo contenido de grasas trans",
    "Aporta cremosidad y sabor natural",
    "Ideal para untar, hornear y cocinar",
    "Enriquecida con vitaminas A, D y E",
    "Textura suave desde refrigeración"
  ];
  
  margarineBenefits.forEach(benefit => {
    doc.setFillColor(212, 175, 55);
    doc.circle(safeMargin + 2.5, yPos - 1.5, 1.3, 'F');
    const splitText = doc.splitTextToSize(benefit, pageWidth - 2 * safeMargin - 7);
    doc.text(splitText, safeMargin + 7, yPos);
    yPos += splitText.length * 4.5 + 1.5;
  });
  
  yPos += 5;
  
  doc.setFillColor(34, 139, 34);
  doc.roundedRect(safeMargin, yPos, 55, 12, 2, 2, 'FD');
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("$3,570 DOP", safeMargin + 27.5, yPos + 8, { align: "center" });
  
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(51, 51, 51);
  doc.text("Presentación: 15kg", safeMargin + 62, yPos + 6);
  doc.text("Vida útil: 2 años (cerrado)", safeMargin + 62, yPos + 10);
  yPos += 18;
  
  addPageFooter();

  // ============ COVERAGE & CONTACT PAGE ============
  addNewPage();
  
  yPos = safeMargin + 15;
  doc.setFillColor(212, 175, 55);
  doc.roundedRect(safeMargin - 5, yPos - 5, pageWidth - 2 * safeMargin + 10, 15, 3, 3, 'F');
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(25, 42, 86);
  doc.text("Cobertura Nacional", pageWidth / 2, yPos + 5, { align: "center" });
  yPos += 20;
  
  addDivider();
  yPos += 5;
  
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 51, 51);
  
  const locations = [
    "Santo Domingo, Distrito Nacional",
    "Punta Cana / Bávaro, La Altagracia",
    "Santiago de los Caballeros"
  ];
  
  locations.forEach(location => {
    doc.setFillColor(212, 175, 55);
    doc.circle(safeMargin + 3, yPos - 1.5, 1.5, 'F');
    doc.setFont("helvetica", "bold");
    doc.text(location, safeMargin + 8, yPos);
    yPos += 7;
  });
  
  yPos += 5;
  doc.setFillColor(25, 42, 86);
  doc.roundedRect(safeMargin, yPos, pageWidth - 2 * safeMargin, 10, 2, 2, 'F');
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(232, 210, 120);
  doc.text("✓ Entregas a Todo el País", pageWidth / 2, yPos + 6.5, { align: "center" });
  yPos += 20;
  
  addDivider();
  
  yPos += 10;
  doc.setFillColor(25, 42, 86);
  doc.roundedRect(safeMargin - 5, yPos - 5, pageWidth - 2 * safeMargin + 10, 15, 3, 3, 'F');
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(232, 210, 120);
  doc.text("Información de Contacto", pageWidth / 2, yPos + 5, { align: "center" });
  yPos += 20;
  
  addDivider();
  yPos += 8;
  
  const contactInfo = [
    { icon: "📞", label: "Teléfono", value: "+1 (829) 987-6764" },
    { icon: "🌐", label: "Sitio Web", value: "www.bonlifeoil.com" },
    { icon: "✉", label: "Email", value: "ventas@bonlifeoil.com" }
  ];
  
  contactInfo.forEach(({ icon, label, value }) => {
    doc.setFillColor(232, 210, 120);
    doc.roundedRect(safeMargin, yPos, pageWidth - 2 * safeMargin, 12, 2, 2, 'F');
    
    doc.setFontSize(14);
    doc.text(icon, safeMargin + 5, yPos + 8);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(25, 42, 86);
    doc.text(label + ":", safeMargin + 15, yPos + 5.5);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(value, safeMargin + 15, yPos + 9.5);
    
    yPos += 15;
  });
  
  yPos += 10;
  
  doc.setFillColor(25, 42, 86);
  doc.roundedRect(safeMargin, yPos, pageWidth - 2 * safeMargin, 25, 3, 3, 'F');
  
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(232, 210, 120);
  doc.text("¿Listo para Mejorar su Producción?", pageWidth / 2, yPos + 10, { align: "center" });
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Contáctenos hoy y descubra cómo Bonlife puede", pageWidth / 2, yPos + 16, { align: "center" });
  doc.text("optimizar sus costos y calidad.", pageWidth / 2, yPos + 21, { align: "center" });
  
  addPageFooter();

  // ============ BACK COVER ============
  addNewPage();
  
  yPos = pageHeight / 2 - 40;
  
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(25, 42, 86);
  doc.text("BONLIFE", pageWidth / 2, yPos, { align: "center" });
  
  yPos += 15;
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(212, 175, 55);
  doc.text("Más Rendimiento", pageWidth / 2, yPos, { align: "center" });
  yPos += 8;
  doc.text("Más Salud", pageWidth / 2, yPos, { align: "center" });
  yPos += 8;
  doc.text("Más Ahorro", pageWidth / 2, yPos, { align: "center" });
  
  yPos += 20;
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1);
  doc.line(pageWidth / 2 - 50, yPos, pageWidth / 2 + 50, yPos);
  
  yPos += 15;
  doc.setFontSize(11);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(41, 66, 108);
  doc.text("El verdadero aceite vegetal con el doble de duración", pageWidth / 2, yPos, { align: "center" });
  
  yPos = pageHeight - 40;
  doc.setFillColor(212, 175, 55);
  doc.rect(0, yPos, pageWidth, 25, 'F');
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(25, 42, 86);
  doc.text("📞 +1 (829) 987-6764", pageWidth / 2, yPos + 10, { align: "center" });
  doc.text("🌐 www.bonlifeoil.com", pageWidth / 2, yPos + 17, { align: "center" });
  
  addPageBorder();
  addPageFooter();

  // Save PDF
  doc.save("Catalogo-Bonlife-Premium.pdf");
};
