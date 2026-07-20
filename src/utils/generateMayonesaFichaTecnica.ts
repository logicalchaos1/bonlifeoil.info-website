import jsPDF from 'jspdf';

export const generateMayonesaFichaTecnica = async () => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  const gold = [212, 175, 55];
  const dark = [26, 26, 26];
  const gray = [110, 110, 110];

  let y = 0;

  const drawHeader = () => {
    pdf.setFillColor(gold[0], gold[1], gold[2]);
    pdf.rect(0, 0, pageWidth, 26, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('BONLIFE', margin, 12);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.text('FICHA TÉCNICA DEL PRODUCTO', margin, 20);
    y = 36;
  };

  drawHeader();
  pdf.setTextColor(dark[0], dark[1], dark[2]);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('MAYONESA BONLIFE', pageWidth / 2, y, { align: 'center' });
  y += 10;

  const checkPageBreak = (needed: number) => {
    if (y + needed > pageHeight - 18) {
      pdf.addPage();
      y = 20;
    }
  };

  const section = (title: string) => {
    checkPageBreak(14);
    pdf.setFontSize(10.5);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(dark[0], dark[1], dark[2]);
    pdf.text(title, margin, y);
    y += 5.5;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
  };

  const paragraph = (text: string) => {
    const lines = pdf.splitTextToSize(text, contentWidth);
    checkPageBreak(lines.length * 5 + 6);
    pdf.setTextColor(50, 50, 50);
    pdf.text(lines, margin, y);
    y += lines.length * 5 + 7;
  };

  const drawTable = (headers: [string, string], rows: string[][], col2Offset: number) => {
    const col1 = margin;
    const col2 = margin + col2Offset;
    const rowHeight = 7;
    checkPageBreak(rowHeight * (rows.length + 1) + 4);
    const tableTop = y;

    pdf.setFillColor(dark[0], dark[1], dark[2]);
    pdf.rect(margin, y, contentWidth, rowHeight, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.text(headers[0], col1 + 3, y + 5);
    pdf.text(headers[1], col2 + 3, y + 5);
    y += rowHeight;

    rows.forEach((row, i) => {
      const bg = i % 2 === 0 ? [250, 250, 250] : [255, 255, 255];
      pdf.setFillColor(bg[0], bg[1], bg[2]);
      pdf.rect(margin, y, contentWidth, rowHeight, 'F');
      pdf.setTextColor(dark[0], dark[1], dark[2]);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.text(row[0], col1 + 3, y + 5);
      pdf.setFont('helvetica', 'bold');
      pdf.text(row[1], col2 + 3, y + 5);
      y += rowHeight;
    });

    pdf.setDrawColor(200, 200, 200);
    pdf.rect(margin, tableTop, contentWidth, rowHeight * (rows.length + 1), 'S');
    y += 10;
  };

  section('DESCRIPCIÓN GENERAL');
  paragraph(
    'Mayonesa Bonlife es una salsa fría obtenida mediante una emulsión de aceite vegetal, huevo y vinagre, además de otros ingredientes que le proporcionan su sabor característico.'
  );

  section('CARACTERÍSTICAS');
  paragraph(
    'Es una masa homogénea, semisólida, libre de grumos o partículas extrañas. De fácil aplicación, incorporación y mezclado con múltiples ingredientes, lo que facilita su utilización en diversos platos. Tiene un agradable olor y sabor característico.'
  );

  section('APLICACIONES');
  paragraph('Excelente para su uso en preparación de aderezos de ensaladas, salsas, y elaboración de platos diversos.');

  section('COMPOSICIÓN');
  paragraph('Aceite de soya, huevo, vinagre, agua, sal, azúcar, limón, mostaza, sorbato de potasio, cebolla, ajo, EDTA, pimienta.');

  section('ESPECIFICACIONES TÉCNICAS');
  const specRows: Array<[string, string]> = [
    ['Contenido de Humedad', '17% máx.'],
    ['Porcentaje de Grasa', '70% mín.'],
    ['pH', '3 – 4.0'],
    ['Olor/Sabor', '5 / 5'],
  ];
  drawTable(['PARÁMETRO', 'VALOR'], specRows, 90);

  section('REGULACIONES LEGALES');
  paragraph('Mayonesa Bonlife cumple con las normas: ISO 9001-2015, BPM-EQA, NORDOM 540.');

  section('ALMACENAMIENTO');
  paragraph(
    'A pesar de ser un producto especial, está sujeto a las mismas consideraciones de almacenamiento y manejo de un producto graso; por lo tanto, es necesario almacenarlo en un lugar fresco y seco (temperatura ambiente), y no debe ser expuesto al sol o al calor, ya que las altas temperaturas disminuyen su consistencia y estabilidad oxidativa.'
  );

  section('VIDA ÚTIL');
  paragraph(
    'Si el envase no ha sido abierto, tiene 6 meses desde la fecha de producción; una vez abierto se recomienda su refrigeración.'
  );

  section('PAÍS DE ORIGEN');
  paragraph('República Dominicana.');

  section('EMPAQUE');
  paragraph(
    'Tarros de 1 galón (8 lb), distribuidos por Bonlife en cajas de 4 x 1 galón. También disponible en sachets individuales de 12 ml, 144 por caja (12 packs x 12 sachets).'
  );

  section('TRANSPORTE');
  paragraph('En camiones cerrados.');

  section('DATOS NUTRICIONALES (por porción)');
  const nutritionRows: Array<[string, string]> = [
    ['Calorías', '100'],
    ['Grasa Total', '11 g (10%)'],
    ['Grasa Saturada', '2 g (10%)'],
    ['Grasas Trans', '0 g'],
    ['Colesterol', '10 mg (3%)'],
    ['Sodio', '75 mg (3%)'],
    ['Proteína', '0 g'],
    ['Carbohidratos Totales', '0 g (0%)'],
    ['Vitamina A / Vitamina C / Calcio', '0% / 0% / 0%'],
  ];
  drawTable(['NUTRIENTE', 'VALOR'], nutritionRows, 90);

  pdf.setFontSize(7.5);
  pdf.setFont('helvetica', 'italic');
  pdf.setTextColor(gray[0], gray[1], gray[2]);
  const nutritionNote = pdf.splitTextToSize(
    '*Los porcentajes de valores diarios están basados en una dieta de 2,000 calorías.',
    contentWidth
  );
  checkPageBreak(nutritionNote.length * 4 + 6);
  pdf.text(nutritionNote, margin, y);
  y += nutritionNote.length * 4 + 8;

  section('ALÉRGENOS');
  paragraph('Presencia (como componente añadido) de los siguientes alérgenos y productos de los mismos:');

  const allergenRows: string[][] = [
    ['Trigo (cereales con gluten)', 'No'],
    ['Crustáceos', 'No'],
    ['Huevos', 'Sí'],
    ['Pescado', 'No'],
    ['Maní/Cacahuates', 'No'],
    ['Soya', 'Sí — lecitina de soya'],
    ['Leche', 'No'],
    ['Frutos secos (nueces, almendras)', 'No'],
  ];
  drawTable(['ALÉRGENO', 'PRESENCIA'], allergenRows, 75);

  pdf.setFontSize(7.5);
  pdf.setFont('helvetica', 'italic');
  pdf.setTextColor(gray[0], gray[1], gray[2]);
  const allergenNote = pdf.splitTextToSize('* El aceite de soya no es considerado alérgeno.', contentWidth);
  checkPageBreak(allergenNote.length * 4 + 6);
  pdf.text(allergenNote, margin, y);
  y += allergenNote.length * 4 + 8;

  // Closing note
  pdf.setFontSize(7.5);
  pdf.setFont('helvetica', 'italic');
  pdf.setTextColor(gray[0], gray[1], gray[2]);
  const closingNote = pdf.splitTextToSize(
    'La información contenida en esta ficha refleja las especificaciones estándar del producto y puede estar sujeta a variaciones menores de lote a lote. Solicite el certificado de análisis del lote correspondiente para uso regulatorio o de auditoría.',
    contentWidth
  );
  checkPageBreak(closingNote.length * 4 + 30);
  pdf.text(closingNote, margin, y);
  y += closingNote.length * 4 + 10;

  // Footer contact
  checkPageBreak(22);
  pdf.setFillColor(dark[0], dark[1], dark[2]);
  pdf.rect(margin, y, contentWidth, 22, 'F');
  pdf.setTextColor(gold[0], gold[1], gold[2]);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Contacto', pageWidth / 2, y + 9, { align: 'center' });
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.text('+1 (829) 987-6764  |  ventas@bonlifeoil.com  |  bonlifeoil.com', pageWidth / 2, y + 17, { align: 'center' });

  pdf.save('Ficha-Tecnica-Mayonesa-Bonlife.pdf');
};
