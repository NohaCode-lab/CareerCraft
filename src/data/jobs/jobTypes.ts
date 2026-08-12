export interface JobTypeConfig {
  id: string;
  label: string;
  category: string;
  isPrimary: boolean;
}

export const jobTypes: JobTypeConfig[] = [
  {
    id: 'full-time',
    label: 'Full-time',
    category: 'employment',
    isPrimary: true,
  },
  {
    id: 'part-time',
    label: 'Part-time',
    category: 'employment',
    isPrimary: false,
  },
  {
    id: 'contract',
    label: 'Contract',
    category: 'contract',
    isPrimary: false,
  },
  {
    id: 'internship',
    label: 'Internship',
    category: 'entry-level',
    isPrimary: false,
  },
  {
    id: 'freelance',
    label: 'Freelance',
    category: 'contract',
    isPrimary: false,
  },
];
