import React from 'react';
import { motion } from 'framer-motion';

import DashboardHeader from '../dashboard/DashboardHeader';
import DashboardStats from '../dashboard/DashboardStats';
import DashboardQuickActions from '../dashboard/DashboardQuickActions';
import DashboardRecentApplications from '../dashboard/DashboardRecentApplications';
import DashboardSavedJobsPreview from '../dashboard/DashboardSavedJobsPreview';
import DashboardInterviewPrepPreview from '../dashboard/DashboardInterviewPrepPreview';
import DashboardProfileStrength from '../dashboard/DashboardProfileStrength';

import  useAuth  from '../../hooks/useAuth';
import { fadeUpDelayed } from '../../utils/motion';

const MotionDiv = motion.div;
const MotionSection = motion.section;

const Dashboard = () => {
  const { user } = useAuth();

  const userName = user?.name?.trim() || 'there';

  return (
    <div className="space-y-8">
      <MotionDiv variants={fadeUpDelayed(0)} initial="hidden" animate="visible">
        <DashboardHeader userName={userName} />
      </MotionDiv>

      <MotionSection
        aria-label="Dashboard statistics"
        variants={fadeUpDelayed(0.05)}
        initial="hidden"
        animate="visible"
      >
        <DashboardStats />
      </MotionSection>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <MotionSection
            aria-label="Recent applications"
            variants={fadeUpDelayed(0.1)}
            initial="hidden"
            animate="visible"
          >
            <DashboardRecentApplications />
          </MotionSection>

          <MotionSection
            aria-label="Quick actions"
            variants={fadeUpDelayed(0.15)}
            initial="hidden"
            animate="visible"
          >
            <DashboardQuickActions />
          </MotionSection>
        </div>

        <div className="space-y-6 xl:sticky xl:top-24">
          <MotionSection
            aria-label="Saved jobs preview"
            variants={fadeUpDelayed(0.2)}
            initial="hidden"
            animate="visible"
          >
            <DashboardSavedJobsPreview />
          </MotionSection>

          <MotionSection
            aria-label="Interview preparation preview"
            variants={fadeUpDelayed(0.25)}
            initial="hidden"
            animate="visible"
          >
            <DashboardInterviewPrepPreview />
          </MotionSection>

          <MotionSection
            aria-label="Profile strength"
            variants={fadeUpDelayed(0.3)}
            initial="hidden"
            animate="visible"
          >
            <DashboardProfileStrength />
          </MotionSection>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;