//

import { Navigate } from "react-router-dom";
// hooks
import useAuth from "../hooks/useAuth";
// routes
import { ADMIN_PATHS, USER_PATHS, VENDOR_PATHS } from "../routes/paths";

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  const { isAuthenticated } = useAuth();

  const userData = JSON.parse(window.localStorage.getItem("userData"));
  const userRole = userData?.role ?? null;

  if (isAuthenticated) {
    if (userRole === "user") return <Navigate to={USER_PATHS.dashboard} />;
    else if (userRole === "vendor")
      return <Navigate to={VENDOR_PATHS.dashboard} />;
    else if (userRole === "admin")
      return <Navigate to={ADMIN_PATHS.dashboard} />;
  }

  return <>{children}</>;
}
