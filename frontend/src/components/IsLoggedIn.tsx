import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
import LoadingComponent from "./Loading";

interface Props {
  children: React.ReactNode;
}

const IsLoggedIn: React.FC<Props> = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function verifyAuth(): Promise<void> {
      try {
        await axios.get("http://localhost:4000/auth/verify");
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsChecking(false);
      }
    }

    void verifyAuth();
  }, [location.pathname]);

  if (isChecking) {
    return <LoadingComponent message="Checking session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default IsLoggedIn;
