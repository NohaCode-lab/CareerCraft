import { useMemo, useState } from "react";
import AuthContext from "./auth-context";

const STORAGE_KEY = "career_user";

const getInitialUser = () => {
  try {
    const savedUser = window.localStorage.getItem(STORAGE_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);

  const login = (userData) => {
    setUser(userData);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  const updateUser = (updates) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;

      const updatedUser = {
        ...prevUser,
        ...updates,
      };

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
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
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;