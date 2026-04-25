import { useMemo, useState, useEffect } from "react";
import ApplicationsContext from "./applications-context";

const STORAGE_KEY = "career_applications";

const getInitialApplications = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load applications:", error);
    return [];
  }
};

function ApplicationsProvider({ children }) {
  const [applications, setApplications] = useState(getInitialApplications);
  const [selectedApplication, setSelectedApplication] = useState(null);

  // ✅ persist
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    } catch (error) {
      console.error("Failed to save applications:", error);
    }
  }, [applications]);

  // ✅ add (من job)
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

  // ✅ update
  const updateApplication = (id, updates) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, ...updates } : app
      )
    );
  };

  // ✅ remove
  const removeApplication = (id) => {
    setApplications((prev) =>
      prev.filter((app) => app.id !== id)
    );
  };

  // ✅ select
  const selectApplication = (app) => {
    setSelectedApplication(app);
  };

  const clearSelectedApplication = () => {
    setSelectedApplication(null);
  };

  // 🔥 pipeline (مهم جدًا)
  const groupedApplications = useMemo(() => {
    return {
      applied: applications.filter((a) => a.status === "applied"),
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
    [applications, groupedApplications, selectedApplication]
  );

  return (
    <ApplicationsContext.Provider value={value}>
      {children}
    </ApplicationsContext.Provider>
  );
}

export default ApplicationsProvider;