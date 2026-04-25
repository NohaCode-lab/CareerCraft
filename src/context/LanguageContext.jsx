import { useEffect, useMemo, useState } from "react";
import LanguageContext from "./language-context";

const STORAGE_KEY = "app_language";
const SUPPORTED_LANGUAGES = ["en", "ar", "de", "nl"]; // 👈 تصحيح ln → nl
const RTL_LANGUAGES = ["ar"];

const getInitialLanguage = () => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return SUPPORTED_LANGUAGES.includes(saved) ? saved : "en";
  } catch {
    return "en";
  }
};

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch (e) {
      console.error("Failed to persist language:", e);
    }

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
      availableLanguages: SUPPORTED_LANGUAGES, // 👈 مفيد للـ UI
    }),
    [language, isRTL]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;  