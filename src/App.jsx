//

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/JWTContext";
import Router from "./routes";

// ----------------------------------------

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
