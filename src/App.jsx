import { Route, Routes } from 'react-router-dom';

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

const appRoutes = [
  {
    path: ROUTES.DASHBOARD,
    pageTitle: 'Dashboard',
    element: <Dashboard />,
  },
  {
    path: ROUTES.CV_BUILDER,
    pageTitle: 'CV Builder',
    element: <CVBuilderPage />,
  },
  {
    path: ROUTES.JOB_SEARCH,
    pageTitle: 'Job Search',
    element: <JobSearchPage />,
  },
  {
    path: ROUTES.SAVED_JOBS,
    pageTitle: 'Saved Jobs',
    element: <SavedJobsPage />,
  },
  {
    path: ROUTES.APPLICATIONS,
    pageTitle: 'Applications',
    element: <ApplicationsPage />,
  },
  {
    path: ROUTES.INTERVIEW_PREP,
    pageTitle: 'Interview Prep',
    element: <InterviewPrepPage />,
  },
  {
    path: ROUTES.AI_ASSISTANT,
    pageTitle: 'AI Assistant',
    element: <AIAssistantPage />,
  },
  {
    path: ROUTES.SETTINGS,
    pageTitle: 'Settings',
    element: <SettingsPage />,
  },
];

const renderWithLayout = (pageTitle, element) => {
  return <MainLayout pageTitle={pageTitle}>{element}</MainLayout>;
};

const App = () => {
  return (
    <Routes>
      {appRoutes.map(({ path, pageTitle, element }) => (
        <Route
          key={path}
          path={path}
          element={renderWithLayout(pageTitle, element)}
        />
      ))}

      <Route
        path="*"
        element={renderWithLayout('Page Not Found', <NotFoundPage />)}
      />
    </Routes>
  );
};

export default App;