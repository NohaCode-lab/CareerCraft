import { useContext } from "react";
import LanguageContext from "../context/language-context";

const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  const {
    language,
    setLanguage,
    toggleLanguage,
    availableLanguages,
  } = context;

  return {
    language,
    setLanguage,
    toggleLanguage,
    availableLanguages,
  };
};

export default useLanguage;