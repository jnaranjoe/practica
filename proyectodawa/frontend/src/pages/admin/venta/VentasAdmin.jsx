import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

const VentasAdmin = () => {
  const navigate = useNavigate();
  const handleRegisterInvoiceClick = () => {
    navigate("/admin/ventas/registrar");
  };

  const handleConsultInvoicesClick = () => {
    navigate("/admin/ventas/consultar");
  };

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mt: 2, mb: 3 }}
      >
        Gestión de Ventas
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button variant="contained" onClick={handleRegisterInvoiceClick}>
          Registrar Factura
        </Button>
        <Button variant="outlined" onClick={handleConsultInvoicesClick}>
          Consultar Facturas
        </Button>
      </Stack>
    </Box>
  );
};

export default VentasAdmin;
