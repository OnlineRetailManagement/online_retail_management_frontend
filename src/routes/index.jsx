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
import NavBarLayout from "../layouts/NavBarLayout";
// @users
import UsersDashboard from "../pages/Users/Dashboard";
import UsersProducts from "../pages/Users/Products";
import UsersOrders from "../pages/Users/Orders";
import UsersCart from "../pages/Users/Cart";
// @vendors
import VendorsDashboard from "../pages/Vendors/Dashboard";
import VendorsProducts from "../pages/Vendors/Products";
import VendorsAddProducts from "../pages/Vendors/AddProduct";
import VendorsOrders from "../pages/Vendors/Orders";
// @admin
import AdminsDashboard from "../pages/Admin/Dashboard";
import AdminsProducts from "../pages/Admin/Products";
import AdminsUsers from "../pages/Admin/Users";
import AdminsVendors from "../pages/Admin/Vendors";
// common
import Profile from "../pages/common/Profile";

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
          <NavBarLayout />
        </RoleBasedGuard>
      ),
      children: [
        // {
        //   path: "dashboard",
        //   element: <UsersDashboard />,
        // },
        {
          path: "products",
          element: <UsersProducts />,
        },
        {
          path: "orders",
          element: <UsersOrders />,
        },
        {
          path: "cart",
          element: <UsersCart />,
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
          <NavBarLayout />
        </RoleBasedGuard>
      ),
      children: [
        {
          path: "dashboard",
          element: <VendorsDashboard />,
        },
        {
          path: "products",
          element: <VendorsProducts />,
        },
        {
          path: "add-products",
          element: <VendorsAddProducts />,
        },
        {
          path: "orders",
          element: <VendorsOrders />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },

    // admins routes
    {
      path: "admin",
      element: (
        <RoleBasedGuard accessibleRoles="admin">
          <NavBarLayout />
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
          element: <Profile />,
        },
      ],
    },

    // default path ...
    { path: "not-found", element: <NotFound /> },
    { path: "*", element: <Navigate to="/not-found" replace /> },
  ]);
}
