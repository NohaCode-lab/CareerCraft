
import MainLayout from '../layout/MainLayout';
import PageHeader from '../layout/PageHeader';

const CVBuilderPage = () => {
  return (
    <MainLayout pageTitle="CV Builder">
      <PageHeader
        title="CV Builder"
        description="Create, edit, and export a professional ATS-friendly resume."
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">CV Builder content will be added here.</p>
      </div>
    </MainLayout>
  );
};

export default CVBuilderPage;