import { LANGUAGES } from './constants';

// ==============================
// Comprehensive Professional Translations Dictionary
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
    profile: 'Profile',
    logout: 'Logout',

    // Section Titles & Actions
    summary: 'Professional Summary',
    experience: 'Work Experience',
    education: 'Education',
    skills: 'Skills & Expertise',
    languages: 'Languages',
    certifications: 'Certifications',
    projects: 'Projects',
    additional: 'Additional Information',
    
    // Interview Module
    generateQuestions: 'Generate AI Questions',
    starAnswer: 'Personalized STAR Answer',
    evaluateAnswer: 'Evaluate My Answer',
    mockInterview: 'AI Mock Interview',
    interviewReadiness: 'Interview Readiness Score',
    technicalQuestions: 'Technical Questions',
    behavioralQuestions: 'Behavioral Questions',
    situationalQuestions: 'Situational Questions',
    hrQuestions: 'HR & Culture Questions',

    // Common Actions
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    add: 'Add Section',
    downloadPdf: 'Download PDF',
    search: 'Search',
    applyNow: 'Apply Now',
    saveJob: 'Save Job',

    // System Messages
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Saved successfully',
  },

  [LANGUAGES.DE]: {
    appName: 'CareerCraft',
    dashboard: 'Dashboard',
    cvBuilder: 'Lebenslauf',
    jobSearch: 'Jobsuche',
    savedJobs: 'Gespeicherte Jobs',
    applications: 'Bewerbungen',
    interviewPrep: 'Vorstellungsgespräch vorbereiten',
    aiAssistant: 'KI-Assistent',
    settings: 'Einstellungen',
    profile: 'Profil',
    logout: 'Abmelden',

    // Section Titles & Actions
    summary: 'Profil & Zusammenfassung',
    experience: 'Berufserfahrung',
    education: 'Ausbildung & Studium',
    skills: 'Kenntnisse & Fähigkeiten',
    languages: 'Sprachkenntnisse',
    certifications: 'Zertifikate & Qualifikationen',
    projects: 'Projekte',
    additional: 'Weitere Informationen',

    // Interview Module
    generateQuestions: 'KI-Fragen generieren',
    starAnswer: 'Personalisierte STAR-Antwort',
    evaluateAnswer: 'Meine Antwort bewerten',
    mockInterview: 'KI-Probeinterview',
    interviewReadiness: 'Interview-Bereitschaftsgrad',
    technicalQuestions: 'Technische Fragen',
    behavioralQuestions: 'Verhaltensfragen',
    situationalQuestions: 'Situative Fragen',
    hrQuestions: 'HR- & Kulturfragen',

    // Common Actions
    save: 'Speichern',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    cancel: 'Abbrechen',
    add: 'Abschnitt hinzufügen',
    downloadPdf: 'PDF herunterladen',
    search: 'Suchen',
    applyNow: 'Jetzt bewerben',
    saveJob: 'Job speichern',

    // System Messages
    loading: 'Laden...',
    error: 'Ein Fehler ist aufgetreten',
    success: 'Erfolgreich gespeichert',
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
    profile: 'الملف الشخصي',
    logout: 'تسجيل الخروج',

    // Section Titles & Actions
    summary: 'الملخص المهني',
    experience: 'الخبرة العملية',
    education: 'التعليم والشهادات',
    skills: 'المهارات والخبرات',
    languages: 'اللغات',
    certifications: 'الشهادات المعتمدة',
    projects: 'المشاريع',
    additional: 'معلومات إضافية',

    // Interview Module
    generateQuestions: 'توليد أسئلة الذكاء الاصطناعي',
    starAnswer: 'إجابة STAR المخصصة',
    evaluateAnswer: 'تقييم إجابتي',
    mockInterview: 'مقابلة تجريبية تفاعلية',
    interviewReadiness: 'مؤشر الجاهزية للمقابلة',
    technicalQuestions: 'أسئلة تقنية',
    behavioralQuestions: 'أسئلة سلوكية',
    situationalQuestions: 'أسئلة موقفية',
    hrQuestions: 'أسئلة الموارد البشرية',

    // Common Actions
    save: 'حفظ',
    edit: 'تعديل',
    delete: 'حذف',
    cancel: 'إلغاء',
    add: 'إضافة قسم',
    downloadPdf: 'تحميل PDF',
    search: 'بحث',
    applyNow: 'قدّم الآن',
    saveJob: 'حفظ الوظيفة',

    // System Messages
    loading: 'جاري التحميل...',
    error: 'حدث خطأ غير متوقع',
    success: 'تم الحفظ بنجاح',
  },
};

export const getTranslation = (language = LANGUAGES.EN) => {
  return translations[language] || translations[LANGUAGES.EN];
};

export const t = (key, language = LANGUAGES.EN) => {
  const langPack = translations[language] || translations[LANGUAGES.EN];
  const fallback = translations[LANGUAGES.EN];

  return langPack[key] || fallback[key] || key;
};