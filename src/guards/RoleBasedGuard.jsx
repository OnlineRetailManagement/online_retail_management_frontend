//

import React from "react";
import { Link } from "react-router-dom";
// routes
import { ADMIN_PATHS, USER_PATHS, VENDOR_PATHS } from "../routes/paths";

// ----------------------------------------------------------------------

const useCurrentRole = () => {
  const currentUser = JSON.parse(window.localStorage.getItem("userData"));

  if (currentUser?.role === "user") return "user";
  else if (currentUser?.role === "vendor") return "vendor";
  else if (currentUser?.role === "admin") return "admin";
  else return null;
};

export default function RoleBasedGuard({ accessibleRoles, children }) {
  const currentRole = useCurrentRole();

  // if user role doesnt match, show the restricted ui and link to go back to the login page ...
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
                    : USER_PATHS.dashboard
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
