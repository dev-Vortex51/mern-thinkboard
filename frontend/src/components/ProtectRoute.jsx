import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
