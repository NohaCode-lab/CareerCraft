import React from 'react';
import DashboardHeader from '../dashboard/DashboardHeader';
import DashboardStats from '../dashboard/DashboardStats';
import DashboardQuickActions from '../dashboard/DashboardQuickActions';
import DashboardRecentApplications from '../dashboard/DashboardRecentApplications';
import DashboardSavedJobsPreview from '../dashboard/DashboardSavedJobsPreview';
import DashboardProfileStrength from '../dashboard/DashboardProfileStrength';
import DashboardInterviewPrepPreview from '../dashboard/DashboardInterviewPrepPreview';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <DashboardHeader />

      <DashboardStats />

      <DashboardQuickActions />

      <div className="grid gap-8 xl:grid-cols-12">
        <div className="space-y-8 xl:col-span-8">
          <DashboardRecentApplications />

          <DashboardInterviewPrepPreview />
        </div>

        <div className="space-y-8 xl:col-span-4">
          <DashboardProfileStrength />

          <DashboardSavedJobsPreview />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
