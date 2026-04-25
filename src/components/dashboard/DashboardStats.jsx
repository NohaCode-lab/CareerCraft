import React, { useMemo } from 'react';
import StatCard from '../ui/StatCard';
import useJobs from '../../hooks/useJobs';
import useApplications from '../../hooks/useApplications';
import { dashboardStatsConfig } from '../../data/dashboard/stats';

const DashboardStats = () => {
  const { savedJobs = [], jobs = [] } = useJobs();
  const { applications = [] } = useApplications();

  const stats = useMemo(() => {
    const sourceData = {
      jobs: Array.isArray(jobs) ? jobs : [],
      savedJobs: Array.isArray(savedJobs) ? savedJobs : [],
      applications: Array.isArray(applications) ? applications : [],
    };

    if (!Array.isArray(dashboardStatsConfig) || dashboardStatsConfig.length === 0) {
      return [];
    }

    return dashboardStatsConfig.map((item) => {
      let value = '0';

      try {
        const rawValue = item.getValue?.(sourceData);

        if (rawValue === null || rawValue === undefined || rawValue === '') {
          value = '0';
        } else {
          value = rawValue;
        }
      } catch {
        value = '0';
      }

      return {
        id: item.id,
        title: item.title,
        value,
        description: item.description,
        icon: item.icon,
      };
    });
  }, [applications, jobs, savedJobs]);

  if (!stats.length) {
    return null;
  }

  return (
    <section
      className="space-y-4"
      aria-labelledby="dashboard-stats-heading"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2
            id="dashboard-stats-heading"
            className="text-lg font-semibold text-white"
          >
            Overview
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Track your job search activity and profile momentum in one place.
          </p>
        </div>
      </div>

      <div
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Dashboard statistics"
      >
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default DashboardStats;