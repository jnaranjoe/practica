// src/pages/admin/RegistrarFacturaPage.jsx
import React, { useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";

import SeleccionarPacienteModal from "../components/ventas/SeleccionarPacienteModal";
import FacturaForm from "../components/ventas/FacturaForm";

const RegistrarFacturaPage = () => {
  const [isModalOpen, setModalOpen] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setModalOpen(false);
  };

  const handleChangePatient = () => {
    setSelectedPatient(null);
    setModalOpen(true);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Registro de Nueva Factura
      </Typography>

      <SeleccionarPacienteModal
        open={isModalOpen && !selectedPatient}
        onClose={() => setModalOpen(false)}
        onSelectPatient={handlePatientSelect}
      />

      {selectedPatient ? (
        <Paper
          elevation={0}
          sx={{ mt: 2, p: 3, border: "1px solid", borderColor: "divider" }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6">
              Facturando a:{" "}
              <strong>
                {selectedPatient.per_names} {selectedPatient.per_surnames}
              </strong>
            </Typography>
            <Button variant="outlined" onClick={handleChangePatient}>
              Cambiar Paciente
            </Button>
          </Box>
          <FacturaForm patient={selectedPatient} />
        </Paper>
      ) : (
        <Typography sx={{ mt: 3 }}>
          Por favor, selecciona un paciente para comenzar la facturación...
        </Typography>
      )}
    </Box>
  );
};

export default RegistrarFacturaPage;
