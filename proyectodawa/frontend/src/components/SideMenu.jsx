// src/components/SideMenu.jsx
import React from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuContent from "./MenuContent";
// Se elimina la importación de OptionsMenu
import { useAuth } from "../context/AuthContext";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
    borderRight: "1px solid",
    borderColor: "divider",
  },
});

export default function SideMenu({ mainListItems, secondaryListItems }) {
  const { user } = useAuth();

  const userEmail = user?.user_mail || "cargando...";
  const userAvatarLetter = userEmail[0]?.toUpperCase() || "U";

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
        },
      }}
    >
      <Box
        sx={{
          overflow: "auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <MenuContent
          mainListItems={mainListItems}
          secondaryListItems={secondaryListItems}
        />
      </Box>

      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1.5,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Avatar sizes="small" sx={{ width: 32, height: 32 }}>
          {userAvatarLetter}
        </Avatar>
        <Box sx={{ mr: "auto" }}>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {userEmail}
          </Typography>
        </Box>
      </Stack>
    </Drawer>
  );
}
