import { useContext } from "react";
import { LanguageContext, LanguageContextValue } from "../context/LanguageContext";
import { STORAGE_KEYS, LANGUAGES, DEFAULT_LANGUAGE } from "../utils/constants";

export type { LanguageContextValue };

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);

  if (!context) {
    const lang = (typeof localStorage !== "undefined" && localStorage.getItem(STORAGE_KEYS.LANGUAGE)) || DEFAULT_LANGUAGE;
    return {
      language: lang,
      setLanguage: () => {},
      toggleLanguage: () => {},
      isRTL: lang === "ar",
      availableLanguages: Object.values(LANGUAGES),
    };
  }

  return context;
};

export default useLanguage;
