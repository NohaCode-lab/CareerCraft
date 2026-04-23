import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

import LanguageProvider from './components/context/LanguageContext';
import UIProvider from './components/context/UIContext';
import AuthProvider from './components/context/AuthContext';
import JobsProvider from './components/context/JobsContext';
import ApplicationsProvider from './components/context/ApplicationsContext';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <UIProvider>
          <AuthProvider>
            <JobsProvider>
              <ApplicationsProvider>
                <App />
              </ApplicationsProvider>
            </JobsProvider>
          </AuthProvider>
        </UIProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);