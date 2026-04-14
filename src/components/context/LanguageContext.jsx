
import { useEffect, useMemo, useState } from "react";
import LanguageContext from "./language-context";

const SUPPORTED_LANGUAGES = ["en", "ar", "de", "ln"];
const RTL_LANGUAGES = ["ar"];

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("app_language");
    return SUPPORTED_LANGUAGES.includes(saved) ? saved : "en";
  });

  useEffect(() => {
    localStorage.setItem("app_language", language);

    const isRTL = RTL_LANGUAGES.includes(language);
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [language]);

  const toggleLanguage = () => {
    const currentIndex = SUPPORTED_LANGUAGES.indexOf(language);
    const nextIndex = (currentIndex + 1) % SUPPORTED_LANGUAGES.length;
    setLanguage(SUPPORTED_LANGUAGES[nextIndex]);
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      isRTL: RTL_LANGUAGES.includes(language),
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;