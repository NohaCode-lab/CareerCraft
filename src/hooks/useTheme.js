import { useEffect, useState } from "react";
import { STORAGE_KEYS, THEMES } from "../../utils/constants";
import * as storageService from "../../services/storageService";

const getSystemTheme = () => {
  if (typeof window === "undefined") return THEMES.LIGHT;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? THEMES.DARK
    : THEMES.LIGHT;
};

const getInitialTheme = () => {
  if (typeof window === "undefined") return THEMES.LIGHT;

  const savedTheme = storageService.getItem(STORAGE_KEYS.THEME, null);

  if (savedTheme === THEMES.DARK || savedTheme === THEMES.LIGHT) {
    return savedTheme;
  }

  return getSystemTheme();
};

const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute("data-theme", theme);

    if (theme === THEMES.DARK) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    storageService.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT));
  };

  return {
    theme,
    setTheme,
    toggleTheme,
  };
};

export default useTheme;
