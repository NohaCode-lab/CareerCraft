import { createContext } from 'react';

export interface LanguageContextValue {
  language: string;
  setLanguage: (lang: string) => void;
  toggleLanguage: () => void;
  isRTL: boolean;
  availableLanguages: string[];
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
export { default } from './LanguageContext.tsx';
