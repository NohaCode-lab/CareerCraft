import { useContext } from "react";
import AuthContext from "../context/auth-context";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider. Make sure AuthProvider wraps your app in main.jsx or AppProviders.jsx."
    );
  }

  const {
    user = null,
    isAuthenticated = false,
    isLoading = false,
    error = null,
    login,
    logout,
    register,
    updateUser,
    clearAuthError,
  } = context;

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    register,
    updateUser,
    clearAuthError,
  };
};

export default useAuth;