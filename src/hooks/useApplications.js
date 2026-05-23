import { useContext } from "react";
import ApplicationsContext from "../context/applications-context";

const useApplications = () => {
  const context = useContext(ApplicationsContext);

  if (!context) {
    throw new Error("useApplications must be used within ApplicationsProvider");
  }

  const {
    applications,
    groupedApplications,
    addApplication,
    updateApplication,
    removeApplication,
    selectApplication,
    selectedApplication,
    clearSelectedApplication,
  } = context;

  return {
    applications,
    groupedApplications,
    selectedApplication,

    addApplication,
    updateApplication,
    removeApplication,
    selectApplication,
    clearSelectedApplication,
  };
};

export default useApplications;
