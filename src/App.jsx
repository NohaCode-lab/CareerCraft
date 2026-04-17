import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';

import Dashboard from './components/pages/Dashboard';
import CVBuilderPage from './components/pages/CVBuilderPage';
import JobSearchPage from './components/pages/JobSearchPage';
import SavedJobsPage from './components/pages/SavedJobsPage';
import ApplicationsPage from './components/pages/ApplicationsPage';
import InterviewPrepPage from './components/pages/InterviewPrepPage';
import AIAssistantPage from './components/pages/AIAssistantPage';
import SettingsPage from './components/pages/SettingsPage';
import NotFoundPage from './components/pages/NotFoundPage';

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout pageTitle="Dashboard">
            <Dashboard />
          </MainLayout>
        }
      />

      <Route
        path="/cv-builder"
        element={
          <MainLayout pageTitle="CV Builder">
            <CVBuilderPage />
          </MainLayout>
        }
      />

      <Route
        path="/job-search"
        element={
          <MainLayout pageTitle="Job Search">
            <JobSearchPage />
          </MainLayout>
        }
      />

      <Route
        path="/saved-jobs"
        element={
          <MainLayout pageTitle="Saved Jobs">
            <SavedJobsPage />
          </MainLayout>
        }
      />

      <Route
        path="/applications"
        element={
          <MainLayout pageTitle="Applications">
            <ApplicationsPage />
          </MainLayout>
        }
      />

      <Route
        path="/interview-prep"
        element={
          <MainLayout pageTitle="Interview Prep">
            <InterviewPrepPage />
          </MainLayout>
        }
      />

      <Route
        path="/ai-assistant"
        element={
          <MainLayout pageTitle="AI Assistant">
            <AIAssistantPage />
          </MainLayout>
        }
      />

      <Route
        path="/settings"
        element={
          <MainLayout pageTitle="Settings">
            <SettingsPage />
          </MainLayout>
        }
      />

      <Route
        path="*"
        element={
          <MainLayout pageTitle="Page Not Found">
            <NotFoundPage />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default App;