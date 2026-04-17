
import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'careercraft_language';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
  { code: 'de', label: 'DE' },
  { code: 'nl', label: 'NL' },
];

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved || 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);

    // optional: handle RTL for Arabic
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, [language]);

  return (
    <div className="flex flex-wrap gap-3">
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => setLanguage(lang.code)}
          className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
            language === lang.code
              ? 'bg-indigo-500 text-white'
              : 'bg-white/5 text-slate-300 hover:bg-white/10'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;