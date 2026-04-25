import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const DEFAULT_PDF_FILE_NAME = 'career-craft-document.pdf';

const PDF_OPTIONS = {
  orientation: 'p',
  unit: 'mm',
  format: 'a4',
};

const CANVAS_OPTIONS = {
  scale: 2,
  useCORS: true,
  backgroundColor: '#ffffff',
};

export const exportElementToPdf = async (
  element,
  fileName = DEFAULT_PDF_FILE_NAME
) => {
  if (!element) {
    throw new Error('Target element is required for PDF export.');
  }

  const safeFileName = fileName.trim() || DEFAULT_PDF_FILE_NAME;

  const canvas = await html2canvas(element, CANVAS_OPTIONS);

  const imageData = canvas.toDataURL('image/png');
  const pdf = new jsPDF(
    PDF_OPTIONS.orientation,
    PDF_OPTIONS.unit,
    PDF_OPTIONS.format
  );

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imageWidth = pageWidth;
  const imageHeight = (canvas.height * imageWidth) / canvas.width;

  let position = 0;
  let remainingHeight = imageHeight;

  pdf.addImage(imageData, 'PNG', 0, position, imageWidth, imageHeight);
  remainingHeight -= pageHeight;

  while (remainingHeight > 0) {
    position = remainingHeight - imageHeight;
    pdf.addPage();
    pdf.addImage(imageData, 'PNG', 0, position, imageWidth, imageHeight);
    remainingHeight -= pageHeight;
  }

  pdf.save(safeFileName);
};