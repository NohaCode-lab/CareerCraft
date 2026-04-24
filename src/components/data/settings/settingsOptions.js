// ==============================
// Settings Options
// ==============================

export const settingsOptions = [
  {
    id: 'language',
    label: 'Language',
    description: 'Choose the application display language.',
    category: 'preferences',
    enabled: true,
  },
  {
    id: 'theme',
    label: 'Theme',
    description: 'Switch between light, dark, or system mode.',
    category: 'preferences',
    enabled: true,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    description: 'Manage alerts, reminders, and updates.',
    category: 'communication',
    enabled: false,
    comingSoon: true,
  },
  {
    id: 'privacy',
    label: 'Privacy',
    description: 'Control your data visibility and preferences.',
    category: 'account',
    enabled: false,
    comingSoon: true,
  },
];