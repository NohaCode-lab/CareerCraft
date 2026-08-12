import { createContext } from 'react';
import { Job } from '../types';

export type { Job };

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
export { default } from './JobsContext.tsx';
