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
    login,
    logout,
    updateUser,
  } = context;

  return {
    user,
    isAuthenticated,
    login,
    logout,
    updateUser,
  };
};

export default useAuth;