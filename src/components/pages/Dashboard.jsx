
import MainLayout from '../layout/MainLayout';
import PageHeader from '../layout/PageHeader';

const Dashboard = () => {
  return (
    <MainLayout pageTitle="Dashboard">
      <PageHeader
        title="Dashboard"
        description="Track your progress, monitor applications, and manage your career journey from one place."
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">Dashboard content will be added here.</p>
      </div>
    </MainLayout>
  );
};

export default Dashboard;