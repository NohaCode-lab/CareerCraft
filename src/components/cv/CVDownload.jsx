
import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CVDownload = ({ targetId = 'cv-preview' }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    const targetElement = document.getElementById(targetId);

    if (!targetElement) {
      return;
    }

    try {
      setIsDownloading(true);

      const canvas = await html2canvas(targetElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const imageData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = 210;
      const pdfHeight = 297;

      const imageWidth = pdfWidth;
      const imageHeight = (canvas.height * imageWidth) / canvas.width;

      let heightLeft = imageHeight;
      let position = 0;

      pdf.addImage(imageData, 'PNG', 0, position, imageWidth, imageHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imageHeight;
        pdf.addPage();
        pdf.addImage(imageData, 'PNG', 0, position, imageWidth, imageHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save('career-craft-cv.pdf');
    } catch (error) {
      console.error('Failed to download CV:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="card-base p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="section-title">Download CV</h2>
          <p className="section-subtitle mt-1">
            Export your CV as a professional PDF file.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDownload}
          disabled={isDownloading}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isDownloading ? 'Generating PDF...' : 'Download PDF'}
        </button>
      </div>
    </div>
  );
};

export default CVDownload;