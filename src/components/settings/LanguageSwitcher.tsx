import React from 'react';
import useLanguage from '../../hooks/useLanguage';

interface LanguageOption {
  code: string;
  name: string;
  label: string;
}

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', label: '🇬🇧 English' },
  { code: 'ar', name: 'العربية', label: '🇸🇦 العربية' },
  { code: 'de', name: 'Deutsch', label: '🇩🇪 Deutsch' },
];

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex flex-wrap gap-3">
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => setLanguage(lang.code)}
          className={`rounded-2xl px-5 py-2.5 text-sm font-semibold transition ${
            language === lang.code
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400/40'
              : 'border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
          }`}
          aria-label={`Select ${lang.name}`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
