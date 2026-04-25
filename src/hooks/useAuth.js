import { useContext } from "react";
import AuthContext from "../context/auth-context";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  const {
    user,
    isAuthenticated,
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