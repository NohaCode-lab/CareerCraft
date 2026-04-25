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
    applications,
    saveJob,
    unsaveJob,
    applyJob,
    selectJob,
  } = context;

  return {
    jobs,
    savedJobs,
    applications,
    saveJob,
    unsaveJob,
    applyJob,
    selectJob,
  };
};

export default useJobs; 