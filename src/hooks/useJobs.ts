import { useContext } from 'react';
import { JobsContext } from '../context/JobsContext';

const useJobs = () => {
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

  const {
    jobs = [],
    savedJobs = [],
    appliedJobs = [],
    selectedJob = null,
    addJob,
    saveJob,
    unsaveJob,
    applyJob,
    selectJob,
    clearSelectedJob,
  } = context;

  return {
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
  };
};

export default useJobs;
