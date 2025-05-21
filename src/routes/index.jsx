//

import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
// pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/NotFound";

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

    // default path ...
    { path: "not-found", element: <NotFound /> },
    { path: "*", element: <Navigate to="/not-found" replace /> },
  ]);
}
