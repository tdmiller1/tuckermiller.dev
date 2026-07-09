import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { HashRouter } from "react-router-dom";

import AppNavigation from "./AppNavigation";

export default function App() {
  return (
    <HashRouter>
      <CssBaseline />
      <AppNavigation />
    </HashRouter>
  );
}
