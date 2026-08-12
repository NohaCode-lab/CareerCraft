import React from "react";
import { Bookmark, MapPin, Briefcase, Clock, Home, TrendingUp } from "lucide-react";
import { Job } from "../../hooks/useJobs";
import useLanguage from "../../hooks/useLanguage";
import { t } from "../../utils/i18n";

const formatSalary = (salaryRange: unknown) => {
  if (!salaryRange || typeof salaryRange !== 'object') return typeof salaryRange === 'string' ? salaryRange : '';

  const { min, max, currency = '$' } = salaryRange as { min?: number; max?: number; currency?: string };

  if (min && max) return `${min.toLocaleString()} - ${max.toLocaleString()} ${currency}`;
  if (min) return `From ${min.toLocaleString()} ${currency}`;
  if (max) return `Up to ${max.toLocaleString()} ${currency}`;

  return "";
};

interface JobCardProps {
  job: Job;
  onSave?: (id: string | number) => void;
  onApply?: (id: string | number) => void;
  onSelect?: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onSave, onApply, onSelect }) => {
  const { language } = useLanguage();

  if (!job) return null;

  const {
    id,
    title,
    company,
    location,
    workMode,
    employmentType,
    seniority,
    salaryRange,
    postedAt,
    isSaved,
    isApplied,
  } = job;

  const salaryText = formatSalary(salaryRange);

  return (
    <article className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-white/10 dark:bg-slate-900/80">
      
      {/* Top */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 transition group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-300">
              {title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">{company}</p>
          </div>

          <button
            type="button"
            onClick={() => onSave?.(id)}
            aria-label={isSaved ? t('saved', language) : t('save', language)}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition duration-200
              ${
                isSaved
                  ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/25 ring-1 ring-indigo-400/30"
                  : "border border-slate-200 bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
              }`}
          >
            <Bookmark className="h-4 w-4" />
          </button>
        </div>

        {/* Meta */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {location && (
            <span className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-2.5 py-1 text-slate-600 dark:border-white/5 dark:bg-white/5 dark:text-slate-400">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              {location}
            </span>
          )}

          {workMode && (
            <span className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-2.5 py-1 text-slate-600 dark:border-white/5 dark:bg-white/5 dark:text-slate-400">
              <Home className="h-3.5 w-3.5 text-slate-400" />
              {workMode}
            </span>
          )}

          {employmentType && (
            <span className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-2.5 py-1 text-slate-600 dark:border-white/5 dark:bg-white/5 dark:text-slate-400">
              <Briefcase className="h-3.5 w-3.5 text-slate-400" />
              {employmentType}
            </span>
          )}

          {seniority && (
            <span className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-2.5 py-1 text-slate-600 dark:border-white/5 dark:bg-white/5 dark:text-slate-400">
              <TrendingUp className="h-3.5 w-3.5 text-slate-400" />
              {seniority}
            </span>
          )}

          {postedAt && (
            <span className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-2.5 py-1 text-slate-600 dark:border-white/5 dark:bg-white/5 dark:text-slate-400">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              {postedAt}
            </span>
          )}
        </div>

        {/* Salary */}
        {salaryText && (
          <p className="mt-3 text-sm font-medium text-emerald-600 dark:text-emerald-400">
            {salaryText}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={() => onSelect?.(job)}
          className="flex-1 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 transition duration-200 hover:bg-slate-200 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
        >
          {t('view', language)}
        </button>

        <button
          type="button"
          onClick={() => onApply?.(id)}
          disabled={isApplied}
          className={`flex-1 rounded-2xl px-4 py-2.5 text-sm font-semibold transition duration-200 shadow-md
            ${
              isApplied
                ? "cursor-not-allowed bg-emerald-500/20 text-emerald-700 border border-emerald-500/30 dark:text-emerald-300"
                : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/30 ring-1 ring-indigo-400/30"
            }`}
        >
          {isApplied ? t('applied', language) : t('apply', language)}
        </button>
      </div>
    </article>
  );
};

export default JobCard;
