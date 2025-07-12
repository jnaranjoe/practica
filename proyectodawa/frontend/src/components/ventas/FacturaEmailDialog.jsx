// src/components/ventas/FacturaEmailDialog.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";

const FacturaEmailDialog = ({
  open,
  onClose,
  onConfirm,
  invoiceNumber,
  loading,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Envío de Factura</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Estás seguro de que deseas enviar la factura{" "}
          <strong>{invoiceNumber}</strong> por correo electrónico?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          color="primary"
          variant="contained"
          disabled={loading}
          autoFocus
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Enviar Correo"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FacturaEmailDialog;
