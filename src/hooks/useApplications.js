import { useContext } from "react";
import ApplicationsContext from "../context/applications-context";

const useApplications = () => {
  const context = useContext(ApplicationsContext);

  if (!context) {
    throw new Error("useApplications must be used within ApplicationsProvider");
  }

  const {
    applications,
    addApplication,
    updateApplication,
    removeApplication,
    selectApplication,
    selectedApplication,
  } = context;

  return {
    applications,
    selectedApplication,

    addApplication,
    updateApplication,
    removeApplication,
    selectApplication,
  };
};

export default useApplications;