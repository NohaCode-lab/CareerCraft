import React from 'react';
import PageHeader from '../layout/PageHeader';
import CVForm from '../cv/CVForm';
import CVPreview from '../cv/CVPreview';
import CVDownload from '../cv/CVDownload';
import TemplateSwitcher from '../cv/TemplateSwitcher';
import ATSAnalyzer from '../cv/ATSAnalyzer';
import DragDropSections from '../cv/DragDropSections';

const CVBuilderPage: React.FC = () => {
  return (
    <main
      className="space-y-8"
      aria-labelledby="cv-builder-page-title"
    >
      <PageHeader
        title="CV Builder"
        description="Create, edit, analyze, and export a professional ATS-friendly resume."
      />

      <div className="grid gap-6 xl:grid-cols-12 xl:items-start">
        <aside
          className="space-y-6 xl:col-span-5"
          aria-label="CV editing, template, section order, and ATS analysis tools"
        >
          <CVForm />
          <TemplateSwitcher />
          <DragDropSections />
          <ATSAnalyzer />
        </aside>

        <section
          className="space-y-6 xl:col-span-7"
          aria-label="Live CV preview and PDF export"
        >
          <div className="space-y-6 xl:sticky xl:top-24">
            <CVPreview />
            <CVDownload />
          </div>
        </section>
      </div>
    </main>
  );
};

export default CVBuilderPage;
