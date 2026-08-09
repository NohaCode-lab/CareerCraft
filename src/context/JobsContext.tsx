import React, { createContext, useEffect, useMemo, useState } from "react";
import * as storageService from "../services/storageService";

export interface Job {
  id: string | number;
  title: string;
  company: string;
  location?: string;
  workMode?: string;
  employmentType?: string;
  seniority?: string;
  salaryRange?: any;
  postedAt?: string;
  source?: string;
  isSaved?: boolean;
  isApplied?: boolean;
  [key: string]: any;
}

export interface JobsContextType {
  jobs: Job[];
  savedJobs: Job[];
  appliedJobs: Job[];
  selectedJob: Job | null;
  addJob: (job: Job) => void;
  saveJob: (id: string | number) => void;
  unsaveJob: (id: string | number) => void;
  applyJob: (id: string | number) => void;
  selectJob: (job: Job | null) => void;
  clearSelectedJob: () => void;
}

export const JobsContext = createContext<JobsContextType | undefined>(undefined);

const STORAGE_KEY = "career_jobs";

const getInitialJobs = (): Job[] => {
  return storageService.getItem<Job[]>(STORAGE_KEY, []);
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
