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
          className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
            language === lang.code
              ? 'bg-indigo-500 text-white shadow-md'
              : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
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
