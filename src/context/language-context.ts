import { createContext } from "react";

export interface LanguageContextState {
  language: string;
  setLanguage: (lang: string) => void;
  toggleLanguage: () => void;
  isRTL: boolean;
  availableLanguages: string[];
}

const LanguageContext = createContext<LanguageContextState | null>(null);

export default LanguageContext;
