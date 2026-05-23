import { useMemo, useState, useEffect } from "react";
import ApplicationsContext from "./applications-context";
import * as storageService from "../services/storageService";

const STORAGE_KEY = "career_applications";

const getInitialApplications = () => {
  return storageService.getItem(STORAGE_KEY, []);
};

function ApplicationsProvider({ children }) {
  const [applications, setApplications] = useState(getInitialApplications);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    storageService.setItem(STORAGE_KEY, applications);
  }, [applications]);

  const addApplication = (job) => {
    if (!job) return;

    setApplications((prev) => {
      const exists = prev.some((app) => app.jobId === job.id);
      if (exists) return prev;

      return [
        ...prev,
        {
          id: Date.now(),
          jobId: job.id,
          title: job.title,
          company: job.company,
          status: "applied",
          createdAt: new Date().toISOString(),
        },
      ];
    });
  };

  const updateApplication = (id, updates) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, ...updates } : app)),
    );
  };

  const removeApplication = (id) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  const selectApplication = (app) => {
    setSelectedApplication(app);
  };

  const clearSelectedApplication = () => {
    setSelectedApplication(null);
  };

  const groupedApplications = useMemo(() => {
    return {
      applied: applications.filter((a) => a.status === "applied"),
      reviewing: applications.filter((a) => a.status === "reviewing"),
      interview: applications.filter((a) => a.status === "interview"),
      offer: applications.filter((a) => a.status === "offer"),
      rejected: applications.filter((a) => a.status === "rejected"),
    };
  }, [applications]);

  const value = useMemo(
    () => ({
      applications,
      groupedApplications,
      selectedApplication,

      addApplication,
      updateApplication,
      removeApplication,
      selectApplication,
      clearSelectedApplication,
    }),
    [applications, groupedApplications, selectedApplication],
  );

  return (
    <ApplicationsContext.Provider value={value}>
      {children}
    </ApplicationsContext.Provider>
  );
}

export default ApplicationsProvider;
