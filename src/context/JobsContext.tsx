import React, { useEffect, useMemo, useState } from "react";
import * as storageService from "../services/storageService";
import { STORAGE_KEYS } from "../utils/constants";
import { Job, JobsContext, JobsContextType } from "./JobsContext";

export type { Job, JobsContextType };

const STORAGE_KEY = STORAGE_KEYS.JOBS;

const getInitialJobs = (): Job[] => {
  return storageService.getItem<Job[]>(STORAGE_KEY, []) ?? [];
};

interface JobsProviderProps {
  children: React.ReactNode;
}

export function JobsProvider({ children }: JobsProviderProps) {
  const [jobs, setJobs] = useState<Job[]>(getInitialJobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    storageService.setItem(STORAGE_KEY, jobs);
  }, [jobs]);

  const addJob = (job: Job) => {
    if (!job?.id) return;

    setJobs((prev) => {
      const exists = prev.some((item) => item.id === job.id);
      return exists ? prev : [...prev, job];
    });
  };

  const saveJob = (id: string | number) => {
    setJobs((prev) =>
      prev.map((job) =>
        String(job.id) === String(id) ? { ...job, isSaved: !job.isSaved } : job,
      ),
    );
  };

  const unsaveJob = (id: string | number) => {
    setJobs((prev) =>
      prev.map((job) => (String(job.id) === String(id) ? { ...job, isSaved: false } : job)),
    );
  };

  const applyJob = (id: string | number) => {
    setJobs((prev) =>
      prev.map((job) => (String(job.id) === String(id) ? { ...job, isApplied: true } : job)),
    );
  };

  const selectJob = (job: Job | null) => {
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
