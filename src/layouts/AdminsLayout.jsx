//

import React from "react";
import { Outlet } from "react-router-dom";

// ----------------------------------------

export default function AdminsLayout() {
  // TODO: Add common admins layout design here ...
  // maybe common sidebar or header or something like that ...

  return (
    <div>
      <Outlet />
    </div>
  );
}
