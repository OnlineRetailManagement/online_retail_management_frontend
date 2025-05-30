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
import VendorsLayout from "../layouts/VendorsLayout";
import AdminsLayout from "../layouts/AdminsLayout";
// @users
import UsersDashboard from "../pages/Users/Dashboard";
import Profile from "../pages/Users/Profile";
// @vendors
import VendorsDashboard from "../pages/Vendors/Dashboard";
// @admin
import AdminsDashboard from "../pages/Admin/Dashboard";
import AdminsProducts from "../pages/Admin/Products";
import AdminsUsers from "../pages/Admin/Users";
import AdminsVendors from "../pages/Admin/Vendors";
import AdminsProfile from "../pages/Admin/Profile";

// ----------------------------------------

export default function Router() {
  return useRoutes([
    // redirect user to auth page
    {
      path: "/",
      element: <Navigate to="/auth/login" replace />,
    },

    // auth routes
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

    // users routes
    {
      path: "user",
      element: (
        <RoleBasedGuard accessibleRoles="user">
          <UsersLayout />
        </RoleBasedGuard>
      ),
      children: [
        {
          path: "dashboard",
          element: <UsersDashboard />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },

    // vendors routes
    {
      path: "vendor",
      element: (
        <RoleBasedGuard accessibleRoles="vendor">
          <VendorsLayout />
        </RoleBasedGuard>
      ),
      children: [
        {
          path: "dashboard",
          element: <VendorsDashboard />,
        },
      ],
    },

    // admins routes
    {
      path: "admin",
      element: (
        <RoleBasedGuard accessibleRoles="admin">
          <AdminsLayout />
        </RoleBasedGuard>
      ),
      children: [
        {
          path: "dashboard",
          element: <AdminsDashboard />,
        },
        {
          path: "products",
          element: <AdminsProducts />,
        },
        {
          path: "users",
          element: <AdminsUsers />,
        },
        {
          path: "vendors",
          element: <AdminsVendors />,
        },
        {
          path: "profile",
          element: <AdminsProfile />,
        },
      ],
    },

    // default path ...
    { path: "not-found", element: <NotFound /> },
    { path: "*", element: <Navigate to="/not-found" replace /> },
  ]);
}
