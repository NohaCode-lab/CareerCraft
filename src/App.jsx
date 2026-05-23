import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import Loader from "./components/ui/Loader";

import Dashboard from "./components/pages/Dashboard";
import NotFoundPage from "./components/pages/NotFoundPage";

const CVBuilderPage = lazy(() => import("./components/pages/CVBuilderPage"));
const JobSearchPage = lazy(() => import("./components/pages/JobSearchPage"));
const SavedJobsPage = lazy(() => import("./components/pages/SavedJobsPage"));
const ApplicationsPage = lazy(
  () => import("./components/pages/ApplicationsPage"),
);
const InterviewPrepPage = lazy(
  () => import("./components/pages/InterviewPrepPage"),
);
const AIAssistantPage = lazy(
  () => import("./components/pages/AIAssistantPage"),
);
const SettingsPage = lazy(() => import("./components/pages/SettingsPage"));

import { ROUTES } from "./config/routes";

const appRoutes = [
  {
    path: ROUTES.DASHBOARD,
    pageTitle: "Dashboard",
    element: <Dashboard />,
  },
  {
    path: ROUTES.CV_BUILDER,
    pageTitle: "CV Builder",
    element: <CVBuilderPage />,
  },
  {
    path: ROUTES.JOB_SEARCH,
    pageTitle: "Job Search",
    element: <JobSearchPage />,
  },
  {
    path: ROUTES.SAVED_JOBS,
    pageTitle: "Saved Jobs",
    element: <SavedJobsPage />,
  },
  {
    path: ROUTES.APPLICATIONS,
    pageTitle: "Applications",
    element: <ApplicationsPage />,
  },
  {
    path: ROUTES.INTERVIEW_PREP,
    pageTitle: "Interview Prep",
    element: <InterviewPrepPage />,
  },
  {
    path: ROUTES.AI_ASSISTANT,
    pageTitle: "AI Assistant",
    element: <AIAssistantPage />,
  },
  {
    path: ROUTES.SETTINGS,
    pageTitle: "Settings",
    element: <SettingsPage />,
  },
];

const renderWithLayout = (pageTitle, element) => {
  return <MainLayout pageTitle={pageTitle}>{element}</MainLayout>;
};

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
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
          element={renderWithLayout("Page Not Found", <NotFoundPage />)}
        />
      </Routes>
    </Suspense>
  );
};

export default App;
