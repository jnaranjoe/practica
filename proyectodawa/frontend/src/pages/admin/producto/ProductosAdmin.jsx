// src/pages/admin/ProductosAdmin.jsx
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

const ProductosAdmin = () => {
  const navigate = useNavigate();

  const handleRegisterProductClick = () => {
    navigate("/admin/productos/registrar");
  };

  const handleConsultProductsClick = () => {
    navigate("/admin/productos/consultar");
  };

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mt: 2, mb: 3 }}
      >
        Gestión de Productos
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button variant="contained" onClick={handleRegisterProductClick}>
          Registrar Producto
        </Button>
        <Button variant="outlined" onClick={handleConsultProductsClick}>
          Consultar Productos
        </Button>
      </Stack>
    </Box>
  );
};

export default ProductosAdmin;
