import React, { useState, useContext } from "react";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ColorModeContext } from "./AppTheme";

export default function ColorModeIconDropdown() {
  const { mode, setMode } = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelect = (value) => {
    setMode(value);
    handleClose();
  };

  return (
    <>
      <Tooltip title="Cambiar modo de color">
        <IconButton
          onClick={handleClick}
          color="inherit"
          aria-label="Modo color"
        >
          {mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        keepMounted
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          selected={mode === "light"}
          onClick={() => handleSelect("light")}
        >
          Claro
        </MenuItem>
        <MenuItem
          selected={mode === "dark"}
          onClick={() => handleSelect("dark")}
        >
          Oscuro
        </MenuItem>
      </Menu>
    </>
  );
}
