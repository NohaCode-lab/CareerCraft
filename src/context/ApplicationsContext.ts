import { createContext } from 'react';
import { Application, Job } from '../types';

export type { Application };

export interface ApplicationsContextType {
  applications: Application[];
  groupedApplications: Record<string, Application[]>;
  selectedApplication: Application | null;
  addApplication: (job: Job) => void;
  updateApplication: (id: string | number, updates: Partial<Application>) => void;
  removeApplication: (id: string | number) => void;
  selectApplication: (app: Application | null) => void;
  clearSelectedApplication: () => void;
}

export const ApplicationsContext = createContext<ApplicationsContextType | undefined>(undefined);
export { default } from './ApplicationsContext.tsx';
