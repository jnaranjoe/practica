// src/pages/admin/SettingsPage.jsx
import React from "react";
import { Box, Typography, Button, Stack, Paper, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SettingsPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Configuración
      </Typography>
      <Paper
        sx={{
          p: 3,
          mt: 3,
          maxWidth: "400px",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack spacing={2} divider={<Divider />}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Cerrar Sesión
            </Typography>

            <Button variant="contained" color="error" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default SettingsPage;
