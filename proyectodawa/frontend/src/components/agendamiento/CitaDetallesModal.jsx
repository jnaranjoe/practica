// src/components/agendamiento/CitaDetallesModal.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  Stack,
} from "@mui/material";

const CitaDetallesModal = ({ open, onClose, event, onConsume, loading }) => {
  if (!event) return null;

  const { title, start } = event;
  const { therapist, consumed } = event.extendedProps;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Detalles de la Cita</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Paciente y Terapia
            </Typography>
            <Typography>{title}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Fecha y Hora
            </Typography>
            <Typography>
              {start.toLocaleString("es-EC", {
                dateStyle: "long",
                timeStyle: "short",
              })}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Terapeuta
            </Typography>
            <Typography>{therapist}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Estado
            </Typography>
            <Chip
              label={consumed ? "Realizada" : "Pendiente"}
              color={consumed ? "success" : "warning"}
              size="small"
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: "16px 24px" }}>
        <Button onClick={onClose}>Cerrar</Button>
        <Button
          variant="contained"
          onClick={() => onConsume(event.id)}
          disabled={consumed || loading}
        >
          {consumed ? "Cita Realizada" : "Marcar como Realizada"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CitaDetallesModal;
