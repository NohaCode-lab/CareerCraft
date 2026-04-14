
import { useContext } from "react";
import ApplicationsContext from "../context/applications-context";

function useApplications() {
  const context = useContext(ApplicationsContext);

  if (!context) {
    throw new Error("useApplications must be used within ApplicationsProvider");
  }

  return context;
}

export default useApplications;