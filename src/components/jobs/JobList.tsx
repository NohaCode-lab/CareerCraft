import React from 'react';
import JobCard from './JobCard';
import { Job } from '../../hooks/useJobs';
import useLanguage from '../../hooks/useLanguage';
import { t } from '../../utils/i18n';

interface JobListProps {
  jobs?: Job[];
  onSave?: (id: string | number) => void;
  onApply?: (id: string | number) => void;
  onSelect?: (job: Job) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs = [], onSave, onApply, onSelect }) => {
  const { language } = useLanguage();

  if (!jobs.length) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-colors duration-200 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-lg dark:backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{t('noJobsFoundTitle', language)}</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {t('noJobsFoundDesc', language)}
        </p>
      </section>
    );
  }

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onSave={onSave}
          onApply={onApply}
          onSelect={onSelect}
        />
      ))}
    </section>
  );
};

export default JobList;
