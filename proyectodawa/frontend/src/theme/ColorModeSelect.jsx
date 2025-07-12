import React, { useContext } from "react";
import { Select, MenuItem, Box } from "@mui/material";
import { ColorModeContext } from "./AppTheme"; // Ruta correcta dentro de 'theme'

export default function ColorModeSelect() {
  const { mode, setMode } = useContext(ColorModeContext);

  const handleChange = (event) => {
    setMode(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <Select
        value={mode}
        onChange={handleChange}
        size="small"
        sx={{ color: "text.primary" }}
        aria-label="Seleccionar modo de color"
      >
        <MenuItem value="light">Claro</MenuItem>
        <MenuItem value="dark">Oscuro</MenuItem>
      </Select>
    </Box>
  );
}
