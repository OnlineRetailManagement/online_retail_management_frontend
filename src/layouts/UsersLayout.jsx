//

import React from "react";
import { Outlet } from "react-router-dom";

// ----------------------------------------

export default function UsersLayout() {
  // TODO: Add common users layout design here ...
  // maybe common sidebar or header or something like that ...

  return (
    <div>
      <Outlet />
    </div>
  );
}
