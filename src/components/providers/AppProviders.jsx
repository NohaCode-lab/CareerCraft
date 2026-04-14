
import React from "react";

import { AuthProvider } from "../context/AuthProvider";
import { UIProvider } from "../context/UIProvider";
import { CVProvider } from "../context/CVProvider";
import { JobsProvider } from "../context/JobsProvider";
import { ApplicationsProvider } from "../context/ApplicationsProvider";
import { InterviewProvider } from "../context/InterviewProvider";
import { AssistantProvider } from "../context/AssistantProvider";
import { SettingsProvider } from "../context/SettingsProvider";

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <SettingsProvider>
        <UIProvider>
          <CVProvider>
            <JobsProvider>
              <ApplicationsProvider>
                <InterviewProvider>
                  <AssistantProvider>
                    {children}
                  </AssistantProvider>
                </InterviewProvider>
              </ApplicationsProvider>
            </JobsProvider>
          </CVProvider>
        </UIProvider>
      </SettingsProvider>
    </AuthProvider>
  );
};

export default AppProviders;