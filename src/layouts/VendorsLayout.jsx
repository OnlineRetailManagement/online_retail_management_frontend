//

import React from "react";
import { Outlet } from "react-router-dom";

// ----------------------------------------

export default function VendorsLayout() {
  // TODO: Add common vendors layout design here ...
  // maybe common sidebar or header or something like that ...

  return (
    <div>
      <Outlet />
    </div>
  );
}
