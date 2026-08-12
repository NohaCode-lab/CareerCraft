import React, { createElement } from 'react';

import AuthProvider from '../context/AuthContext.tsx';
import ApplicationsProvider from '../context/ApplicationsContext.tsx';
import JobsProvider from '../context/JobsContext.tsx';
import LanguageProvider from '../context/LanguageContext.tsx';
import UIProvider from '../context/UIContext.tsx';
import ThemeProvider from '../context/ThemeContext.tsx';

const providers: React.ComponentType<{ children: React.ReactNode }>[] = [
  AuthProvider,
  ThemeProvider,
  LanguageProvider,
  UIProvider,
  JobsProvider,
  ApplicationsProvider,
];

export interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return providers.reduceRight((content, Provider) => {
    return createElement(Provider, null, content);
  }, children);
};

export default AppProviders;
