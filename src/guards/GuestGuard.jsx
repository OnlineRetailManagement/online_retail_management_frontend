//

import { Navigate } from "react-router-dom";
// hooks
import useAuth from "../hooks/useAuth";
// routes
import { USER_PATHS } from "../routes/paths";

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={USER_PATHS.dashboard} />;
  }

  return <>{children}</>;
}
