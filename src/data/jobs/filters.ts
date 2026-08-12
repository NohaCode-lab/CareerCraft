import { countries } from '../shared/countries';

export interface FilterOption {
  id?: string;
  code?: string;
  label: string;
}

export interface JobFiltersConfig {
  countries: FilterOption[];
  seniorityLevels: FilterOption[];
  workModes: FilterOption[];
  sourceTypes: FilterOption[];
}

export const jobFilters: JobFiltersConfig = {
  countries: countries.map((country) => ({
    code: country.code,
    label: country.label,
  })),

  seniorityLevels: [
    { id: 'intern', label: 'Intern' },
    { id: 'junior', label: 'Junior' },
    { id: 'mid', label: 'Mid' },
    { id: 'senior', label: 'Senior' },
  ],

  workModes: [
    { id: 'remote', label: 'Remote' },
    { id: 'onsite', label: 'On-site' },
    { id: 'hybrid', label: 'Hybrid' },
  ],

  sourceTypes: [
    { id: 'global', label: 'Global' },
    { id: 'germany', label: 'Germany' },
    { id: 'netherlands', label: 'Netherlands' },
    { id: 'luxembourg', label: 'Luxembourg' },
    { id: 'remote', label: 'Remote' },
    { id: 'startup', label: 'Startup' },
  ],
};
