import { LANGUAGES } from './constants';

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
    dashboard: 'Dashboard',
    cvBuilder: 'CV Builder',
    jobSearch: 'Job Search',
    savedJobs: 'Saved Jobs',
    applications: 'Applications',
    interviewPrep: 'Interview Prep',
    aiAssistant: 'AI Assistant',
    settings: 'Settings',
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

export const getTranslation = (language = LANGUAGES.EN) => {
  return translations[language] || translations[LANGUAGES.EN];
};