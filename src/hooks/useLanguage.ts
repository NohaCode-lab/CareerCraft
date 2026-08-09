import { useContext } from "react";
import { LanguageContext, LanguageContextValue } from "../context/LanguageContext";

export type { LanguageContextValue };

const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);

  if (!context) {
    const lang = (typeof localStorage !== "undefined" && localStorage.getItem("app_language")) || "en";
    return {
      language: lang,
      setLanguage: () => {},
      toggleLanguage: () => {},
      isRTL: lang === "ar",
      availableLanguages: ["en", "de", "ar"],
    };
  }

  return context;
};

export default useLanguage;
