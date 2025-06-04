//

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
// @shadcn-toaster
import { Toaster } from "@/components/ui/sonner";
import { store } from "./redux/store";
//
import { AuthProvider } from "./contexts/JWTContext";
import Router from "./routes";

// ----------------------------------------

function App() {
  return (
    <AuthProvider>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <Router />
          <Toaster />
        </BrowserRouter>
      </ReduxProvider>
    </AuthProvider>
  );
}

export default App;
