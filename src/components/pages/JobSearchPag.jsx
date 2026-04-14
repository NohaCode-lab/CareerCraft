
import MainLayout from '../layout/MainLayout';
import PageHeader from '../layout/PageHeader';

const JobSearchPage = () => {
  return (
    <MainLayout pageTitle="Job Search">
      <PageHeader
        title="Job Search"
        description="Search for roles, filter opportunities, and discover jobs that match your goals."
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">Job Search content will be added here.</p>
      </div>
    </MainLayout>
  );
};

export default JobSearchPage;