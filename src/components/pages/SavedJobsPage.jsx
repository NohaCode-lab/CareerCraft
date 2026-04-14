
import MainLayout from '../layout/MainLayout';
import PageHeader from '../layout/PageHeader';

const SavedJobsPage = () => {
  return (
    <MainLayout pageTitle="Saved Jobs">
      <PageHeader
        title="Saved Jobs"
        description="Review the jobs you saved and move the best opportunities into your application workflow."
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">Saved Jobs content will be added here.</p>
      </div>
    </MainLayout>
  );
};

export default SavedJobsPage;