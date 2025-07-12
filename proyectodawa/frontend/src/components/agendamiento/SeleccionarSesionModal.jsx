// src/components/agendamiento/SeleccionarSesionModal.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Chip,
} from "@mui/material";

const SeleccionarSesionModal = ({
  open,
  onClose,
  availableSessions,
  onSelectSession,
  loading,
  error,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Seleccionar Sesión para Agendar</DialogTitle>
      <DialogContent dividers>
        {loading && (
          <Box display="flex" justifyContent="center" my={3}>
            <CircularProgress />
          </Box>
        )}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && (
          <List>
            {availableSessions.length > 0 ? (
              availableSessions.map((sesion) => (
                // Se usa el ID único de la sesión (sec_id) como key
                <ListItem key={sesion.sec_id} disablePadding>
                  <ListItemButton onClick={() => onSelectSession(sesion)}>
                    <ListItemText
                      // Muestra el nombre de la terapia y el número de sesión
                      primary={sesion.pro_name}
                      secondary={`Factura: ${sesion.inv_number} - Sesión Nro: ${sesion.sec_ses_number}`}
                    />
                    <Chip label="Seleccionar" color="primary" />
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <Typography
                sx={{ p: 2, textAlign: "center" }}
                color="text.secondary"
              >
                Este paciente no tiene sesiones disponibles para agendar.
              </Typography>
            )}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SeleccionarSesionModal;
