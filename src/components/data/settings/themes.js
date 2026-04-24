// ==============================
// Theme Configuration
// ==============================

export const themes = [
  {
    id: 'light',
    label: 'Light',
    description: 'Light mode for bright environments',
    icon: 'sun',
    isDefault: false,
  },
  {
    id: 'dark',
    label: 'Dark',
    description: 'Dark mode for better focus and reduced eye strain',
    icon: 'moon',
    isDefault: true,
  },
  {
    id: 'system',
    label: 'System',
    description: 'Match your device system theme automatically',
    icon: 'monitor',
    isDefault: false,
  },
];

export const DEFAULT_THEME = themes.find(
  (theme) => theme.isDefault
)?.id || 'dark';
