import React from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloudDownload from "@mui/icons-material/CloudDownload";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";

import AppRouter from "./AppRouter";
import { PRIMARY_NAV } from "./routes";

const DRAWER_WIDTH = 240;
const RESUME_URL = process.env.PUBLIC_URL + "/resume-tucker-miller.pdf";

function NavList({ items, onNavigate, currentPath }) {
  return (
    <List>
      {items.map(({ label, path, icon }) => (
        <ListItemButton
          key={path}
          component={Link}
          to={path}
          selected={currentPath === path}
          onClick={onNavigate}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={label} />
        </ListItemButton>
      ))}
    </List>
  );
}

export default function AppNavigation() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // Preserves the original 450px threshold for showing the resume button.
  const showResume = useMediaQuery("(min-width:451px)");
  const { pathname } = useLocation();

  const handleDrawerToggle = () => setMobileOpen((open) => !open);
  const closeDrawer = () => setMobileOpen(false);

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <NavList
        items={PRIMARY_NAV}
        onNavigate={closeDrawer}
        currentPath={pathname}
      />
    </div>
  );

  return (
    <Box sx={{ display: "flex", background: "#eeeded" }}>
      <AppBar
        position="fixed"
        sx={{
          ml: { sm: `${DRAWER_WIDTH}px` },
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" color="inherit" noWrap>
              Tucker Miller
            </Typography>
          </Box>
          {showResume && (
            <IconButton
              color="inherit"
              aria-label="Download Resume"
              target="_blank"
              rel="noopener"
              href={RESUME_URL}
            >
              <Typography variant="h6" color="inherit" noWrap sx={{ mr: 2 }}>
                Download Resume
              </Typography>
              <CloudDownload />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 8,
          height: "calc(100vh - 64px)",
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <AppRouter />
      </Box>
    </Box>
  );
}
