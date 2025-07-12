import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const MedicoDeleteDialog = ({ open, onClose, onConfirm, medico }) => {
  // Mostramos el nombre completo del médico para que el usuario esté seguro
  const nombreCompleto = medico
    ? `${medico.per_names} ${medico.per_surnames}`
    : "este médico";

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title">
      <DialogTitle id="alert-dialog-title">Confirmar Eliminación</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Estás seguro de que quieres eliminar a{" "}
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

export default MedicoDeleteDialog;
