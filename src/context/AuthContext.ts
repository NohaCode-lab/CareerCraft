import { createContext } from 'react';

export interface UserProfile {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  title?: string;
  location?: string;
  summary?: string;
  skills?: string[];
  bio?: string;
  avatarUrl?: string;
}

export interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (userData: UserProfile) => void;
  logout: () => void;
  updateUser: (updates: Partial<UserProfile>) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export { default } from './AuthContext.tsx';
