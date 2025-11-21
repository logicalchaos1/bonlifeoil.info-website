import jsPDF from 'jspdf';
import bonlifeComparison from '@/assets/bonlife-comparison.jpg';
import mantecaProduct from '@/assets/manteca-product.jpg';
import margarineProduct from '@/assets/margarine-product.jpg';
import palmOilProduct from '@/assets/palm-oil-product.jpg';
import soyaOilProduct from '@/assets/soya-oil-product.jpg';
import sunflowerOilProduct from '@/assets/sunflower-oil-product.jpg';

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
  pdf.text('Aceites Premium', pageWidth / 2, 100, { align: 'center' });
  
  pdf.setFontSize(16);
  pdf.text('Catálogo de Productos', pageWidth / 2, 120, { align: 'center' });
  
  pdf.setFontSize(12);
  pdf.text('Calidad Superior • Rendimiento Excepcional', pageWidth / 2, 240, { align: 'center' });
  pdf.text('+1 (829) 987-6764', pageWidth / 2, 250, { align: 'center' });

  // Page 2: Why Choose Bonlife
  pdf.addPage();
  pdf.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');
  
  pdf.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  pdf.setFontSize(32);
  pdf.setFont('helvetica', 'bold');
  pdf.text('¿Por Qué Elegir Bonlife?', pageWidth / 2, 30, { align: 'center' });
  
  pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  
  const benefits = [
    {
      title: 'Mayor Durabilidad',
      desc: 'Nuestros aceites duran hasta 3 veces más que la competencia, reduciendo costos y desperdicio.'
    },
    {
      title: 'Calidad Premium',
      desc: 'Productos refinados con los más altos estándares de calidad internacional.'
    },
    {
      title: 'Ahorro Comprobado',
      desc: 'Reduce tus costos operativos hasta en un 50% con nuestros aceites de alto rendimiento.'
    },
    {
      title: 'Sabor Superior',
      desc: 'Mantén el sabor auténtico de tus alimentos sin transferencia de olores.'
    },
    {
      title: 'Menos Humo',
      desc: 'Punto de humo más alto para un ambiente de cocina más limpio y saludable.'
    },
    {
      title: 'Soporte Técnico',
      desc: 'Asesoría personalizada para optimizar tus procesos de cocina.'
    }
  ];

  let yPos = 50;
  benefits.forEach((benefit, index) => {
    if (index === 3) {
      pdf.addPage();
      pdf.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      yPos = 30;
    }
    
    pdf.setFillColor(goldColor[0], goldColor[1], goldColor[2]);
    pdf.circle(margin + 5, yPos, 3, 'F');
    
    pdf.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text(benefit.title, margin + 12, yPos + 1);
    
    pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    const lines = pdf.splitTextToSize(benefit.desc, contentWidth - 12);
    pdf.text(lines, margin + 12, yPos + 8);
    
    yPos += 35;
  });

  // Page 3: Comparison Table
  pdf.addPage();
  pdf.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');
  
  pdf.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  pdf.setFontSize(28);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Comparación con la Competencia', pageWidth / 2, 30, { align: 'center' });
  
  // Table headers
  const tableY = 45;
  const colWidth = contentWidth / 3;
  
  pdf.setFillColor(goldColor[0], goldColor[1], goldColor[2]);
  pdf.rect(margin, tableY, contentWidth, 12, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Característica', margin + 3, tableY + 8);
  pdf.text('Bonlife', margin + colWidth + 3, tableY + 8);
  pdf.text('Competencia', margin + (colWidth * 2) + 3, tableY + 8);
  
  // Table rows
  const rows = [
    ['Duración', '30-40 horas', '10-15 horas'],
    ['Punto de Humo', '235°C', '180°C'],
    ['Cambios/Mes', '8-10 veces', '25-30 veces'],
    ['Costo/Hora', '$0.75', '$2.00'],
    ['Transferencia Sabor', 'Mínima', 'Alta'],
    ['Espumado', 'Bajo', 'Alto'],
    ['Rendimiento', '200%', '100%']
  ];
  
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  
  let rowY = tableY + 12;
  rows.forEach((row, index) => {
    const bgColor = index % 2 === 0 ? [255, 255, 255] : [245, 245, 245];
    pdf.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
    pdf.rect(margin, rowY, contentWidth, 10, 'F');
    
    pdf.setFontSize(10);
    pdf.text(row[0], margin + 3, rowY + 6);
    
    pdf.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
    pdf.setFont('helvetica', 'bold');
    pdf.text(row[1], margin + colWidth + 3, rowY + 6);
    
    pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    pdf.setFont('helvetica', 'normal');
    pdf.text(row[2], margin + (colWidth * 2) + 3, rowY + 6);
    
    rowY += 10;
  });

  // Savings highlight
  pdf.setFillColor(goldColor[0], goldColor[1], goldColor[2]);
  pdf.roundedRect(margin, rowY + 10, contentWidth, 30, 3, 3, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Ahorro Promedio: 50-60%', pageWidth / 2, rowY + 22, { align: 'center' });
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Cambia a Bonlife y reduce tus costos significativamente', pageWidth / 2, rowY + 32, { align: 'center' });

  // Products Pages
  const products = [
    {
      name: 'Aceite de Palma Premium',
      image: palmOilProduct,
      price: '$30.00',
      size: 'Cubo de 35 lbs',
      duration: '30-40 horas',
      features: ['Ideal para frituras', 'Alto punto de humo', 'Sabor neutro', 'Máxima durabilidad']
    },
    {
      name: 'Aceite de Soya',
      image: soyaOilProduct,
      price: '$28.00',
      size: 'Cubo de 35 lbs',
      duration: '25-35 horas',
      features: ['Versátil', 'Rico en vitaminas', 'Bajo colesterol', 'Ideal para cocina general']
    },
    {
      name: 'Aceite de Girasol',
      image: sunflowerOilProduct,
      price: '$32.00',
      size: 'Cubo de 35 lbs',
      duration: '28-38 horas',
      features: ['Alto oleico', 'Saludable', 'Estable a altas temperaturas', 'Sin transgénicos']
    },
    {
      name: 'Manteca Vegetal',
      image: mantecaProduct,
      price: '$25.00',
      size: 'Cubo de 35 lbs',
      duration: '35-45 horas',
      features: ['Textura cremosa', 'Ideal para repostería', 'Cero grasas trans', 'Gran estabilidad']
    },
    {
      name: 'Margarina Premium',
      image: margarineProduct,
      price: '$27.00',
      size: 'Cubo de 35 lbs',
      duration: '30-40 horas',
      features: ['Sabor mantequilla', 'Fácil untabilidad', 'Fortificada', 'Versátil en cocina']
    }
  ];

  for (const product of products) {
    pdf.addPage();
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');
    
    // Product name
    pdf.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text(product.name, pageWidth / 2, 25, { align: 'center' });
    
    // Product image
    try {
      const imageData = await loadImage(product.image);
      pdf.addImage(imageData, 'JPEG', margin + 20, 35, contentWidth - 40, 80);
    } catch (error) {
      console.error('Error loading product image:', error);
    }
    
    // Price box
    pdf.setFillColor(goldColor[0], goldColor[1], goldColor[2]);
    pdf.roundedRect(margin, 125, contentWidth, 20, 3, 3, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text(product.price, margin + 10, 137);
    
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(product.size, pageWidth - margin - 10, 137, { align: 'right' });
    
    // Duration
    pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Duración:', margin, 160);
    pdf.setFont('helvetica', 'normal');
    pdf.text(product.duration, margin + 30, 160);
    
    // Features
    pdf.setFont('helvetica', 'bold');
    pdf.text('Características:', margin, 175);
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    let featureY = 185;
    product.features.forEach(feature => {
      pdf.setFillColor(goldColor[0], goldColor[1], goldColor[2]);
      pdf.circle(margin + 3, featureY - 2, 1.5, 'F');
      pdf.text(feature, margin + 8, featureY);
      featureY += 8;
    });
  }

  // Final Page: Contact Information
  pdf.addPage();
  pdf.setFillColor(darkColor[0], darkColor[1], darkColor[2]);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');
  
  pdf.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  pdf.setFontSize(36);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Contáctanos', pageWidth / 2, 60, { align: 'center' });
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'normal');
  
  pdf.text('Teléfono:', pageWidth / 2, 100, { align: 'center' });
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(20);
  pdf.text('+1 (829) 987-6764', pageWidth / 2, 112, { align: 'center' });
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(16);
  pdf.text('WhatsApp:', pageWidth / 2, 135, { align: 'center' });
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(20);
  pdf.text('+1 (829) 987-6764', pageWidth / 2, 147, { align: 'center' });
  
  pdf.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Horario de Atención:', pageWidth / 2, 175, { align: 'center' });
  pdf.setTextColor(255, 255, 255);
  pdf.text('Lunes a Viernes: 8:00 AM - 6:00 PM', pageWidth / 2, 185, { align: 'center' });
  pdf.text('Sábados: 8:00 AM - 2:00 PM', pageWidth / 2, 195, { align: 'center' });
  
  pdf.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Tu Socio en Calidad y Ahorro', pageWidth / 2, 240, { align: 'center' });

  pdf.save('Booklet-Bonlife.pdf');
};
