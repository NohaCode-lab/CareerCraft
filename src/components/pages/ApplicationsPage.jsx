
import MainLayout from '../layout/MainLayout';
import PageHeader from '../layout/PageHeader';

const ApplicationsPage = () => {
  return (
    <MainLayout pageTitle="Applications">
      <PageHeader
        title="Applications"
        description="Organize your job applications, track statuses, and manage follow-ups efficiently."
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">Applications content will be added here.</p>
      </div>
    </MainLayout>
  );
};

export default ApplicationsPage;