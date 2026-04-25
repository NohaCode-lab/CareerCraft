import PageHeader from '../layout/PageHeader';
import CVForm from '../cv/CVForm';
import CVPreview from '../cv/CVPreview';
import CVDownload from '../cv/CVDownload';
import TemplateSwitcher from '../cv/TemplateSwitcher';
import ATSAnalyzer from '../cv/ATSAnalyzer';
import DragDropSections from '../cv/DragDropSections';

const CVBuilderPage = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="CV Builder"
        description="Create, edit, analyze, and export a professional ATS-friendly resume."
      />

      <div className="grid gap-6 xl:grid-cols-12">
        <section className="space-y-6 xl:col-span-5" aria-label="CV editing tools">
          <CVForm />
          <TemplateSwitcher />
          <DragDropSections />
          <ATSAnalyzer />
        </section>

        <section className="space-y-6 xl:col-span-7" aria-label="CV preview and export">
          <div className="space-y-6 xl:sticky xl:top-24">
            <CVPreview />
            <CVDownload />
          </div>
        </section>
      </div>
    </div>
  );
};

export default CVBuilderPage;