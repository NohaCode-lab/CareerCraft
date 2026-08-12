import { useContext } from 'react';
import { ApplicationsContext, ApplicationsContextType } from '../context/ApplicationsContext';
import { Application } from '../types';

export type { Application, ApplicationsContextType };

export const useApplications = (): ApplicationsContextType => {
  const context = useContext(ApplicationsContext);

  if (!context) {
    return {
      applications: [],
      groupedApplications: {
        wishlist: [],
        applied: [],
        reviewing: [],
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

  return context;
};

export default useApplications;
