// ==============================
// CV Templates Configuration
// ==============================

export const cvTemplates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and professional design for most tech roles.',
    accent: 'blue',
    recommendedFor: ['Frontend', 'React', 'UI Developer'],
    atsFriendly: true,
    isDefault: true,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple layout focused on readability and ATS compatibility.',
    accent: 'gray',
    recommendedFor: ['ATS', 'International Applications'],
    atsFriendly: true,
    isDefault: false,
  },
  {
    id: 'european',
    name: 'European',
    description: 'Structured style suitable for Europe-focused job applications.',
    accent: 'emerald',
    recommendedFor: ['Germany', 'Netherlands', 'Luxembourg'],
    atsFriendly: true,
    isDefault: false,
  },
];

export const DEFAULT_CV_TEMPLATE = cvTemplates.find(
  (template) => template.isDefault
)?.id || 'modern';