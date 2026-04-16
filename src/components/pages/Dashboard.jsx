import React from 'react';
import DashboardHeader from '../dashboard/DashboardHeader';
import DashboardStats from '../dashboard/DashboardStats';
import DashboardQuickActions from '../dashboard/DashboardQuickActions';
import DashboardRecentApplications from '../dashboard/DashboardRecentApplications';
import DashboardSavedJobsPreview from '../dashboard/DashboardSavedJobsPreview';
import DashboardInterviewPrepPreview from '../dashboard/DashboardInterviewPrepPreview';
import DashboardProfileStrength from '../dashboard/DashboardProfileStrength';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader userName="Noha" />
      <DashboardStats />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <DashboardRecentApplications />
          <DashboardQuickActions />
        </div>

        <div className="space-y-6">
          <DashboardSavedJobsPreview />
          <DashboardInterviewPrepPreview />
          <DashboardProfileStrength />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;