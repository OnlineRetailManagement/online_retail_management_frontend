//

import React, { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
// routes
import {
  ADMIN_PATHS,
  PATH_AUTH,
  USER_PATHS,
  VENDOR_PATHS,
} from "../routes/paths";
// hooks
import useAuth from "../hooks/useAuth";
// pages
import Login from "../pages/auth/Login";

// ----------------------------------------------------------------------

const useCurrentRole = () => {
  const currentUser = JSON.parse(window.localStorage.getItem("userData"));

  if (currentUser?.userRole === "user") return "user";
  else if (currentUser?.userRole === "vendor") return "vendor";
  else if (currentUser?.userRole === "admin") return "admin";
  else return null;
};

export default function RoleBasedGuard({ accessibleRoles, children }) {
  const { isInitialized, isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const currentRole = useCurrentRole();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isInitialized) {
    return <p>Loading ...</p>;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Navigate to={PATH_AUTH.login} replace />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  // if user userRole doesnt match, show the restricted ui and link to go back to the login page ...
  if (!accessibleRoles.includes(currentRole)) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6 border p-6 rounded-2xl">
            <div className="mt-4 text-sm">
              Oops, Seems like you don't have permission to access this page
              ...!!!
            </div>

            <div className="mt-4 text-sm">
              Go back to{" "}
              <Link
                to={
                  currentRole === "admin"
                    ? ADMIN_PATHS.dashboard
                    : currentRole === "vendor"
                    ? VENDOR_PATHS.dashboard
                    : USER_PATHS.products
                }
                className="underline underline-offset-4"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
