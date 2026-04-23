import {
  Briefcase,
  Bookmark,
  Send,
  CalendarClock,
} from 'lucide-react';

export const dashboardStatsConfig = [
  {
    id: 'available-jobs',
    title: 'Available Jobs',
    getValue: ({ jobs }) => jobs.length,
    description: 'Jobs currently in your feed',
    icon: Briefcase,
  },
  {
    id: 'saved-jobs',
    title: 'Saved Jobs',
    getValue: ({ savedJobs }) => savedJobs.length,
    description: 'Jobs you bookmarked',
    icon: Bookmark,
  },
  {
    id: 'applications',
    title: 'Applications',
    getValue: ({ applications }) => applications.length,
    description: 'Jobs you applied to',
    icon: Send,
  },
  {
    id: 'interviews',
    title: 'Interviews',
    getValue: ({ applications }) =>
      applications.filter(
        (app) =>
          app.status?.toLowerCase() === 'interview' ||
          app.status?.toLowerCase() === 'interview scheduled'
      ).length,
    description: 'Interview stages',
    icon: CalendarClock,
  },
];