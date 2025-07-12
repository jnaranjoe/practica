import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const PacienteDeleteDialog = ({ open, onClose, onConfirm, paciente }) => {
  const nombreCompleto = paciente
    ? `${paciente.per_names} ${paciente.per_surnames}`
    : "este paciente";

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title">
      <DialogTitle id="alert-dialog-title">Confirmar Eliminación</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Estás seguro de que quieres eliminar al paciente{" "}
          <strong>{nombreCompleto}</strong>?
          <br />
          <br />
          Esta acción cambiará su estado a inactivo.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: "16px 24px" }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onConfirm} color="error" variant="contained" autoFocus>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PacienteDeleteDialog;
