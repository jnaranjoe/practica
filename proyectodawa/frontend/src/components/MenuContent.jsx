// src/components/MenuContent.jsx
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";

import { useNavigate, useLocation } from "react-router-dom";

export default function MenuContent({ mainListItems, secondaryListItems }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleListItemClick = (path) => {
    navigate(path);
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {/* Asegúrate de que mainListItems sea un array antes de mapear */}
        {mainListItems &&
          mainListItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                selected={
                  location.pathname === item.path ||
                  (item.path === "/admin/home" &&
                    location.pathname === "/admin")
                }
                onClick={() => handleListItemClick(item.path)} // Pasa solo la ruta
              >
                <ListItemIcon>
                  {item.icon && React.createElement(item.icon)}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <List dense>
        {secondaryListItems &&
          secondaryListItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => handleListItemClick(item.path)}
              >
                <ListItemIcon>
                  {/* ¡CAMBIO CLAVE AQUÍ! Renderiza el icono como un componente */}
                  {item.icon && React.createElement(item.icon)}
                  {/* Alternativa más concisa: {item.icon && <item.icon />} */}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Stack>
  );
}
