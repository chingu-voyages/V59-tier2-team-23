import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router";

export default function ProtectedRoute() {
  const { user, isAuthLoading } = useAuth();

  if (!user && !isAuthLoading) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
