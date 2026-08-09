import {
  Briefcase,
  Bookmark,
  Send,
  CalendarClock,
  LucideIcon,
} from 'lucide-react';

import { APPLICATION_STATUSES } from '../applications/statuses';

const countByStatus = (applications: any[] = [], status: string) => {
  if (!Array.isArray(applications)) return 0;

  return applications.filter(
    (application) =>
      application?.status?.toLowerCase() === status.toLowerCase()
  ).length;
};

export interface DashboardStatItem {
  id: string;
  titleKey: string;
  descKey: string;
  getValue: (data: { jobs?: any[]; savedJobs?: any[]; applications?: any[] }) => number;
  icon: LucideIcon;
}

export const dashboardStatsConfig: DashboardStatItem[] = [
  {
    id: 'available-jobs',
    titleKey: 'availableJobsTitle',
    descKey: 'availableJobsDesc',
    getValue: ({ jobs = [] }) => (Array.isArray(jobs) ? jobs.length : 0),
    icon: Briefcase,
  },
  {
    id: 'saved-jobs',
    titleKey: 'savedJobsStatTitle',
    descKey: 'savedJobsStatDesc',
    getValue: ({ savedJobs = [] }) =>
      Array.isArray(savedJobs) ? savedJobs.length : 0,
    icon: Bookmark,
  },
  {
    id: 'applications',
    titleKey: 'applicationsStatTitle',
    descKey: 'applicationsStatDesc',
    getValue: ({ applications = [] }) =>
      Array.isArray(applications) ? applications.length : 0,
    icon: Send,
  },
  {
    id: 'interviews',
    titleKey: 'interviewsStatTitle',
    descKey: 'interviewsStatDesc',
    getValue: ({ applications = [] }) =>
      countByStatus(applications, APPLICATION_STATUSES.INTERVIEW),
    icon: CalendarClock,
  },
];
