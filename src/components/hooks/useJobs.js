
import { useContext } from "react";
import JobsContext from "../context/jobs-context";

function useJobs() {
  const context = useContext(JobsContext);

  if (!context) {
    throw new Error("useJobs must be used within JobsProvider");
  }

  return context;
}

export default useJobs;