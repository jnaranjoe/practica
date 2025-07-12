// src/components/Header.jsx
import React from "react";
import Stack from "@mui/material/Stack";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";
import ColorModeIconDropdown from "../theme/ColorModeIconDropdown";
import { IconButton, Badge } from "@mui/material"; // Se importa IconButton y Badge

export default function Header() {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: "none", md: "flex" },
        width: "100%",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        maxWidth: { sm: "100%", md: "1700px" },
        mb: 2,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />
      <Stack direction="row" sx={{ gap: 1 }}>
        {/* Se usa Badge e IconButton directamente */}
        <Badge color="error" variant="dot">
          <IconButton size="small" aria-label="Abrir notificaciones">
            <NotificationsRoundedIcon />
          </IconButton>
        </Badge>
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}
