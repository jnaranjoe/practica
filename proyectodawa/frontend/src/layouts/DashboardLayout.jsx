// src/layouts/DashboardLayout.jsx
import React, { useMemo } from "react";
import { Outlet } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import SideMenu from "../components/SideMenu";
import AppNavbar from "../components/AppNavbar";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

import {
  adminMenuItems,
  secretarioMenuItems,
  medicoMenuItems,
  commonSecondaryMenuItems,
} from "../config/menuItemsConfig";

const DashboardLayout = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const menuItems = useMemo(() => {
    const role = user?.role?.toLowerCase();
    if (role === "admin") return adminMenuItems;
    if (role === "secretario/a" || role === "secretario")
      return secretarioMenuItems;
    if (role === "medico") return medicoMenuItems;
    return [];
  }, [user]);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <SideMenu
        mainListItems={menuItems}
        secondaryListItems={commonSecondaryMenuItems}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          pt: isMobile ? 10 : 3,
        }}
      >
        {isMobile ? <AppNavbar /> : <Header />}

        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
