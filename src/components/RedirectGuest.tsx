import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router";

export default function RedirectGuest() {
  const { user, isAuthLoading, isGuestLogin } = useAuth();

  if (!user && !isAuthLoading) {
    if (isGuestLogin === false) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
}
