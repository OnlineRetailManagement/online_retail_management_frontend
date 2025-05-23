//

import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
// pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/NotFound";
// guards
import GuestGuard from "../guards/GuestGuard";
import RoleBasedGuard from "../guards/RoleBasedGuard";
// layouts
import UsersLayout from "../layouts/UsersLayout";
// @users
import Dashboard from "../pages/auth/Users/Dashboard";
import Profile from "../pages/auth/Users/Profile";

// ----------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: "register",
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
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
          path: "/dashboard",
          element: <Dashboard />,
        },
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
