import { useContext } from 'react';
import { ApplicationsContext } from '../context/ApplicationsContext';

const useApplications = () => {
  const context = useContext(ApplicationsContext);

  if (!context) {
    return {
      applications: [],
      groupedApplications: {
        wishlist: [],
        applied: [],
        interview: [],
        offer: [],
        rejected: [],
      },
      selectedApplication: null,
      addApplication: () => {},
      updateApplication: () => {},
      removeApplication: () => {},
      selectApplication: () => {},
      clearSelectedApplication: () => {},
    };
  }

  const {
    applications = [],
    groupedApplications = {
      wishlist: [],
      applied: [],
      interview: [],
      offer: [],
      rejected: [],
    },
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
