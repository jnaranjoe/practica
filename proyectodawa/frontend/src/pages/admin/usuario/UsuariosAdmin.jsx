import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
const UsuariosAdmin = () => {
  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate("/admin/usuarios/registrar");
  };

  const handleConsultClick = () => {
    navigate("/admin/usuarios/consultar");
  };

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mt: 2, mb: 3 }}
      >
        Gestión de Usuarios
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button variant="contained" onClick={handleRegisterClick}>
          Registrar Usuario
        </Button>
        <Button variant="outlined" onClick={handleConsultClick}>
          Consultar Usuarios
        </Button>
      </Stack>
    </Box>
  );
};

export default UsuariosAdmin;
