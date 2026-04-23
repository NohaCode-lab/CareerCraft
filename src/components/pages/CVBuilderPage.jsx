import PageHeader from '../layout/PageHeader';

const CVBuilderPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="CV Builder"
        description="Create, edit, and export a professional ATS-friendly resume."
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">
          CV Builder content will be added here.
        </p>
      </div>
    </div>
  );
};

export default CVBuilderPage;