import React, { createContext, useMemo, useState } from "react";
import * as storageService from "../services/storageService";

const STORAGE_KEY = "career_user";

export interface UserProfile {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  [key: string]: any;
}

export interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (userData: UserProfile) => void;
  logout: () => void;
  updateUser: (updates: Partial<UserProfile>) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getInitialUser = (): UserProfile | null => {
  return storageService.getItem<UserProfile | null>(STORAGE_KEY, null);
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProfile | null>(getInitialUser);

  const login = (userData: UserProfile) => {
    setUser(userData);
    storageService.setItem(STORAGE_KEY, userData);
  };

  const logout = () => {
    setUser(null);
    storageService.removeItem(STORAGE_KEY);
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;

      const updatedUser = {
        ...prevUser,
        ...updates,
      };

      storageService.setItem(STORAGE_KEY, updatedUser);
      return updatedUser;
    });
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
      updateUser,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
