import jsPDF from 'jspdf';
import palmOilProduct from '@/assets/palm-oil-product.jpg';
import soyaOilProduct from '@/assets/soya-oil-product.jpg';
import sunflowerOilProduct from '@/assets/sunflower-oil-product.jpg';
import mantecaProduct from '@/assets/manteca-product.jpg';
import margarineProduct from '@/assets/margarine-product.jpg';
import mayonesaProduct from '@/assets/mayonesa-product.jpg';
import mayonesaSachetsProduct from '@/assets/mayonesa-sachets-product.jpg';

export const generateBookletPDF = async () => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);

  // Brand colors
  const goldColor = [212, 175, 55];
  const blueColor = [70, 130, 180];
  const orangeColor = [255, 165, 0];
  const brownColor = [139, 69, 19];
  const darkColor = [26, 26, 26];
  const lightBg = [250, 250, 250];

  // Helper function to load and convert image
  const loadImage = (src: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        } else {
          reject(new Error('Canvas context not available'));
        }
      };
      img.onerror = reject;
      img.src = src;
    });
  };

  // Page 1: Cover Page
  pdf.setFillColor(goldColor[0], goldColor[1], goldColor[2]);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(48);
  pdf.setFont('helvetica', 'bold');
  pdf.text('BONLIFE', pageWidth / 2, 80, { align: 'center' });
  
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Aceites Premium', pageWidth / 2, 105, { align: 'center' });
  
  pdf.setFontSize(16);
  pdf.text('Catálogo de Productos', pageWidth / 2, 125, { align: 'center' });
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'italic');
  pdf.text('El verdadero aceite vegetal con el doble de duración', pageWidth / 2, 240, { align: 'center' });
  pdf.setFont('helvetica', 'bold');
  pdf.text('+1 (829) 987-6764', pageWidth / 2, 250, { align: 'center' });

  // Product 1: Aceite Bonlife RBD Palm Olein
  pdf.addPage();
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');
  
  pdf.setFillColor(goldColor[0], goldColor[1], goldColor[2]);
  pdf.rect(0, 0, pageWidth, 35, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Aceite Bonlife RBD Palm Olein', pageWidth / 2, 22, { align: 'center' });
  
  try {
    const imageData = await loadImage(palmOilProduct);
    pdf.addImage(imageData, 'JPEG', margin + 30, 45, contentWidth - 60, 60);
  } catch (error) {
    console.error('Error loading product image:', error);
  }
  
  pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'italic');
  pdf.text('Aceite virgen de alto rendimiento para uso industrial y comercial', margin, 115);
  
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setFillColor(34, 139, 34);
  pdf.rect(margin, 125, 45, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.text('$4,600 DOP', margin + 5, 133);
  
  pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Beneficios Principales:', margin, 150);
  
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  const palmBenefits = [
    'Dura hasta 300% más que los aceites tradicionales',
    'No transfiere sabores ni olores entre frituras',
    'Menor absorción de grasa: productos más secos y dorados',
    'Libre de colesterol y grasas trans',
    'Color dorado estable, incluso tras múltiples usos',
    'Apto para freidoras industriales y comerciales'
  ];
  let yPos = 158;
  palmBenefits.forEach(benefit => {
    pdf.setFillColor(goldColor[0], goldColor[1], goldColor[2]);
    pdf.circle(margin + 2, yPos - 1.5, 1, 'F');
    const lines = pdf.splitTextToSize(benefit, contentWidth - 8);
    pdf.text(lines, margin + 5, yPos);
    yPos += lines.length * 5;
  });
  
  yPos += 5;
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.text('Especificaciones Técnicas:', margin, yPos);
  yPos += 6;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.text('Acidez: 0.045% max  |  Punto de Humo: 230°C  |  Duración: 45-56 horas', margin, yPos);
  yPos += 5;
  pdf.text('Presentaciones: 25L  |  Vida útil: 2 años (cerrado)', margin, yPos);

  // Product 2: Aceite de Soya
  pdf.addPage();
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');
  
  pdf.setFillColor(blueColor[0], blueColor[1], blueColor[2]);
  pdf.rect(0, 0, pageWidth, 35, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Aceite de Soya Bonlife', pageWidth / 2, 22, { align: 'center' });
  
  try {
    const imageData = await loadImage(soyaOilProduct);
    pdf.addImage(imageData, 'JPEG', margin + 30, 45, contentWidth - 60, 60);
  } catch (error) {
    console.error('Error loading product image:', error);
  }
  
  pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'italic');
  pdf.text('Aceite vegetal refinado, estable y versátil', margin, 115);
  
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setFillColor(34, 139, 34);
  pdf.rect(margin, 125, 45, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.text('$4,000 DOP', margin + 5, 133);
  
  pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Características:', margin, 150);
  
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  yPos = 158;
  const soyaBenefits = [
    'Rico en ácidos grasos esenciales  |  Punto de humo: 220°C',
    'Ideal para cocciones rápidas, salsas y aderezos',
    'Bajo en grasas saturadas  |  Alta presencia de Vitamina E'
  ];
  soyaBenefits.forEach(benefit => {
    pdf.setFillColor(blueColor[0], blueColor[1], blueColor[2]);
    pdf.circle(margin + 2, yPos - 1.5, 1, 'F');
    const lines = pdf.splitTextToSize(benefit, contentWidth - 8);
    pdf.text(lines, margin + 5, yPos);
    yPos += lines.length * 5;
  });
  
  yPos += 5;
  pdf.setFont('helvetica', 'italic');
  pdf.setFontSize(8);
  pdf.text('Presentaciones: 25L  |  Vida útil: 2 años (cerrado)', margin, yPos);

  // Product 3: Aceite de Girasol
  pdf.addPage();
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');
  
  pdf.setFillColor(orangeColor[0], orangeColor[1], orangeColor[2]);
  pdf.rect(0, 0, pageWidth, 35, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Aceite de Girasol Bonlife', pageWidth / 2, 22, { align: 'center' });
  
  try {
    const imageData = await loadImage(sunflowerOilProduct);
    pdf.addImage(imageData, 'JPEG', margin + 30, 45, contentWidth - 60, 60);
  } catch (error) {
    console.error('Error loading product image:', error);
  }
  
  pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'italic');
  pdf.text('100% natural, alto en ácido oleico', margin, 115);
  
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setFillColor(34, 139, 34);
  pdf.rect(margin, 125, 45, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.text('$4,000 DOP', margin + 5, 133);
  
  pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Características:', margin, 150);
  
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  yPos = 158;
  const sunflowerBenefits = [
    'Fuente natural de Vitamina E y antioxidantes',
    'Ideal para cocina saludable, repostería y ensaladas',
    'Punto de humo: 232°C  |  Tipo: Alto Oleico / Refinado'
  ];
  sunflowerBenefits.forEach(benefit => {
    pdf.setFillColor(orangeColor[0], orangeColor[1], orangeColor[2]);
    pdf.circle(margin + 2, yPos - 1.5, 1, 'F');
    const lines = pdf.splitTextToSize(benefit, contentWidth - 8);
    pdf.text(lines, margin + 5, yPos);
    yPos += lines.length * 5;
  });
  
  yPos += 5;
  pdf.setFont('helvetica', 'italic');
  pdf.setFontSize(8);
  pdf.text('Presentaciones: 25L  |  Vida útil: 2 años (cerrado)', margin, yPos);

  // Product 4: Manteca Vegetal
  pdf.addPage();
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');
  
  pdf.setFillColor(brownColor[0], brownColor[1], brownColor[2]);
  pdf.rect(0, 0, pageWidth, 35, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Manteca Vegetal Bonlife', pageWidth / 2, 22, { align: 'center' });
  
  try {
    const imageData = await loadImage(mantecaProduct);
    pdf.addImage(imageData, 'JPEG', margin + 30, 45, contentWidth - 60, 60);
  } catch (error) {
    console.error('Error loading product image:', error);
  }
  
  pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'italic');
  pdf.text('Premium para panificación y repostería', margin, 115);
  
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setFillColor(34, 139, 34);
  pdf.rect(margin, 125, 45, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.text('$3,570 DOP', margin + 5, 133);
  
  pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Beneficios:', margin, 150);
  
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  yPos = 158;
  const mantecaBenefits = [
    'Proporciona textura suave y crujiente a masas',
    'Mejora el volumen y apariencia de productos horneados',
    'Enriquecida con Vitamina E, libre de grasas trans y GMO'
  ];
  mantecaBenefits.forEach(benefit => {
    pdf.setFillColor(brownColor[0], brownColor[1], brownColor[2]);
    pdf.circle(margin + 2, yPos - 1.5, 1, 'F');
    const lines = pdf.splitTextToSize(benefit, contentWidth - 8);
    pdf.text(lines, margin + 5, yPos);
    yPos += lines.length * 5;
  });
  
  yPos += 5;
  pdf.setFont('helvetica', 'italic');
  pdf.setFontSize(8);
  pdf.text('Aplicaciones: Pasteles, galletas, panes, wafers y productos automatizados', margin, yPos);
  yPos += 5;
  pdf.text('Presentaciones: 25L  |  Vida útil: 2 años (cerrado)', margin, yPos);

  // Product 5: Margarina
  pdf.addPage();
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');
  
  pdf.setFillColor(255, 215, 0);
  pdf.rect(0, 0, pageWidth, 35, 'F');
  pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Margarina Bonlife', pageWidth / 2, 22, { align: 'center' });
  
  try {
    const imageData = await loadImage(margarineProduct);
    pdf.addImage(imageData, 'JPEG', margin + 30, 45, contentWidth - 60, 60);
  } catch (error) {
    console.error('Error loading product image:', error);
  }
  
  pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'italic');
  pdf.text('Alternativa saludable enriquecida con vitaminas', margin, 115);
  
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setFillColor(34, 139, 34);
  pdf.rect(margin, 125, 45, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.text('$3,570 DOP', margin + 5, 133);
  
  pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Características:', margin, 150);
  
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  yPos = 158;
  const margarineBenefits = [
    'Bajo contenido de grasas trans',
    'Aporta cremosidad y sabor natural',
    'Ideal para untar, hornear y cocinar'
  ];
  margarineBenefits.forEach(benefit => {
    pdf.setFillColor(255, 215, 0);
    pdf.circle(margin + 2, yPos - 1.5, 1, 'F');
    const lines = pdf.splitTextToSize(benefit, contentWidth - 8);
    pdf.text(lines, margin + 5, yPos);
    yPos += lines.length * 5;
  });
  
  yPos += 5;
  pdf.setFont('helvetica', 'italic');
  pdf.setFontSize(8);
  pdf.text('Presentaciones: 15kg  |  Vida útil: 2 años (cerrado)', margin, yPos);

  // Product 5c: Estearina de Palma (Ingrediente Industrial)
  pdf.addPage();
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  pdf.setFillColor(160, 82, 45);
  pdf.rect(0, 0, pageWidth, 35, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(15);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Estearina de Palma Bonlife (Ingrediente Industrial)', pageWidth / 2, 22, { align: 'center' });

  try {
    const imageData = await loadImage(palmOilProduct);
    pdf.addImage(imageData, 'JPEG', margin + 30, 45, contentWidth - 60, 60);
  } catch (error) {
    console.error('Error loading product image:', error);
  }

  pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'italic');
  const estearinaTagline = pdf.splitTextToSize(
    'Grasa vegetal sólida a granel para fabricantes de margarinas, shortenings y panificación',
    contentWidth
  );
  pdf.text(estearinaTagline, margin, 115);

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setFillColor(100, 100, 100);
  pdf.rect(margin, 125, 55, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.text('Consultar cotización', margin + 5, 133);

  pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Características:', margin, 150);

  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  yPos = 158;
  const estearinaBenefits = [
    'Libre de ácidos grasos trans',
    'Consistencia sólida estable a temperatura ambiente',
    'Ingrediente base para margarinas, shortenings y grasas de panadería (no es un aceite de cocina terminado)'
  ];
  estearinaBenefits.forEach(benefit => {
    pdf.setFillColor(160, 82, 45);
    pdf.circle(margin + 2, yPos - 1.5, 1, 'F');
    const lines = pdf.splitTextToSize(benefit, contentWidth - 8);
    pdf.text(lines, margin + 5, yPos);
    yPos += lines.length * 5;
  });

  yPos += 5;
  pdf.setFont('helvetica', 'italic');
  pdf.setFontSize(8);
  pdf.text('Presentación: a granel (cisterna, por tonelada)', margin, yPos);

  // Product 5d: Polvo de Hornear Bonlife
  pdf.addPage();
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  pdf.setFillColor(220, 20, 60);
  pdf.rect(0, 0, pageWidth, 35, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Polvo de Hornear Bonlife', pageWidth / 2, 22, { align: 'center' });

  try {
    const imageData = await loadImage(mantecaProduct);
    pdf.addImage(imageData, 'JPEG', margin + 30, 45, contentWidth - 60, 60);
  } catch (error) {
    console.error('Error loading product image:', error);
  }

  pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'italic');
  pdf.text('Complemento ideal para masas de harina en su proceso de horneado', margin, 115);

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.setFillColor(100, 100, 100);
  pdf.rect(margin, 125, 55, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.text('Consultar cotización', margin + 5, 133);

  pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Características:', margin, 150);

  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  yPos = 158;
  const polvoBenefits = [
    'Leudante de acción confiable para panadería y repostería industrial',
    'Formulado para consistencia uniforme en producción de alto volumen',
    'Complemento a la línea de grasas e insumos Bonlife para panaderías'
  ];
  polvoBenefits.forEach(benefit => {
    pdf.setFillColor(220, 20, 60);
    pdf.circle(margin + 2, yPos - 1.5, 1, 'F');
    const lines = pdf.splitTextToSize(benefit, contentWidth - 8);
    pdf.text(lines, margin + 5, yPos);
    yPos += lines.length * 5;
  });

  yPos += 5;
  pdf.setFont('helvetica', 'italic');
  pdf.setFontSize(8);
  pdf.text('Presentación: saco industrial  |  Vida útil: 18 meses (cerrado)', margin, yPos);

  // Product 6: Mayonesa Bonlife
  pdf.addPage();
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  pdf.setFillColor(22, 162, 73);
  pdf.rect(0, 0, pageWidth, 35, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Mayonesa Bonlife', pageWidth / 2, 22, { align: 'center' });

  try {
    const imageData = await loadImage(mayonesaProduct);
    pdf.addImage(imageData, 'JPEG', margin + 30, 45, contentWidth - 60, 60);
  } catch (error) {
    console.error('Error loading product image:', error);
  }

  pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'italic');
  pdf.text('Elaborada con limón y huevo, cremosidad y sabor consistente', margin, 115);

  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setFillColor(34, 139, 34);
  pdf.rect(margin, 125, 55, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.text('$4,000 DOP/Caja', margin + 5, 133);

  pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Características:', margin, 150);

  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  yPos = 158;
  const mayonesaBenefits = [
    'Elaborada con limón y huevo para sabor tradicional',
    'Presentación de alto rendimiento para uso profesional',
    'Ideal para sándwiches, ensaladas y salsas base'
  ];
  mayonesaBenefits.forEach(benefit => {
    pdf.setFillColor(22, 162, 73);
    pdf.circle(margin + 2, yPos - 1.5, 1, 'F');
    const lines = pdf.splitTextToSize(benefit, contentWidth - 8);
    pdf.text(lines, margin + 5, yPos);
    yPos += lines.length * 5;
  });

  yPos += 5;
  pdf.setFont('helvetica', 'italic');
  pdf.setFontSize(8);
  pdf.text('Presentación: caja de 4 x 1 galón (8 lb c/u)', margin, yPos);

  // Product 6b: Mayonesa Bonlife en Sachets
  pdf.addPage();
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  pdf.setFillColor(22, 162, 73);
  pdf.rect(0, 0, pageWidth, 35, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Mayonesa Bonlife en Sachets', pageWidth / 2, 22, { align: 'center' });

  try {
    const imageData = await loadImage(mayonesaSachetsProduct);
    pdf.addImage(imageData, 'JPEG', margin + 30, 45, contentWidth - 60, 60);
  } catch (error) {
    console.error('Error loading product image:', error);
  }

  pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'italic');
  pdf.text('Porciones individuales de 12 ml, mismo producto que el galón', margin, 115);

  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setFillColor(34, 139, 34);
  pdf.rect(margin, 125, 55, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.text('$2,500 DOP/Caja', margin + 5, 133);

  pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Características:', margin, 150);

  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  yPos = 158;
  const mayonesaSachetsBenefits = [
    'Mismo sabor y calidad que la Mayonesa Bonlife de galón',
    'Porciones individuales higiénicas, listas para servir',
    'Ideal para delivery, combos y servicio a la mesa'
  ];
  mayonesaSachetsBenefits.forEach(benefit => {
    pdf.setFillColor(22, 162, 73);
    pdf.circle(margin + 2, yPos - 1.5, 1, 'F');
    const lines = pdf.splitTextToSize(benefit, contentWidth - 8);
    pdf.text(lines, margin + 5, yPos);
    yPos += lines.length * 5;
  });

  yPos += 5;
  pdf.setFont('helvetica', 'italic');
  pdf.setFontSize(8);
  pdf.text('Presentación: caja de 12 packs x 12 sachets (144 x 12 ml)', margin, yPos);

  // Final Page: Contact & Coverage
  pdf.addPage();
  pdf.setFillColor(darkColor[0], darkColor[1], darkColor[2]);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');
  
  pdf.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  pdf.setFontSize(32);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Sedes y Cobertura', pageWidth / 2, 50, { align: 'center' });
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Santo Domingo, RD', pageWidth / 2, 70, { align: 'center' });
  pdf.text('Punta Cana / Bávaro', pageWidth / 2, 80, { align: 'center' });
  pdf.text('Santiago', pageWidth / 2, 90, { align: 'center' });
  
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(16);
  pdf.text('Entregas en todo el país', pageWidth / 2, 110, { align: 'center' });
  
  pdf.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  pdf.setFontSize(32);
  pdf.text('Contacto', pageWidth / 2, 145, { align: 'center' });
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Teléfono: +1 (829) 987-6764', pageWidth / 2, 165, { align: 'center' });
  pdf.text('WhatsApp: +1 (829) 987-6764', pageWidth / 2, 175, { align: 'center' });
  pdf.text('Sitio web: bonlifeoil.com', pageWidth / 2, 185, { align: 'center' });
  pdf.text('Email: ventas@bonlifeoil.com', pageWidth / 2, 195, { align: 'center' });
  
  pdf.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Bonlife: Más Rendimiento. Más Salud. Más Ahorro.', pageWidth / 2, 240, { align: 'center' });

  pdf.save('Booklet-Bonlife.pdf');
};
