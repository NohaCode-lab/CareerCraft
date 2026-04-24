import { LANGUAGES } from './constants';

// ==============================
// Translations
// ==============================

export const translations = {
  [LANGUAGES.EN]: {
    appName: 'CareerCraft',
    dashboard: 'Dashboard',
    cvBuilder: 'CV Builder',
    jobSearch: 'Job Search',
    savedJobs: 'Saved Jobs',
    applications: 'Applications',
    interviewPrep: 'Interview Prep',
    aiAssistant: 'AI Assistant',
    settings: 'Settings',
  },

  [LANGUAGES.DE]: {
    appName: 'CareerCraft',
    dashboard: 'Dashboard',
    cvBuilder: 'Lebenslauf',
    jobSearch: 'Jobsuche',
    savedJobs: 'Gespeicherte Jobs',
    applications: 'Bewerbungen',
    interviewPrep: 'Interview Vorbereitung',
    aiAssistant: 'KI Assistent',
    settings: 'Einstellungen',
  },

  [LANGUAGES.AR]: {
    appName: 'CareerCraft',
    dashboard: 'لوحة التحكم',
    cvBuilder: 'منشئ السيرة الذاتية',
    jobSearch: 'البحث عن وظيفة',
    savedJobs: 'الوظائف المحفوظة',
    applications: 'طلبات التوظيف',
    interviewPrep: 'التحضير للمقابلات',
    aiAssistant: 'المساعد الذكي',
    settings: 'الإعدادات',
  },

  [LANGUAGES.NL]: {
    appName: 'CareerCraft',
    dashboard: 'Dashboard',
    cvBuilder: 'CV Bouwer',
    jobSearch: 'Vacatures',
    savedJobs: 'Opgeslagen vacatures',
    applications: 'Sollicitaties',
    interviewPrep: 'Interview voorbereiding',
    aiAssistant: 'AI Assistent',
    settings: 'Instellingen',
  },
};

// ==============================
// Get full dictionary
// ==============================

export const getTranslation = (language = LANGUAGES.EN) => {
  return translations[language] || translations[LANGUAGES.EN];
};

// ==============================
// Get single key (safe)
// ==============================

export const t = (key, language = LANGUAGES.EN) => {
  const langPack = translations[language] || translations[LANGUAGES.EN];
  const fallback = translations[LANGUAGES.EN];

  return langPack[key] || fallback[key] || key;
};