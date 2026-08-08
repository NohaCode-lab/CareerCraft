import React, { useMemo, useState, useEffect } from "react";
import ApplicationsContext from "./applications-context";
import * as storageService from "../services/storageService";
import { Application } from "../hooks/useApplications";

const STORAGE_KEY = "career_applications";

const getInitialApplications = (): Application[] => {
  return storageService.getItem<Application[]>(STORAGE_KEY, []);
};

interface ApplicationsProviderProps {
  children: React.ReactNode;
}

function ApplicationsProvider({ children }: ApplicationsProviderProps) {
  const [applications, setApplications] = useState<Application[]>(getInitialApplications);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  useEffect(() => {
    storageService.setItem(STORAGE_KEY, applications);
  }, [applications]);

  const addApplication = (job: any) => {
    if (!job) return;

    setApplications((prev) => {
      const exists = prev.some((app) => app.jobId === job.id);
      if (exists) return prev;

      return [
        ...prev,
        {
          id: String(Date.now()),
          jobId: job.id,
          title: job.title,
          company: job.company,
          status: "applied",
          createdAt: new Date().toISOString(),
        },
      ];
    });
  };

  const updateApplication = (id: string | number, updates: Partial<Application>) => {
    setApplications((prev) =>
      prev.map((app) => (String(app.id) === String(id) ? { ...app, ...updates } : app)),
    );
  };

  const removeApplication = (id: string | number) => {
    setApplications((prev) => prev.filter((app) => String(app.id) !== String(id)));
  };

  const selectApplication = (app: Application | null) => {
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
    <ApplicationsContext.Provider value={value as any}>
      {children}
    </ApplicationsContext.Provider>
  );
}

export default ApplicationsProvider;
