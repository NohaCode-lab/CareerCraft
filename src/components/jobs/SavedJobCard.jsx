import React from 'react';
import { BookmarkX, Briefcase, Clock, ExternalLink, MapPin } from 'lucide-react';

const SavedJobCard = ({ job, onUnsave, onApply, onSelect }) => {
  if (!job) return null;

  return (
    <article className="group rounded-3xl border border-white/10 bg-white/3 p-5 transition-all duration-300 hover:border-indigo-400/30 hover:shadow-lg hover:shadow-indigo-500/10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white transition group-hover:text-indigo-300">
            {job.title}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            {job.company} • {job.source}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onUnsave?.(job.id)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-300 transition hover:bg-rose-500/20 hover:text-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400/40"
          aria-label="Remove saved job"
        >
          <BookmarkX className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className="flex items-center gap-1 rounded-lg bg-white/5 px-2 py-1 text-slate-400">
          <MapPin className="h-3 w-3" />
          {job.location}
        </span>

        <span className="flex items-center gap-1 rounded-lg bg-white/5 px-2 py-1 text-slate-400">
          <Briefcase className="h-3 w-3" />
          {job.employmentType}
        </span>

        <span className="flex items-center gap-1 rounded-lg bg-white/5 px-2 py-1 text-slate-400">
          <Clock className="h-3 w-3" />
          {job.postedAt}
        </span>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onSelect?.(job)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" />
          View
        </button>

        <button
          type="button"
          onClick={() => onApply?.(job.id)}
          disabled={job.isApplied}
          className={[
            'flex-1 rounded-xl px-4 py-2 text-sm font-medium transition',
            job.isApplied
              ? 'cursor-not-allowed bg-emerald-500/20 text-emerald-400'
              : 'bg-indigo-500 text-white hover:bg-indigo-600',
          ].join(' ')}
        >
          {job.isApplied ? 'Applied' : 'Apply'}
        </button>
      </div>
    </article>
  );
};

export default SavedJobCard;