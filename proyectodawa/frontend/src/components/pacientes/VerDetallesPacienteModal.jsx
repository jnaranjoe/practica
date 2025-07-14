// src/components/pacientes/VerDetallesPacienteModal.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Divider,
  Button,
  Stack,
  Paper,
  Grid,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

const VerDetallesPacienteModal = ({
  open,
  onClose,
  paciente,
  onEditHistory,
}) => {
  // Si no hay paciente seleccionado, no renderizamos nada para evitar errores
  if (!paciente) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Detalles de: {paciente.per_names} {paciente.per_surnames}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Columna Izquierda: Información del Paciente */}
          <Grid item xs={12} md={5}>
            <Stack spacing={2}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Datos Personales
                </Typography>
                {/* --- Renderizado Condicional --- */}
                {/* Cada campo solo se muestra si tiene un valor */}
                {paciente.per_identification && (
                  <Typography>
                    <strong>Identificación:</strong>{" "}
                    {paciente.per_identification}
                  </Typography>
                )}
              </Paper>

              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Información Médica
                </Typography>
                {paciente.pat_medical_conditions && (
                  <Typography>
                    <strong>Condiciones:</strong>{" "}
                    {paciente.pat_medical_conditions}
                  </Typography>
                )}
                {paciente.pat_code && (
                  <Typography>
                    <strong>Aplica terapias:</strong>{" "}
                    {paciente.pat_code}
                  </Typography>
                )}
                {paciente.pat_allergies && (
                  <Typography>
                    <strong>Alergias:</strong> {paciente.pat_allergies}
                  </Typography>
                )}
                {paciente.btp_type && (
                  <Typography>
                    <strong>Tipo de Sangre:</strong> {paciente.btp_type}
                  </Typography>
                )}
              </Paper>

              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Contacto de Emergencia
                </Typography>
                {paciente.pat_emergency_contact_name && (
                  <Typography>
                    <strong>Nombre:</strong>{" "}
                    {paciente.pat_emergency_contact_name}
                  </Typography>
                )}
                {paciente.pat_emergency_contact_phone && (
                  <Typography>
                    <strong>Teléfono:</strong>{" "}
                    {paciente.pat_emergency_contact_phone}
                  </Typography>
                )}
              </Paper>
            </Stack>
          </Grid>

          {/* Columna Derecha: Historial Clínico */}
          <Grid item xs={12} md={7}>
            <Typography variant="h6" gutterBottom>
              Historial Clínico
            </Typography>
            {paciente.historiasClinicas &&
            paciente.historiasClinicas.length > 0 ? (
              <Stack spacing={2}>
                {paciente.historiasClinicas.map((historia) => (
                  <Paper
                    key={historia.hist_id}
                    variant="outlined"
                    sx={{ p: 2 }}
                  >
                    <Typography>
                      <strong>Motivo:</strong> {historia.hist_primary_complaint}
                    </Typography>
                    <Typography>
                      <strong>Tratamiento:</strong>{" "}
                      {historia.hist_current_treatment}
                    </Typography>
                    <Typography>
                      <strong>Notas:</strong> {historia.hist_notes}
                    </Typography>
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => onEditHistory(historia)}
                      sx={{ mt: 1 }}
                    >
                      Editar Historia
                    </Button>
                  </Paper>
                ))}
              </Stack>
            ) : (
              <Typography color="text.secondary" sx={{ mt: 2 }}>
                No hay historias clínicas registradas.
              </Typography>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="contained">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VerDetallesPacienteModal;
