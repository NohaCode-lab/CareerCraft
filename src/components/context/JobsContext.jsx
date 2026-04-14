
import { useMemo, useState } from "react";
import JobsContext from "./jobs-context";

function JobsProvider({ children }) {
  const [jobs, setJobs] = useState([]);

  const addJob = (job) => {
    setJobs((prev) => [...prev, job]);
  };

  const value = useMemo(
    () => ({
      jobs,
      addJob,
    }),
    [jobs]
  );

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
}

export default JobsProvider;