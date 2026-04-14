
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportElementToPdf = async (element, fileName = 'career-craft-document.pdf') => {
  if (!element) {
    throw new Error('Target element is required for PDF export.');
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
  });

  const imageData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');

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

  pdf.save(fileName);
};