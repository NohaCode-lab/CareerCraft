import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const buttonBaseClasses =
  'inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60';

const primaryButtonClasses =
  'bg-indigo-600 text-white shadow-sm hover:bg-indigo-700';

const secondaryButtonClasses =
  'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50';

const CVDownload = ({
  targetId = 'cv-preview',
  fileName = 'career-craft-cv.pdf',
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    const targetElement = document.getElementById(targetId);

    if (!targetElement) {
      setError('CV preview element was not found.');
      return;
    }

    try {
      setIsDownloading(true);
      setError('');

      const canvas = await html2canvas(targetElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: targetElement.scrollWidth,
      });

      const imageData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

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

      pdf.save(fileName);
    } catch (downloadError) {
      console.error('Failed to download CV:', downloadError);
      setError('Failed to export PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="card-base p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="section-title">Download CV</h2>
          <p className="section-subtitle mt-1">
            Export your CV as a professional PDF file or print it directly.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handlePrint}
            disabled={isDownloading}
            className={`${buttonBaseClasses} ${secondaryButtonClasses}`}
          >
            Print CV
          </button>

          <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            className={`${buttonBaseClasses} ${primaryButtonClasses}`}
          >
            {isDownloading ? 'Generating PDF...' : 'Download PDF'}
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
};

export default CVDownload;