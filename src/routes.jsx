import React from "react";

import CodeIcon from "@mui/icons-material/DeveloperBoard";
import GitHubIcon from "@mui/icons-material/GitHub";
import HomeIcon from "@mui/icons-material/Home";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";

import { Education } from "./Education";
import { Home } from "./Home";
import { Projects } from "./Projects";
import { WorkComponent } from "./Work.jsx";
import GitHub from "./Github";
import LinkedIn from "./Linkedin";

/**
 * Single source of truth for navigation and routing.
 *
 * `AppNavigation` renders the drawer from `group`, and `AppRouter` renders a
 * <Route> per entry. Previously a nav label doubled as its URL (the drawer did
 * `window.location = "#/" + label`), which is why the route was `/work experience`
 * with a space. Paths are explicit now; keep them lowercase and space-free.
 */
export const ROUTES = [
  { label: "Home", path: "/home", icon: <HomeIcon />, element: <Home />, group: "primary" },
  { label: "Work Experience", path: "/work", icon: <WorkIcon />, element: <WorkComponent />, group: "primary" },
  { label: "Projects", path: "/projects", icon: <CodeIcon />, element: <Projects />, group: "primary" },
  { label: "Education", path: "/education", icon: <SchoolIcon />, element: <Education />, group: "primary" },
  { label: "LinkedIn", path: "/linkedin", icon: <LinkedInIcon />, element: <LinkedIn />, group: "secondary" },
  { label: "GitHub", path: "/github", icon: <GitHubIcon />, element: <GitHub />, group: "secondary" },
];

export const PRIMARY_NAV = ROUTES.filter((r) => r.group === "primary");
export const SECONDARY_NAV = ROUTES.filter((r) => r.group === "secondary");

/** The landing page ("/") renders the work timeline, matching prior behavior. */
export const INDEX_ELEMENT = <WorkComponent />;

/** Old hash URLs that should keep working. */
export const LEGACY_REDIRECTS = [{ from: "/work experience", to: "/work" }];
