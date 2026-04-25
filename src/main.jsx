import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

import LanguageProvider from './context/LanguageContext';
import UIProvider from './context/UIContext';
import AuthProvider from './context/AuthContext';
import JobsProvider from './context/JobsContext';
import ApplicationsProvider from './context/ApplicationsContext';

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