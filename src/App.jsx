import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./components/layout/MainLayout";

// Pages
import Dashboard from "./components/pages/Dashboard";
import CVBuilderPage from "./components/pages/CVBuilderPage";
import JobSearchPage from "./components/pages/JobSearchPage";
import SavedJobsPage from "./components/pages/SavedJobsPage";
import ApplicationsPage from "./components/pages/ApplicationsPage";
import InterviewPrepPage from "./components/pages/InterviewPrepPage";
import AIAssistantPage from "./components/pages/AIAssistantPage";
import SettingsPage from "./components/pages/SettingsPage";
import NotFoundPage from "./components/pages/NotFoundPage";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cv-builder" element={<CVBuilderPage />} />
          <Route path="/jobs" element={<JobSearchPage />} />
          <Route path="/saved-jobs" element={<SavedJobsPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/interview" element={<InterviewPrepPage />} />
          <Route path="/ai" element={<AIAssistantPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;