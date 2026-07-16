import jsPDF from 'jspdf';

export const generateMargarinaFichaTecnica = async () => {
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
  pdf.text('MARGARINA BONLIFE', pageWidth / 2, y, { align: 'center' });
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

  section('DESCRIPCIÓN GENERAL');
  paragraph(
    'Margarina Bonlife es un producto elaborado con aceites y grasas vegetales de alta calidad, con aditivos grado alimenticio (emulsificantes, conservantes, saborizantes y colorantes), que aseguran las condiciones físico-químicas y bacteriológicas del producto.'
  );

  section('CARACTERÍSTICAS');
  paragraph(
    'Margarina Bonlife es sólida a temperatura ambiente, de apariencia homogénea, consistencia plástica, fácil aplicación, incorporación y mezclado con los demás alimentos. Confiere una corteza uniforme de buen color, olor y sabor característico, proporciona esponjosidad y uniformidad en la miga de panes y bizcochos, dando una mejor retención que alarga la vida de anaquel de los productos.'
  );

  section('APLICACIONES');
  paragraph(
    'Gracias al balance homogéneo de sus ingredientes, Margarina Bonlife permite la combinación exitosa de los mismos, aportando las bondades requeridas para el éxito en productos de pastelería, repostería, cremas y rellenos, generando excelentes características de sabor, color, olor, volumen, consistencia, apariencia y miga fina uniforme en el producto final.'
  );

  section('COMPOSICIÓN');
  paragraph(
    'Aceites vegetales refinados (palma, soya), agua, sal, sólidos lácteos no grasos. Emulsificantes: lecitina de soya y mono- y diglicéridos destilados, EDTA (estabilizante). Preservantes: benzoato de sodio y sorbato de potasio. Aromas y saborizantes artificiales de mantequilla y leche. Palmitato de vitamina A y betacaroteno (color). Antioxidantes: BHT y ácido cítrico.'
  );

  // Especificaciones Técnicas table
  section('ESPECIFICACIONES TÉCNICAS');

  const specRows: Array<[string, string]> = [
    ['Acidez (FFA)', '0.3%'],
    ['Sal', '0.25 – 0.35%'],
    ['Índice de Peróxido', '1 meq O2/kg máx.'],
    ['Índice de Yodo', '45 – 55'],
    ['Punto de Fusión', '35 – 39 °C'],
    ['Estabilidad Oxidativa (110 °C)', '20 horas mín.'],
    ['Olor/Sabor', '5 / 5'],
  ];

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

  drawTable(['PARÁMETRO', 'VALOR'], specRows, 90);

  section('REGULACIONES LEGALES');
  paragraph(
    'Margarina Bonlife, en sus componentes grasos y aditivos, cumple con las normas internacionales y nacionales de referencia del sector: AOCS / FDA / NORDOM / ISO 9001-2008.'
  );

  section('ALMACENAMIENTO');
  paragraph(
    'A pesar de ser un producto especial, está sujeto a las mismas consideraciones de almacenamiento y manejo de un producto graso; por lo tanto, es necesario almacenarlo en un lugar fresco y seco (temperatura ambiente), y no debe ser expuesto al sol o al calor, ya que las altas temperaturas disminuyen su consistencia y estabilidad oxidativa.'
  );

  section('VIDA ÚTIL');
  paragraph('Mejor consumir antes de 6 meses desde la fecha de producción, almacenado en el envase sin abrir.');

  section('PAÍS DE ORIGEN');
  paragraph('República Dominicana.');

  section('EMPAQUE');
  paragraph('Disponible en tarrinas de 28 lb.');

  section('ALÉRGENOS');
  paragraph('Presencia (como componente añadido) de los siguientes alérgenos y productos de los mismos:');

  const allergenRows: string[][] = [
    ['Trigo (cereales con gluten)', 'No'],
    ['Crustáceos', 'No'],
    ['Huevos', 'No'],
    ['Pescado', 'No'],
    ['Maní/Cacahuates', 'No'],
    ['Soya', 'Sí — lecitina de soya'],
    ['Leche', 'Sí — leche en polvo, suero de leche'],
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

  pdf.save('Ficha-Tecnica-Margarina-Bonlife.pdf');
};
