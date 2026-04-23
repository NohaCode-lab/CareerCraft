import React from 'react';
import { motion } from 'framer-motion';
import DashboardHeader from '../dashboard/DashboardHeader';
import DashboardStats from '../dashboard/DashboardStats';
import DashboardQuickActions from '../dashboard/DashboardQuickActions';
import DashboardRecentApplications from '../dashboard/DashboardRecentApplications';
import DashboardSavedJobsPreview from '../dashboard/DashboardSavedJobsPreview';
import DashboardInterviewPrepPreview from '../dashboard/DashboardInterviewPrepPreview';
import DashboardProfileStrength from '../dashboard/DashboardProfileStrength';
import { useAuth } from '../../hooks/useAuth';
import { fadeUpDelayed } from '../utils/motion';

const Dashboard = () => {
  const { user } = useAuth();

  const userName = user?.name?.trim() || 'there';

  return (
    <div className="space-y-6">
      <motion.div
        variants={fadeUpDelayed(0)}
        initial="hidden"
        animate="visible"
      >
        <DashboardHeader userName={userName} />
      </motion.div>

      <motion.section
        aria-label="Dashboard statistics"
        variants={fadeUpDelayed(0.05)}
        initial="hidden"
        animate="visible"
      >
        <DashboardStats />
      </motion.section>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <motion.section
            aria-label="Recent applications"
            variants={fadeUpDelayed(0.1)}
            initial="hidden"
            animate="visible"
          >
            <DashboardRecentApplications />
          </motion.section>

          <motion.section
            aria-label="Quick actions"
            variants={fadeUpDelayed(0.15)}
            initial="hidden"
            animate="visible"
          >
            <DashboardQuickActions />
          </motion.section>
        </div>

        <div className="space-y-6">
          <motion.section
            aria-label="Saved jobs preview"
            variants={fadeUpDelayed(0.2)}
            initial="hidden"
            animate="visible"
          >
            <DashboardSavedJobsPreview />
          </motion.section>

          <motion.section
            aria-label="Interview preparation preview"
            variants={fadeUpDelayed(0.25)}
            initial="hidden"
            animate="visible"
          >
            <DashboardInterviewPrepPreview />
          </motion.section>

          <motion.section
            aria-label="Profile strength"
            variants={fadeUpDelayed(0.3)}
            initial="hidden"
            animate="visible"
          >
            <DashboardProfileStrength />
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;