//

import React from "react";
import { Link } from "react-router-dom";
// routes
import { PATH_AUTH } from "../routes/paths";

// ----------------------------------------------------------------------

const useCurrentRole = () => {
  const currentUser = JSON.parse(window.localStorage.getItem("userData"));

  if (currentUser?.role === "ROLE_USER") {
    return "user";
  } else if (currentUser?.role === "ROLE_VENDOR") {
    return "vendor";
  } else if (currentUser?.role === "ROLE_ADMIN") {
    return "admin";
  } else {
    return null;
  }
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
                to={PATH_AUTH.login}
                className="underline underline-offset-4"
              >
                Login Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
