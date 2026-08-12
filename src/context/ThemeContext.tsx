import React, { useEffect, useState } from 'react';
import { STORAGE_KEYS, THEMES } from '../utils/constants';
import { ThemeContext, ThemeMode } from './ThemeContext';

export type { ThemeMode };

const CANONICAL_STORAGE_KEY = STORAGE_KEYS.THEME;

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'dark';
  try {
    const savedTheme = localStorage.getItem(CANONICAL_STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
  } catch {
    // Fallback if localStorage is inaccessible
  }

  // If root element already has dark class set (e.g. from index.html head script)
  if (document.documentElement.classList.contains('dark')) {
    return 'dark';
  }

  // System fallback if supported
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'dark'; // CareerCraft default fallback
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    try {
      localStorage.setItem(CANONICAL_STORAGE_KEY, theme);
    } catch {
      // Ignore storage write errors
    }
  }, [theme]);

  const setTheme = (nextTheme: ThemeMode) => {
    setThemeState(nextTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === THEMES.LIGHT ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
