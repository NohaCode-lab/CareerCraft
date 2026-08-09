import { useContext } from "react";
import LanguageContext from "../context/language-context";

export interface LanguageContextValue {
  language: string;
  setLanguage: (lang: string) => void;
  toggleLanguage: () => void;
  isRTL: boolean;
  availableLanguages: string[];
}

const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  const {
    language,
    setLanguage,
    toggleLanguage,
    isRTL,
    availableLanguages,
  } = context as any;

  return {
    language,
    setLanguage,
    toggleLanguage,
    isRTL,
    availableLanguages,
  };
};

export default useLanguage;
