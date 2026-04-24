import React from "react";
import { Bookmark, MapPin, Briefcase, Clock, Home, TrendingUp } from "lucide-react";

const formatSalary = (salaryRange) => {
  if (!salaryRange) return "Salary not specified";

  const { min, max, currency } = salaryRange;

  if (min && max) return `${min.toLocaleString()} - ${max.toLocaleString()} ${currency}`;
  if (min) return `From ${min.toLocaleString()} ${currency}`;
  if (max) return `Up to ${max.toLocaleString()} ${currency}`;

  return "Salary not specified";
};

const JobCard = ({ job, onSave, onApply, onSelect }) => {
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

  return (
    <article className="group relative rounded-3xl border border-white/10 bg-white/3 p-5 transition-all duration-300 hover:border-indigo-400/30 hover:shadow-lg hover:shadow-indigo-500/10">
      
      {/* Top */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-white transition group-hover:text-indigo-300">
            {title}
          </h3>
          <p className="text-sm text-slate-400">{company}</p>
        </div>

        <button
          onClick={() => onSave?.(id)}
          className={`flex h-10 w-10 items-center justify-center rounded-xl transition
            ${
              isSaved
                ? "bg-indigo-500 text-white"
                : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
        >
          <Bookmark className="h-4 w-4" />
        </button>
      </div>

      {/* Meta */}
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className="flex items-center gap-1 rounded-lg bg-white/5 px-2 py-1 text-slate-400">
          <MapPin className="h-3 w-3" />
          {location}
        </span>

        <span className="flex items-center gap-1 rounded-lg bg-white/5 px-2 py-1 text-slate-400">
          <Home className="h-3 w-3" />
          {workMode}
        </span>

        <span className="flex items-center gap-1 rounded-lg bg-white/5 px-2 py-1 text-slate-400">
          <Briefcase className="h-3 w-3" />
          {employmentType}
        </span>

        <span className="flex items-center gap-1 rounded-lg bg-white/5 px-2 py-1 text-slate-400">
          <TrendingUp className="h-3 w-3" />
          {seniority}
        </span>

        <span className="flex items-center gap-1 rounded-lg bg-white/5 px-2 py-1 text-slate-400">
          <Clock className="h-3 w-3" />
          {postedAt}
        </span>
      </div>

      {/* Salary */}
      <p className="mt-3 text-sm text-slate-300">
        {formatSalary(salaryRange)}
      </p>

      {/* Actions */}
      <div className="mt-5 flex items-center gap-2">
        <button
          onClick={() => onSelect?.(job)}
          className="flex-1 rounded-xl bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          View
        </button>

        <button
          onClick={() => onApply?.(id)}
          disabled={isApplied}
          className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition
            ${
              isApplied
                ? "cursor-not-allowed bg-emerald-500/20 text-emerald-400"
                : "bg-indigo-500 text-white hover:bg-indigo-600"
            }`}
        >
          {isApplied ? "Applied" : "Apply"}
        </button>
      </div>
    </article>
  );
};

export default JobCard;