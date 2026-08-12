export const APP_NAME = 'CareerCraft';

export const LANGUAGES = {
  EN: 'en',
  DE: 'de',
  AR: 'ar',
} as const;

export type LanguageCode = typeof LANGUAGES[keyof typeof LANGUAGES];

export const DEFAULT_LANGUAGE: LanguageCode = LANGUAGES.EN;

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type ThemeMode = typeof THEMES[keyof typeof THEMES];

export const DEFAULT_THEME: ThemeMode = THEMES.DARK;

export const STORAGE_KEYS = {
  THEME: 'careercraft_theme',
  LANGUAGE: 'career_craft_language',
  USER: 'career_craft_user',
  JOBS: 'career_craft_jobs',
  SAVED_JOBS: 'career_craft_saved_jobs',
  APPLICATIONS: 'career_craft_applications',
  CV_DATA: 'career_craft_cv_data',
  CV_TEMPLATE: 'career_craft_cv_template',
  CV_SECTIONS: 'career_craft_cv_sections',
  AI_HISTORY: 'career_craft_ai_history',
} as const;

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];
