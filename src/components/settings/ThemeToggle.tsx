import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import useLanguage from '../../hooks/useLanguage';
import { translations } from '../../config/translations';

const STORAGE_KEY = 'careercraft_theme';
type ThemeMode = 'light' | 'dark';

const ThemeToggle: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY);
      return savedTheme === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [theme]);

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => setTheme('light')}
        className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition ${
          theme === 'light'
            ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400/40'
            : 'bg-white/5 text-slate-300 hover:bg-white/10'
        }`}
      >
        <Sun size={16} />
        {t.themeLight}
      </button>

      <button
        type="button"
        onClick={() => setTheme('dark')}
        className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition ${
          theme === 'dark'
            ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400/40'
            : 'bg-white/5 text-slate-300 hover:bg-white/10'
        }`}
      >
        <Moon size={16} />
        {t.themeDark}
      </button>
    </div>
  );
};

export default ThemeToggle;
