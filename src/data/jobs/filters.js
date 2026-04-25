import { countries } from '../shared/countries';

// ==============================
// Job Filters Configuration
// ==============================

export const jobFilters = {
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