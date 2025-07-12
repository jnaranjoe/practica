// src/components/usuarios/UsuarioEditModal.jsx
import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import UsuarioForm from "./UsuarioForm";

const UsuarioEditModal = ({ open, onClose, user, onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (user) {
      const formattedData = {
        ...user,
        per_birth_date: user.per_birth_date
          ? new Date(user.per_birth_date).toISOString().split("T")[0]
          : "",
      };
      reset(formattedData);
    }
  }, [user, open, reset]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          Editar Usuario
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {user && (
            <UsuarioForm control={control} errors={errors} isEditing={true} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            Guardar Cambios
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UsuarioEditModal;
