import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { INDEX_ELEMENT, LEGACY_REDIRECTS, ROUTES } from "./routes";

/**
 * Route table only. The <HashRouter> lives in App.jsx so that AppNavigation,
 * which renders <Link>s, sits inside router context.
 */
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={INDEX_ELEMENT} />
      {ROUTES.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      {LEGACY_REDIRECTS.map(({ from, to }) => (
        <Route key={from} path={from} element={<Navigate to={to} replace />} />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
