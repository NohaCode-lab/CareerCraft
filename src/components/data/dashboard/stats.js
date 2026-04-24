import {
  Briefcase,
  Bookmark,
  Send,
  CalendarClock,
} from 'lucide-react';

import { APPLICATION_STATUSES } from '../applications/statuses';

const countByStatus = (applications = [], status) => {
  if (!Array.isArray(applications)) return 0;

  return applications.filter(
    (application) =>
      application?.status?.toLowerCase() === status.toLowerCase()
  ).length;
};

export const dashboardStatsConfig = [
  {
    id: 'available-jobs',
    title: 'Available Jobs',
    getValue: ({ jobs = [] }) => (Array.isArray(jobs) ? jobs.length : 0),
    description: 'Jobs currently in your feed',
    icon: Briefcase,
  },
  {
    id: 'saved-jobs',
    title: 'Saved Jobs',
    getValue: ({ savedJobs = [] }) =>
      Array.isArray(savedJobs) ? savedJobs.length : 0,
    description: 'Jobs you bookmarked',
    icon: Bookmark,
  },
  {
    id: 'applications',
    title: 'Applications',
    getValue: ({ applications = [] }) =>
      Array.isArray(applications) ? applications.length : 0,
    description: 'Jobs you applied to',
    icon: Send,
  },
  {
    id: 'interviews',
    title: 'Interviews',
    getValue: ({ applications = [] }) =>
      countByStatus(applications, APPLICATION_STATUSES.INTERVIEW),
    description: 'Interview stages',
    icon: CalendarClock,
  },
];