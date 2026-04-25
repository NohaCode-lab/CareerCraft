import { useEffect, useMemo, useState } from "react";
import JobsContext from "./jobs-context";

const STORAGE_KEY = "career_jobs";

const getInitialJobs = () => {
  try {
    const storedJobs = window.localStorage.getItem(STORAGE_KEY);
    return storedJobs ? JSON.parse(storedJobs) : [];
  } catch (error) {
    console.error("Failed to load jobs from localStorage:", error);
    return [];
  }
};

function JobsProvider({ children }) {
  const [jobs, setJobs] = useState(getInitialJobs);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    } catch (error) {
      console.error("Failed to save jobs to localStorage:", error);
    }
  }, [jobs]);

  const addJob = (job) => {
    if (!job?.id) return;

    setJobs((prev) => {
      const exists = prev.some((item) => item.id === job.id);
      return exists ? prev : [...prev, job];
    });
  };

  const saveJob = (id) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, isSaved: !job.isSaved } : job
      )
    );
  };

  const unsaveJob = (id) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, isSaved: false } : job
      )
    );
  };

  const applyJob = (id) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, isApplied: true } : job
      )
    );
  };

  const selectJob = (job) => {
    setSelectedJob(job);
  };

  const clearSelectedJob = () => {
    setSelectedJob(null);
  };

  const savedJobs = useMemo(() => {
    return jobs.filter((job) => job.isSaved);
  }, [jobs]);

  const appliedJobs = useMemo(() => {
    return jobs.filter((job) => job.isApplied);
  }, [jobs]);

  const value = useMemo(
    () => ({
      jobs,
      savedJobs,
      appliedJobs,
      selectedJob,

      addJob,
      saveJob,
      unsaveJob,
      applyJob,
      selectJob,
      clearSelectedJob,
    }),
    [jobs, savedJobs, appliedJobs, selectedJob]
  );

  return (
    <JobsContext.Provider value={value}>
      {children}
    </JobsContext.Provider>
  );
}

export default JobsProvider;