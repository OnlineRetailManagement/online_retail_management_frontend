//

import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
// pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/NotFound";
// @users
import Profile from "../pages/auth/Users/Profile";
import RoleBasedGuard from "../guards/RoleBasedGuard";
import UsersLayout from "../layouts/UsersLayout";

// ----------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },

    {
      path: "/",
      element: (
        <RoleBasedGuard accessibleRoles="user">
          <UsersLayout />
        </RoleBasedGuard>
      ),
      children: [
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },

    // default path ...
    { path: "not-found", element: <NotFound /> },
    { path: "*", element: <Navigate to="/not-found" replace /> },
  ]);
}
