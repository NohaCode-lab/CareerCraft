import { useEffect, useState } from 'react';
import { STORAGE_KEYS, THEMES } from '../../utils/constants';

const getSystemTheme = () => {
  if (typeof window === 'undefined') return THEMES.LIGHT;

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEMES.DARK
    : THEMES.LIGHT;
};

const getInitialTheme = () => {
  if (typeof window === 'undefined') return THEMES.LIGHT;

  try {
    const savedTheme = window.localStorage.getItem(STORAGE_KEYS.THEME);

    if (savedTheme === THEMES.DARK || savedTheme === THEMES.LIGHT) {
      return savedTheme;
    }

    return getSystemTheme();
  } catch {
    return THEMES.LIGHT;
  }
};

const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;

    // ✅ set attribute (لـ CSS)
    root.setAttribute('data-theme', theme);

    // ✅ set class (لـ Tailwind dark mode)
    if (theme === THEMES.DARK) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    try {
      window.localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
    );
  };

  return {
    theme,
    setTheme,
    toggleTheme,
  };
};

export default useTheme;