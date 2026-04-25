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

import { ROUTES } from './config/routes';

const App = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <MainLayout pageTitle="Dashboard">
            <Dashboard />
          </MainLayout>
        }
      />

      <Route
        path={ROUTES.CV_BUILDER}
        element={
          <MainLayout pageTitle="CV Builder">
            <CVBuilderPage />
          </MainLayout>
        }
      />

      <Route
        path={ROUTES.JOB_SEARCH}
        element={
          <MainLayout pageTitle="Job Search">
            <JobSearchPage />
          </MainLayout>
        }
      />

      <Route
        path={ROUTES.SAVED_JOBS}
        element={
          <MainLayout pageTitle="Saved Jobs">
            <SavedJobsPage />
          </MainLayout>
        }
      />

      <Route
        path={ROUTES.APPLICATIONS}
        element={
          <MainLayout pageTitle="Applications">
            <ApplicationsPage />
          </MainLayout>
        }
      />

      <Route
        path={ROUTES.INTERVIEW_PREP}
        element={
          <MainLayout pageTitle="Interview Prep">
            <InterviewPrepPage />
          </MainLayout>
        }
      />

      <Route
        path={ROUTES.AI_ASSISTANT}
        element={
          <MainLayout pageTitle="AI Assistant">
            <AIAssistantPage />
          </MainLayout>
        }
      />

      <Route
        path={ROUTES.SETTINGS}
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