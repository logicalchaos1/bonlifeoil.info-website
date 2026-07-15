import jsPDF from 'jspdf';

export const generatePriceListPDF = async () => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  // Brand colors
  const gold = [212, 175, 55];
  const dark = [26, 26, 26];

  // Header - text only
  pdf.setFillColor(gold[0], gold[1], gold[2]);
  pdf.rect(0, 0, pageWidth, 50, 'F');

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(32);
  pdf.setFont('helvetica', 'bold');
  pdf.text('BONLIFE', pageWidth / 2, 25, { align: 'center' });
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Lista de Precios — Marzo 2026', pageWidth / 2, 38, { align: 'center' });

  // Table header
  let y = 65;
  const col1 = margin;
  const col2 = margin + 95;
  const col3 = margin + 135;
  const rowHeight = 12;

  pdf.setFillColor(dark[0], dark[1], dark[2]);
  pdf.rect(margin, y, contentWidth, rowHeight, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Producto', col1 + 4, y + 8);
  pdf.text('Presentación', col2 + 4, y + 8);
  pdf.text('Precio (DOP)', col3 + 4, y + 8);
  y += rowHeight;

  // Products
  const products = [
    { name: 'Aceite Bonlife RBD Palm Olein', presentation: '25 Litros', price: '$4,600' },
    { name: 'Aceite de Soya Bonlife', presentation: '25 Litros', price: '$4,000' },
    { name: 'Aceite de Girasol Bonlife', presentation: '25 Litros', price: '$4,000' },
    { name: 'Manteca Vegetal Bonlife', presentation: '25 Litros', price: '$3,570' },
    { name: 'Margarina Bonlife', presentation: '15 Kg', price: '$3,570' },
  ];

  pdf.setFontSize(9);
  products.forEach((product, i) => {
    const bgColor = i % 2 === 0 ? [250, 250, 250] : [255, 255, 255];
    pdf.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
    pdf.rect(margin, y, contentWidth, rowHeight, 'F');

    pdf.setTextColor(dark[0], dark[1], dark[2]);
    pdf.setFont('helvetica', 'bold');
    pdf.text(product.name, col1 + 4, y + 8);
    pdf.setFont('helvetica', 'normal');
    pdf.text(product.presentation, col2 + 4, y + 8);
    pdf.setTextColor(34, 139, 34);
    pdf.setFont('helvetica', 'bold');
    pdf.text(product.price, col3 + 4, y + 8);
    y += rowHeight;
  });

  // Border around table
  pdf.setDrawColor(200, 200, 200);
  pdf.rect(margin, 60, contentWidth, rowHeight * (products.length + 1), 'S');

  // Notes
  y += 15;
  pdf.setTextColor(dark[0], dark[1], dark[2]);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Notas:', margin, y);
  y += 6;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  const notes = [
    'Precios sujetos a cambios sin previo aviso.',
    'ITBIS incluido en todos los precios.',
    'Entregas disponibles en todo el territorio nacional.',
    'Descuentos por volumen disponibles — contáctenos para cotización personalizada.',
  ];
  notes.forEach(note => {
    pdf.text(`• ${note}`, margin + 2, y);
    y += 5;
  });

  // Footer contact
  y += 10;
  pdf.setFillColor(dark[0], dark[1], dark[2]);
  pdf.rect(margin, y, contentWidth, 30, 'F');
  pdf.setTextColor(gold[0], gold[1], gold[2]);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Contacto', pageWidth / 2, y + 10, { align: 'center' });
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.text('+1 (829) 987-6764  |  ventas@bonlifeoil.com  |  bonlifeoil.com', pageWidth / 2, y + 20, { align: 'center' });

  pdf.save('Lista-de-Precios-Bonlife.pdf');
};
