//

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/JWTContext";
import Router from "./routes";

// ----------------------------------------

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
