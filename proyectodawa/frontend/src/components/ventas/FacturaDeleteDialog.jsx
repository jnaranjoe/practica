// src/components/ventas/FacturaDeleteDialog.jsx
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

const FacturaDeleteDialog = ({
  open,
  onClose,
  onConfirm,
  invoiceNumber,
  loading,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Confirmar Anulación de Factura
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          ¿Estás seguro de que deseas anular la factura{" "}
          <strong>{invoiceNumber}</strong>? Esta acción no se puede deshacer.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={loading}
          autoFocus
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Anular Factura"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FacturaDeleteDialog;
