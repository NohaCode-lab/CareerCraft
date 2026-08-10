import React from 'react';
import { BookmarkX, Briefcase, Clock, ExternalLink, MapPin } from 'lucide-react';
import { Job } from '../../hooks/useJobs';
import useLanguage from '../../hooks/useLanguage';
import { t } from '../../utils/i18n';

interface SavedJobCardProps {
  job: Job;
  onUnsave?: (id: string | number) => void;
  onApply?: (id: string | number) => void;
  onSelect?: (job: Job) => void;
}

const SavedJobCard: React.FC<SavedJobCardProps> = ({ job, onUnsave, onApply, onSelect }) => {
  const { language } = useLanguage();

  if (!job) return null;

  return (
    <article className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-white/10 dark:bg-slate-900/80">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 transition group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-300">
              {job.title}
            </h3>

            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {job.company} {job.source ? `• ${job.source}` : ''}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onUnsave?.(job.id)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 transition hover:bg-rose-500/20 hover:text-rose-700 dark:text-rose-300 dark:hover:text-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400/40"
            aria-label={t('unsave', language)}
          >
            <BookmarkX className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {job.location && (
            <span className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-2.5 py-1 text-slate-600 dark:border-white/5 dark:bg-white/5 dark:text-slate-400">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              {job.location}
            </span>
          )}

          {job.employmentType && (
            <span className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-2.5 py-1 text-slate-600 dark:border-white/5 dark:bg-white/5 dark:text-slate-400">
              <Briefcase className="h-3.5 w-3.5 text-slate-400" />
              {job.employmentType}
            </span>
          )}

          {job.postedAt && (
            <span className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-2.5 py-1 text-slate-600 dark:border-white/5 dark:bg-white/5 dark:text-slate-400">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              {job.postedAt}
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={() => onSelect?.(job)}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 transition duration-200 hover:bg-slate-200 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <ExternalLink className="h-4 w-4" />
          {t('view', language)}
        </button>

        <button
          type="button"
          onClick={() => onApply?.(job.id)}
          disabled={job.isApplied}
          className={[
            'flex-1 rounded-2xl px-4 py-2.5 text-sm font-semibold transition duration-200 shadow-md',
            job.isApplied
              ? 'cursor-not-allowed bg-emerald-500/20 text-emerald-700 border border-emerald-500/30 dark:text-emerald-300'
              : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/30 ring-1 ring-indigo-400/30',
          ].join(' ')}
        >
          {job.isApplied ? t('applied', language) : t('apply', language)}
        </button>
      </div>
    </article>
  );
};

export default SavedJobCard;
