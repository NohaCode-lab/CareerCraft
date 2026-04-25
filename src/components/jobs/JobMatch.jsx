import React from 'react';
import { RotateCcw, Search } from 'lucide-react';
import { jobFilters } from '../../data/jobs/filters';
import { jobTypes } from '../../data/jobs/jobTypes';

const defaultFilters = {
  search: '',
  country: '',
  seniority: '',
  workMode: '',
  employmentType: '',
  savedOnly: false,
  appliedOnly: false,
};

const JobFilters = ({ filters = defaultFilters, onChange, onReset }) => {
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    onChange?.({
      ...filters,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const selectClassName =
    'w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-indigo-400/50 focus:bg-white/10 focus:ring-2 focus:ring-indigo-400/20';

  const labelClassName = 'mb-2 block text-sm font-medium text-slate-300';

  return (
    <section className="rounded-3xl border border-white/10 bg-white/3 p-5 shadow-sm">
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold text-white">Job Filters</h2>
          <p className="mt-1 text-sm text-slate-400">
            Find roles that match your goals faster.
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label className={labelClassName} htmlFor="search">
            Search
          </label>

          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition focus-within:border-indigo-400/50 focus-within:bg-white/10 focus-within:ring-2 focus-within:ring-indigo-400/20">
            <Search className="h-4 w-4 text-slate-500" />

            <input
              id="search"
              name="search"
              type="text"
              value={filters.search}
              onChange={handleInputChange}
              placeholder="Search by title, company, or location"
              className="w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <label className={labelClassName} htmlFor="country">
              Country
            </label>
            <select
              id="country"
              name="country"
              value={filters.country}
              onChange={handleInputChange}
              className={selectClassName}
            >
              <option value="">All countries</option>
              {jobFilters.countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClassName} htmlFor="seniority">
              Seniority
            </label>
            <select
              id="seniority"
              name="seniority"
              value={filters.seniority}
              onChange={handleInputChange}
              className={selectClassName}
            >
              <option value="">All levels</option>
              {jobFilters.seniorityLevels.map((level) => (
                <option key={level.id} value={level.label}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClassName} htmlFor="workMode">
              Work mode
            </label>
            <select
              id="workMode"
              name="workMode"
              value={filters.workMode}
              onChange={handleInputChange}
              className={selectClassName}
            >
              <option value="">All work modes</option>
              {jobFilters.workModes.map((mode) => (
                <option key={mode.id} value={mode.id}>
                  {mode.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClassName} htmlFor="employmentType">
              Employment type
            </label>
            <select
              id="employmentType"
              name="employmentType"
              value={filters.employmentType}
              onChange={handleInputChange}
              className={selectClassName}
            >
              <option value="">All types</option>
              {jobTypes.map((type) => (
                <option key={type.id} value={type.label}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <label className="flex cursor-pointer items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10">
            <input
              type="checkbox"
              name="savedOnly"
              checked={filters.savedOnly}
              onChange={handleInputChange}
              className="h-4 w-4 rounded border-white/20 bg-slate-950 accent-indigo-500"
            />
            Saved only
          </label>

          <label className="flex cursor-pointer items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10">
            <input
              type="checkbox"
              name="appliedOnly"
              checked={filters.appliedOnly}
              onChange={handleInputChange}
              className="h-4 w-4 rounded border-white/20 bg-slate-950 accent-indigo-500"
            />
            Applied only
          </label>
        </div>
      </div>
    </section>
  );
};

export default JobFilters; 