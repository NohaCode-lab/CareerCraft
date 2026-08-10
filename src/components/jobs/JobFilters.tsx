import React from 'react';
import { ChevronDown, RotateCcw, Search } from 'lucide-react';
import { jobFilters } from '../../data/jobs/filters';
import { jobTypes } from '../../data/jobs/jobTypes';
import useLanguage from '../../hooks/useLanguage';
import { t } from '../../utils/i18n';

export interface JobFilterState {
  search: string;
  country: string;
  seniority: string;
  workMode: string;
  employmentType: string;
  savedOnly: boolean;
  appliedOnly: boolean;
}

const defaultFilters: JobFilterState = {
  search: '',
  country: '',
  seniority: '',
  workMode: '',
  employmentType: '',
  savedOnly: false,
  appliedOnly: false,
};

interface JobFiltersProps {
  filters?: JobFilterState;
  onChange?: (filters: JobFilterState) => void;
  onReset?: () => void;
}

const JobFilters: React.FC<JobFiltersProps> = ({ filters = defaultFilters, onChange, onReset }) => {
  const { language, isRTL } = useLanguage();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;
    const checked = (event.target as HTMLInputElement).checked;

    onChange?.({
      ...filters,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const selectClassName =
    'w-full appearance-none rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white dark:border-white/10 dark:bg-slate-900/90 dark:text-slate-200 dark:focus:border-indigo-400/60 dark:focus:bg-slate-900 ltr:pr-10 rtl:pl-10';

  const labelClassName = 'mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300';

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/80">
      <div className="mb-5 flex items-start justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t('jobFiltersTitle', language)}</h2>
          <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            {t('jobFiltersDesc', language)}
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {t('reset', language)}
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label className={labelClassName} htmlFor="search">
            {t('search', language)}
          </label>

          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 transition focus-within:border-indigo-500 focus-within:bg-white dark:border-white/10 dark:bg-slate-900/90 dark:focus-within:border-indigo-400/60 font-medium text-slate-900 dark:text-slate-200">
            <Search className="h-4 w-4 shrink-0 text-slate-400" />

            <input
              id="search"
              name="search"
              type="text"
              value={filters.search}
              onChange={handleInputChange}
              placeholder={t('searchByTitleCompanyLocation', language)}
              className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-200 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1">
          <div>
            <label className={labelClassName} htmlFor="country">
              {t('country', language)}
            </label>
            <div className="relative">
              <select
                id="country"
                name="country"
                value={filters.country}
                onChange={handleInputChange}
                className={selectClassName}
              >
                <option value="" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-200">{t('allCountries', language)}</option>
                {jobFilters.countries.map((country: any) => (
                  <option key={country.code} value={country.code} className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-200">
                    {country.label}
                  </option>
                ))}
              </select>
              <ChevronDown className={`pointer-events-none absolute top-3.5 h-4 w-4 text-slate-400 ${isRTL ? 'left-3' : 'right-3'}`} />
            </div>
          </div>

          <div>
            <label className={labelClassName} htmlFor="seniority">
              {t('seniority', language)}
            </label>
            <div className="relative">
              <select
                id="seniority"
                name="seniority"
                value={filters.seniority}
                onChange={handleInputChange}
                className={selectClassName}
              >
                <option value="" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-200">{t('allLevels', language)}</option>
                {jobFilters.seniorityLevels.map((level: any) => (
                  <option key={level.id} value={level.label} className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-200">
                    {level.label}
                  </option>
                ))}
              </select>
              <ChevronDown className={`pointer-events-none absolute top-3.5 h-4 w-4 text-slate-400 ${isRTL ? 'left-3' : 'right-3'}`} />
            </div>
          </div>

          <div>
            <label className={labelClassName} htmlFor="workMode">
              {t('workMode', language)}
            </label>
            <div className="relative">
              <select
                id="workMode"
                name="workMode"
                value={filters.workMode}
                onChange={handleInputChange}
                className={selectClassName}
              >
                <option value="" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-200">{t('allWorkModes', language)}</option>
                {jobFilters.workModes.map((mode: any) => (
                  <option key={mode.id} value={mode.id} className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-200">
                    {mode.label}
                  </option>
                ))}
              </select>
              <ChevronDown className={`pointer-events-none absolute top-3.5 h-4 w-4 text-slate-400 ${isRTL ? 'left-3' : 'right-3'}`} />
            </div>
          </div>

          <div>
            <label className={labelClassName} htmlFor="employmentType">
              {t('employmentType', language)}
            </label>
            <div className="relative">
              <select
                id="employmentType"
                name="employmentType"
                value={filters.employmentType}
                onChange={handleInputChange}
                className={selectClassName}
              >
                <option value="" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-200">{t('allTypes', language)}</option>
                {jobTypes.map((type: any) => (
                  <option key={type.id} value={type.label} className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-200">
                    {type.label}
                  </option>
                ))}
              </select>
              <ChevronDown className={`pointer-events-none absolute top-3.5 h-4 w-4 text-slate-400 ${isRTL ? 'left-3' : 'right-3'}`} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <label className="flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10">
            <input
              type="checkbox"
              name="savedOnly"
              checked={filters.savedOnly}
              onChange={handleInputChange}
              className="h-4 w-4 rounded border-slate-300 bg-white accent-indigo-600 dark:border-white/20 dark:bg-slate-950 dark:accent-indigo-500"
            />
            {t('savedOnly', language)}
          </label>

          <label className="flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10">
            <input
              type="checkbox"
              name="appliedOnly"
              checked={filters.appliedOnly}
              onChange={handleInputChange}
              className="h-4 w-4 rounded border-slate-300 bg-white accent-indigo-600 dark:border-white/20 dark:bg-slate-950 dark:accent-indigo-500"
            />
            {t('appliedOnly', language)}
          </label>
        </div>
      </div>
    </section>
  );
};

export default JobFilters;
