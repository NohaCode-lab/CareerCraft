
import { useMemo, useState } from "react";
import ApplicationsContext from "./applications-context";

function ApplicationsProvider({ children }) {
  const [applications, setApplications] = useState([]);

  const addApplication = (app) => {
    setApplications((prev) => [...prev, app]);
  };

  const value = useMemo(
    () => ({
      applications,
      addApplication,
    }),
    [applications]
  );

  return (
    <ApplicationsContext.Provider value={value}>
      {children}
    </ApplicationsContext.Provider>
  );
}

export default ApplicationsProvider;