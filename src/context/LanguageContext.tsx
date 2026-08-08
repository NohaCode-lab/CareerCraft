import React, { useEffect, useMemo, useState } from "react";
import LanguageContext from "./language-context";
import * as storageService from "../services/storageService";

const STORAGE_KEY = "app_language";
const SUPPORTED_LANGUAGES = ["en", "ar", "de", "nl"];
const RTL_LANGUAGES = ["ar"];

const getInitialLanguage = (): string => {
  const saved = storageService.getItem<string>(STORAGE_KEY, "en");
  return saved && SUPPORTED_LANGUAGES.includes(saved) ? saved : "en";
};

export interface LanguageProviderProps {
  children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<string>(getInitialLanguage);

  useEffect(() => {
    storageService.setItem(STORAGE_KEY, language);

    const isRTL = RTL_LANGUAGES.includes(language);
    const root = document.documentElement;

    root.lang = language;
    root.dir = isRTL ? "rtl" : "ltr";
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const currentIndex = SUPPORTED_LANGUAGES.indexOf(prev);
      const nextIndex = (currentIndex + 1) % SUPPORTED_LANGUAGES.length;
      return SUPPORTED_LANGUAGES[nextIndex];
    });
  };

  const isRTL = RTL_LANGUAGES.includes(language);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      isRTL,
      availableLanguages: SUPPORTED_LANGUAGES,
    }),
    [language, isRTL],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
