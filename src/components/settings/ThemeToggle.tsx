import React from 'react';
import { Moon, Sun } from 'lucide-react';
import useLanguage from '../../hooks/useLanguage';
import { t } from '../../utils/i18n';
import useTheme from '../../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { language } = useLanguage();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => setTheme('light')}
        aria-label="Select Light Mode"
        className={`inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-400/40 ${
          theme === 'light'
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400/40'
            : 'border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
        }`}
      >
        <Sun size={16} />
        {t('themeLight', language)}
      </button>

      <button
        type="button"
        onClick={() => setTheme('dark')}
        aria-label="Select Dark Mode"
        className={`inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-400/40 ${
          theme === 'dark'
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400/40'
            : 'border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
        }`}
      >
        <Moon size={16} />
        {t('themeDark', language)}
      </button>
    </div>
  );
};

export default ThemeToggle;
