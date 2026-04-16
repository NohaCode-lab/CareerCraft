
import React, { useMemo } from 'react';
import { Briefcase, Bookmark, FileText, Trophy } from 'lucide-react';
import StatCard from '../ui/StatCard';
import { useJobs } from '../../hooks/useJobs';
import { useApplications } from '../../hooks/useApplications';

const DashboardStats = () => {
  const { savedJobs = [], jobs = [] } = useJobs();
  const { applications = [] } = useApplications();

  const stats = useMemo(() => {
    const interviewCount = applications.filter(
      (application) =>
        application.status?.toLowerCase() === 'interview' ||
        application.status?.toLowerCase() === 'interview scheduled'
    ).length;

    return [
      {
        title: 'Saved Jobs',
        value: savedJobs.length,
        description: 'Opportunities bookmarked for later',
        icon: Bookmark,
      },
      {
        title: 'Applications',
        value: applications.length,
        description: 'Roles you have already applied to',
        icon: Briefcase,
      },
      {
        title: 'Interviews',
        value: interviewCount,
        description: 'Upcoming or active interview stages',
        icon: Trophy,
      },
      {
        title: 'Available Jobs',
        value: jobs.length,
        description: 'Jobs currently in your local feed',
        icon: FileText,
      },
    ];
  }, [applications, jobs.length, savedJobs.length]);

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
        />
      ))}
    </section>
  );
};

export default DashboardStats;