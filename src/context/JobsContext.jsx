import { useEffect, useMemo, useState } from "react";
import JobsContext from "./jobs-context";
import * as storageService from "../services/storageService";

const STORAGE_KEY = "career_jobs";

const getInitialJobs = () => {
  return storageService.getItem(STORAGE_KEY, []);
};

function JobsProvider({ children }) {
  const [jobs, setJobs] = useState(getInitialJobs);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    storageService.setItem(STORAGE_KEY, jobs);
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
        job.id === id ? { ...job, isSaved: !job.isSaved } : job,
      ),
    );
  };

  const unsaveJob = (id) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, isSaved: false } : job)),
    );
  };

  const applyJob = (id) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, isApplied: true } : job)),
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
    [jobs, savedJobs, appliedJobs, selectedJob],
  );

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
}

export default JobsProvider;
