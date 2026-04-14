import LanguageProvider from "./context/LanguageContext";
import UIProvider from "./context/UIContext";
import AuthProvider from "./context/AuthContext";
import JobsProvider from "./context/JobsContext";
import ApplicationsProvider from "./context/ApplicationsContext";

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