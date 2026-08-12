import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';
import EmptyState from '../ui/EmptyState';
import useJobs from '../../hooks/useJobs';
import { ROUTES } from '../../config/routes';
import useLanguage from '../../hooks/useLanguage';
import { t } from '../../utils/i18n';
import { Job } from '../../types';

const DashboardSavedJobsPreview: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { savedJobs = [] } = useJobs();

  const previewJobs = useMemo(() => savedJobs.slice(0, 4), [savedJobs]);

  if (!previewJobs.length) {
    return (
      <Card
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900/80"
        aria-label={t('savedJobsPreviewTitle', language)}
      >
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t('savedJobsPreviewTitle', language)}</h2>
        </div>

        <EmptyState
          title={t('noSavedJobsYet', language)}
          description={t('noSavedJobsDesc', language)}
          action={
            <Button onClick={() => navigate(ROUTES.JOB_SEARCH)}>
              {t('browseJobs', language)}
            </Button>
          }
        />
      </Card>
    );
  }

  return (
    <Card
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900/80"
      aria-label={t('savedJobsPreviewTitle', language)}
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{t('savedJobsPreviewTitle', language)}</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {t('savedJobsPreviewDesc', language)}
          </p>
        </div>

        <Button
          variant="secondary"
          onClick={() => navigate(ROUTES.SAVED_JOBS)}
          aria-label="View all saved jobs"
        >
          {t('viewAll', language)}
        </Button>
      </div>

      <div className="space-y-4">
        {previewJobs.map((job: Job, index: number) => {
          const title = job.title || 'Job';
          const company = job.company || 'Company';
          const location = job.location || '';

          return (
            <div
              key={job.id || `${title}-${company}-${index}`}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-800/60"
            >
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{company}</p>
              {location && <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{location}</p>}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default DashboardSavedJobsPreview;
