import { useMemo, useState } from "react";
import AuthContext from "./auth-context";
import * as storageService from "../services/storageService";

const STORAGE_KEY = "career_user";

const getInitialUser = () => {
  return storageService.getItem(STORAGE_KEY, null);
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);

  const login = (userData) => {
    setUser(userData);
    storageService.setItem(STORAGE_KEY, userData);
  };

  const logout = () => {
    setUser(null);
    storageService.removeItem(STORAGE_KEY);
  };

  const updateUser = (updates) => {
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
