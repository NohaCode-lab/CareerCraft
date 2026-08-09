export interface TranslationKeys {
  summary: string;
  experience: string;
  education: string;
  projects: string;
  additional: string;
  skills: string;
  languages: string;
  certifications: string;

  // Navigation
  dashboard: string;
  cvBuilder: string;
  jobSearch: string;
  savedJobs: string;
  applications: string;
  interviewPrep: string;
  aiAssistant: string;
  settings: string;

  // Sidebar & Layout
  aiCareerAssistant: string;
  stayCareerReady: string;
  stayCareerReadyDesc: string;
  searchDashboard: string;

  // Settings Page
  appearance: string;
  appearanceDesc: string;
  themeLight: string;
  themeDark: string;
  languageSection: string;
  languageSectionDesc: string;
  moreSettingsTitle: string;
  moreSettingsDesc: string;
  notificationsPref: string;
  cvDefaults: string;
  exportOptions: string;

  // Actions & Buttons
  open: string;
  view: string;
  apply: string;
  applied: string;
  save: string;
  saved: string;
  unsave: string;
  reset: string;
  copy: string;
  copied: string;
  close: string;
  cancel: string;
  generate: string;
  generating: string;
}

export const translations: Record<string, TranslationKeys> = {
  en: {
    summary: 'Professional Summary',
    experience: 'Work Experience',
    education: 'Education',
    projects: 'Projects',
    additional: 'Additional Information',
    skills: 'Skills & Expertise',
    languages: 'Languages',
    certifications: 'Certifications',

    dashboard: 'Dashboard',
    cvBuilder: 'CV Builder',
    jobSearch: 'Job Search',
    savedJobs: 'Saved Jobs',
    applications: 'Applications',
    interviewPrep: 'Interview Prep',
    aiAssistant: 'AI Assistant',
    settings: 'Settings',

    aiCareerAssistant: 'AI Career Assistant',
    stayCareerReady: 'Stay career-ready',
    stayCareerReadyDesc: 'Track applications, improve your CV, and prepare for interviews in one place.',
    searchDashboard: 'Search dashboard...',

    appearance: 'Appearance',
    appearanceDesc: 'Choose the theme that fits your workflow and visual preference.',
    themeLight: 'Light',
    themeDark: 'Dark',
    languageSection: 'Language',
    languageSectionDesc: 'Select your preferred language for the application interface.',
    moreSettingsTitle: 'More settings coming soon',
    moreSettingsDesc: 'Future updates will include notification preferences, CV defaults, export options, and additional personalization tools.',
    notificationsPref: 'Notification preferences',
    cvDefaults: 'CV defaults',
    exportOptions: 'Export options',

    open: 'Open',
    view: 'View',
    apply: 'Apply',
    applied: 'Applied',
    save: 'Save',
    saved: 'Saved',
    unsave: 'Remove',
    reset: 'Reset',
    copy: 'Copy',
    copied: 'Copied',
    close: 'Close',
    cancel: 'Cancel',
    generate: 'Generate',
    generating: 'Generating...',
  },

  de: {
    summary: 'Profil & Zusammenfassung',
    experience: 'Berufserfahrung',
    education: 'Ausbildung & Studium',
    projects: 'Projekte',
    additional: 'Weitere Informationen',
    skills: 'Kenntnisse & Fähigkeiten',
    languages: 'Sprachkenntnisse',
    certifications: 'Zertifikate & Qualifikationen',

    dashboard: 'Dashboard',
    cvBuilder: 'Lebenslauf-Editor',
    jobSearch: 'Jobsuche',
    savedJobs: 'Gespeicherte Jobs',
    applications: 'Bewerbungen',
    interviewPrep: 'Interview-Vorbereitung',
    aiAssistant: 'KI-Assistent',
    settings: 'Einstellungen',

    aiCareerAssistant: 'KI-Karriere-Assistent',
    stayCareerReady: 'Bleiben Sie karrierebereit',
    stayCareerReadyDesc: 'Bewerbungen verfolgen, Lebenslauf optimieren und auf Vorstellungsgespräche vorbereiten.',
    searchDashboard: 'Dashboard durchsuchen...',

    appearance: 'Erscheinungsbild',
    appearanceDesc: 'Wählen Sie das Design, das zu Ihrem Arbeitsablauf passt.',
    themeLight: 'Hell',
    themeDark: 'Dunkel',
    languageSection: 'Sprache',
    languageSectionDesc: 'Wählen Sie Ihre bevorzugte Sprache für die Benutzeroberfläche.',
    moreSettingsTitle: 'Weitere Einstellungen demnächst',
    moreSettingsDesc: 'Zukünftige Updates beinhalten Benachrichtigungseinstellungen, Standard-Lebenslaufoptionen und Export-Tools.',
    notificationsPref: 'Benachrichtigungseinstellungen',
    cvDefaults: 'Lebenslauf-Standards',
    exportOptions: 'Export-Optionen',

    open: 'Öffnen',
    view: 'Ansehen',
    apply: 'Bewerben',
    applied: 'Beworben',
    save: 'Speichern',
    saved: 'Gespeichert',
    unsave: 'Entfernen',
    reset: 'Zurücksetzen',
    copy: 'Kopieren',
    copied: 'Kopiert',
    close: 'Schließen',
    cancel: 'Abbrechen',
    generate: 'Generieren',
    generating: 'Wird generiert...',
  },

  ar: {
    summary: 'الملخص المهني',
    experience: 'الخبرة العملية',
    education: 'التعليم والشهادات',
    projects: 'المشاريع',
    additional: 'معلومات إضافية',
    skills: 'المهارات',
    languages: 'اللغات',
    certifications: 'الشهادات المعتمدة',

    dashboard: 'لوحة التحكم',
    cvBuilder: 'منشئ السيرة الذاتية',
    jobSearch: 'البحث عن وظائف',
    savedJobs: 'الوظائف المحفوظة',
    applications: 'طلبات التوظيف',
    interviewPrep: 'تحضير المقابلات',
    aiAssistant: 'مساعد الذكاء الاصطناعي',
    settings: 'الإعدادات',

    aiCareerAssistant: 'مساعد الذكاء الاصطناعي المهني',
    stayCareerReady: 'ابقَ مستعداً لفرصتك القادمة',
    stayCareerReadyDesc: 'تتبع طلباتك، حسّن سيرتك الذاتية، واستعد للمقابلات في مكان واحد.',
    searchDashboard: 'بحث في لوحة التحكم...',

    appearance: 'المظهر والسمة',
    appearanceDesc: 'اختر السمة المرئية التي تناسب تفضيلاتك وسير عملك.',
    themeLight: 'فاتح',
    themeDark: 'داكن',
    languageSection: 'اللغة',
    languageSectionDesc: 'اختر لغتك المفضلة لواجهة التطبيق.',
    moreSettingsTitle: 'إعدادات إضافية قريباً',
    moreSettingsDesc: 'ستتضمن التحديثات القادمة تفضيلات الإشعارات، الخيارات الافتراضية للسيرة الذاتية، وأدوات التصدير.',
    notificationsPref: 'تفضيلات الإشعارات',
    cvDefaults: 'افتراضيات السيرة الذاتية',
    exportOptions: 'خيارات التصدير',

    open: 'فتح',
    view: 'عرض',
    apply: 'تقديم',
    applied: 'تم التقديم',
    save: 'حفظ',
    saved: 'محفوظ',
    unsave: 'إزالة',
    reset: 'إعادة ضبط',
    copy: 'نسخ',
    copied: 'تم النسخ',
    close: 'إغلاق',
    cancel: 'إلغاء',
    generate: 'توليد',
    generating: 'جاري التوليد...',
  },
};
