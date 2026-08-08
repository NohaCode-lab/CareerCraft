import React, { createElement } from 'react';

import AuthProvider from '../context/AuthContext';
import ApplicationsProvider from '../context/ApplicationsContext';
import JobsProvider from '../context/JobsContext';
import LanguageProvider from '../context/LanguageContext';
import UIProvider from '../context/UIContext';

const providers: React.ComponentType<{ children: React.ReactNode }>[] = [
  AuthProvider,
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
