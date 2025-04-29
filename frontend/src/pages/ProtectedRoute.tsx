import { JSX, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const context = useContext(UserContext);

  if (!context) return <Navigate to="/" />;

  const { user, loading } = context;

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
