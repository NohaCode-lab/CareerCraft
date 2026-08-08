import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      login({
        id: "demo-user-1",
        name: "Demo Candidate",
        email: "demo@careercraft.io",
        title: "Senior Full Stack Engineer",
      });
    }
  }, [isAuthenticated, login]);

  return <>{children}</>;
};

export default ProtectedRoute;
