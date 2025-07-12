// src/components/Header.jsx
import React from "react";
import Stack from "@mui/material/Stack";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";
import ColorModeIconDropdown from "../theme/ColorModeIconDropdown";
import { IconButton, Badge } from "@mui/material";

export default function Header() {
  return (
    <Stack
      direction="row"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      maxWidth={{ sm: "100%", md: "1700px" }}
      mb={2}
      spacing={2}
    >
      <NavbarBreadcrumbs />
      <Stack direction="row" sx={{ gap: 1 }}>
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}
