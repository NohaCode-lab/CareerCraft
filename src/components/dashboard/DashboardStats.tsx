import React, { useMemo } from 'react';
import StatCard from '../ui/StatCard';
import useJobs from '../../hooks/useJobs';
import useApplications from '../../hooks/useApplications';
import { dashboardStatsConfig } from '../../data/dashboard/stats';
import useLanguage from '../../hooks/useLanguage';
import { t } from '../../utils/i18n';

const DashboardStats: React.FC = () => {
  const { language } = useLanguage();
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

        if (rawValue === null || rawValue === undefined) {
          value = '0';
        } else {
          value = String(rawValue);
        }
      } catch {
        value = '0';
      }

      return {
        id: item.id,
        title: t(item.titleKey, language),
        value,
        description: t(item.descKey, language),
        icon: item.icon,
      };
    });
  }, [applications, jobs, savedJobs, language]);

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
            className="text-lg font-semibold text-slate-900 dark:text-white"
          >
            {t('overviewTitle', language)}
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {t('overviewDesc', language)}
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
