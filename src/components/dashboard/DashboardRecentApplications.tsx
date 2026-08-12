import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';
import EmptyState from '../ui/EmptyState';
import Badge from '../ui/Badge';
import useApplications from '../../hooks/useApplications';
import { ROUTES } from '../../config/routes';
import useLanguage from '../../hooks/useLanguage';
import { t } from '../../utils/i18n';

import { Application } from '../../types';

const getApplicationTimestamp = (application: Application): number => {
  return new Date(application.appliedAt || application.date || application.createdAt || 0).getTime();
};

const formatApplicationDate = (value: unknown, lang: string): string => {
  if (!value) {
    return '';
  }

  const parsedDate = new Date(value as string | number | Date);

  if (Number.isNaN(parsedDate.getTime())) {
    return '';
  }

  const localeMap: Record<string, string> = {
    en: 'en-US',
    de: 'de-DE',
    ar: 'ar-SA',
  };

  return parsedDate.toLocaleDateString(localeMap[lang] || 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const DashboardRecentApplications: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { applications = [] } = useApplications();

  const recentApplications = useMemo(() => {
    return [...applications]
      .sort((a, b) => getApplicationTimestamp(b) - getApplicationTimestamp(a))
      .slice(0, 5);
  }, [applications]);

  if (!recentApplications.length) {
    return (
      <Card
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900/80"
        aria-label={t('recentApplicationsTitle', language)}
      >
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            {t('recentApplicationsTitle', language)}
          </h2>
        </div>

        <EmptyState
          title={t('noRecentApplications', language)}
          description={t('recentApplicationsDesc', language)}
          action={
            <Button onClick={() => navigate(ROUTES.APPLICATIONS)}>
              {t('view', language)} {t('applications', language)}
            </Button>
          }
        />
      </Card>
    );
  }

  return (
    <Card
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900/80"
      aria-label={t('recentApplicationsTitle', language)}
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            {t('recentApplicationsTitle', language)}
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {t('recentApplicationsDesc', language)}
          </p>
        </div>

        <Button
          variant="secondary"
          onClick={() => navigate(ROUTES.APPLICATIONS)}
          aria-label="View all applications"
        >
          {t('view', language)} {t('open', language)}
        </Button>
      </div>

      <div className="space-y-4">
        {recentApplications.map((application: Application, index: number) => {
          const title = application.role || application.title || 'Role';
          const company = application.company || 'Company';
          const status = application.status || 'Applied';
          const appliedDate = formatApplicationDate(
            application.appliedAt || application.date,
            language
          );

          return (
            <div
              key={application.id || `${title}-${company}-${index}`}
              className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between dark:border-white/10 dark:bg-slate-800/60"
            >
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{company}</p>
              </div>

              <div className="flex items-center gap-3">
                <Badge>{t(status.toLowerCase(), language) || status}</Badge>
                {appliedDate && <span className="text-xs text-slate-500 dark:text-slate-400">{appliedDate}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default DashboardRecentApplications;
