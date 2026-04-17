
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const STORAGE_KEY = 'careercraft_theme';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY);
      return savedTheme === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleThemeChange = (nextTheme) => {
    setTheme(nextTheme);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => handleThemeChange('light')}
        className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition ${
          theme === 'light'
            ? 'bg-indigo-500 text-white'
            : 'bg-white/5 text-slate-300 hover:bg-white/10'
        }`}
      >
        <Sun size={16} />
        Light
      </button>

      <button
        type="button"
        onClick={() => handleThemeChange('dark')}
        className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition ${
          theme === 'dark'
            ? 'bg-indigo-500 text-white'
            : 'bg-white/5 text-slate-300 hover:bg-white/10'
        }`}
      >
        <Moon size={16} />
        Dark
      </button>
    </div>
  );
};

export default ThemeToggle;