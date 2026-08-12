import { useContext } from 'react';
import { JobsContext, JobsContextType } from '../context/JobsContext';
import { Job } from '../types';

export type { Job, JobsContextType };

export const useJobs = (): JobsContextType => {
  const context = useContext(JobsContext);

  if (!context) {
    return {
      jobs: [],
      savedJobs: [],
      appliedJobs: [],
      selectedJob: null,
      addJob: () => {},
      saveJob: () => {},
      unsaveJob: () => {},
      applyJob: () => {},
      selectJob: () => {},
      clearSelectedJob: () => {},
    };
  }

  return context;
};

export default useJobs;
