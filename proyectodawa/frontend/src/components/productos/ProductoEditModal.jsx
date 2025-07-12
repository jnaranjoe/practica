import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import ProductoForm from "./ProductoForm";
import { getTherapyTypes } from "../../api/productosApi";

const ProductoEditModal = ({
  open,
  onClose,
  producto,
  onSubmit,
  isLoading,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const [therapyTypes, setTherapyTypes] = useState([]);

  useEffect(() => {
    if (open) {
      getTherapyTypes().then(setTherapyTypes).catch(console.error);
    }
  }, [open]);

  useEffect(() => {
    if (producto) {
      reset(producto);
    }
  }, [producto, open, reset]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Editar Producto: {producto?.pro_name}</DialogTitle>
        <DialogContent dividers>
          {producto && (
            <ProductoForm
              control={control}
              errors={errors}
              isEditing={true}
              therapyTypes={therapyTypes}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : "Actualizar Producto"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProductoEditModal;