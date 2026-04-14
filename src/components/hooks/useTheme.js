
import { useEffect, useState } from 'react';
import { STORAGE_KEYS, THEMES } from '../utils/constants';

const getInitialTheme = () => {
  const savedTheme = window.localStorage.getItem(STORAGE_KEYS.THEME);

  if (savedTheme === THEMES.DARK || savedTheme === THEMES.LIGHT) {
    return savedTheme;
  }

  return THEMES.LIGHT;
};

const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
    );
  };

  return {
    theme,
    setTheme,
    toggleTheme,
  };
};

export default useTheme;