import jsPDF from 'jspdf';

export const generateMargarinaFichaTecnica = async () => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  const gold = [212, 175, 55];
  const dark = [26, 26, 26];
  const gray = [120, 120, 120];

  let y = 20;

  // Header banner
  pdf.setFillColor(gold[0], gold[1], gold[2]);
  pdf.rect(0, 0, pageWidth, 32, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('BONLIFE', margin, 15);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('FICHA TÉCNICA', margin, 24);

  y = 45;
  pdf.setTextColor(dark[0], dark[1], dark[2]);
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('MARGARINA BONLIFE', pageWidth / 2, y, { align: 'center' });
  y += 12;

  const section = (title: string) => {
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(dark[0], dark[1], dark[2]);
    pdf.text(title, margin, y);
    y += 6;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
  };

  const paragraph = (text: string) => {
    const lines = pdf.splitTextToSize(text, contentWidth);
    pdf.text(lines, margin, y);
    y += lines.length * 5 + 6;
  };

  section('DESCRIPCIÓN GENERAL.');
  paragraph(
    'Margarina de base vegetal, elaborada con aceites y grasas vegetales refinadas, blanqueadas y desodorizadas, con aditivos grado alimenticio (emulsificantes, conservantes, saborizantes) y enriquecida con vitaminas.'
  );

  section('CARACTERÍSTICAS.');
  paragraph(
    'Producto de consistencia plástica, sólida a temperatura ambiente, de apariencia homogénea y fácil incorporación y mezclado con otros ingredientes. Aporta cremosidad, sabor natural y buen rendimiento en cocina y panificación.'
  );

  section('APLICACIONES.');
  paragraph(
    'Formulación de uso general (tipo "manicera"): ideal para untar, hornear, cocinar y como ingrediente en preparaciones de cocina profesional, panadería general y servicio de mesa. No es una margarina de laminado — no está formulada para hojaldre o croissant, que requieren un rango de plasticidad y punto de fusión distintos.'
  );

  section('ESPECIFICACIONES TÉCNICAS.');

  const specRows: Array<[string, string, boolean]> = [
    ['% FFA (Ac. Oleico)', '0.20% max.', false],
    ['% Humedad y Volátiles (M&I)', '0.16% max.', false],
    ['Índice de Yodo (IV)', '40 – 44', false],
    ['Mezcla grasa mínima', '80%', false],
    ['Punto de fusión (°C)', '34 – 38 (típico)', true],
    ['Punto de humo (°C)', '175 – 185 (típico)', true],
    ['Índice de Peróxido', '2.0 meq O2/kg max. (típico)', true],
    ['Color (Lovibond 5 1/4")', 'A confirmar con proveedor', true],
    ['Olor/Sabor', 'A confirmar (panel sensorial)', true],
  ];

  const col1 = margin;
  const col2 = margin + 90;
  const rowHeight = 7;
  const tableTop = y;

  pdf.setFillColor(dark[0], dark[1], dark[2]);
  pdf.rect(margin, y, contentWidth, rowHeight, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'bold');
  pdf.text('PARÁMETRO', col1 + 3, y + 5);
  pdf.text('VALOR', col2 + 3, y + 5);
  y += rowHeight;

  specRows.forEach(([label, value, isEstimate], i) => {
    const bg = i % 2 === 0 ? [250, 250, 250] : [255, 255, 255];
    pdf.setFillColor(bg[0], bg[1], bg[2]);
    pdf.rect(margin, y, contentWidth, rowHeight, 'F');
    pdf.setTextColor(dark[0], dark[1], dark[2]);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.text(label, col1 + 3, y + 5);
    pdf.setFont('helvetica', isEstimate ? 'italic' : 'bold');
    pdf.setTextColor(isEstimate ? gray[0] : dark[0], isEstimate ? gray[1] : dark[1], isEstimate ? gray[2] : dark[2]);
    pdf.text(value + (isEstimate ? ' *' : ''), col2 + 3, y + 5);
    y += rowHeight;
  });

  pdf.setDrawColor(200, 200, 200);
  pdf.rect(margin, tableTop, contentWidth, rowHeight * (specRows.length + 1), 'S');
  y += 10;

  section('REGULACIONES LEGALES.');
  paragraph(
    'Formulado para cumplir con las especificaciones legales de un producto graso comestible de acuerdo a normas internacionales de referencia del sector (AOCS/FDA/NORDOM). Confirmar cumplimiento específico con la documentación del proveedor y las autoridades sanitarias dominicanas antes de su comercialización.'
  );

  section('ALMACENAMIENTO.');
  paragraph(
    'Almacenar en un lugar fresco y seco (20–25 °C), protegido del sol y del calor directo, ya que las altas temperaturas disminuyen su estabilidad oxidativa y consistencia.'
  );

  // Disclaimer
  const footerY = pdf.internal.pageSize.getHeight() - 30;
  pdf.setFontSize(7.5);
  pdf.setFont('helvetica', 'italic');
  pdf.setTextColor(gray[0], gray[1], gray[2]);
  const disclaimer = pdf.splitTextToSize(
    '(*) Valor de referencia típico de la categoría, no un resultado de laboratorio certificado de este lote — confirmar con el certificado de análisis del proveedor antes de uso comercial, regulatorio o de auditoría. La demás información refleja el conocimiento actual de Bonlife sobre este producto.',
    contentWidth
  );
  const disclaimerHeight = disclaimer.length * 4;
  if (y + disclaimerHeight > footerY - 4) {
    y = footerY - 4 - disclaimerHeight;
  }
  pdf.text(disclaimer, margin, y);

  // Footer contact
  pdf.setFillColor(dark[0], dark[1], dark[2]);
  pdf.rect(margin, footerY, contentWidth, 22, 'F');
  pdf.setTextColor(gold[0], gold[1], gold[2]);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Contacto', pageWidth / 2, footerY + 9, { align: 'center' });
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.text('+1 (829) 987-6764  |  ventas@bonlifeoil.com  |  bonlifeoil.com', pageWidth / 2, footerY + 17, { align: 'center' });

  pdf.save('Ficha-Tecnica-Margarina-Bonlife.pdf');
};
