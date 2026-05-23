import { useContext } from "react";
import JobsContext from "../context/jobs-context";

const useJobs = () => {
  const context = useContext(JobsContext);

  if (!context) {
    throw new Error("useJobs must be used within JobsProvider");
  }

  const {
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