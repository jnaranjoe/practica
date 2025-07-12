// src/pages/admin/usuario/RegistrarUsuarioAdmin.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import UsuarioForm from "../../../components/usuarios/UsuarioForm";
import { createUser } from "../../../api/usuariosApi";

const RegistrarUsuarioAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleCreateUser = async (formData) => {
    setIsLoading(true);
    try {
      const payload = {
        per_identification: formData.per_identification,
        per_names: formData.per_names,
        per_surnames: formData.per_surnames,
        per_mail: formData.per_mail,
        per_phone: formData.per_phone,
        per_country: formData.per_country,
        per_city: formData.per_city,
        per_address: formData.per_address,
        per_birth_date: formData.per_birth_date,
        per_genre_id: parseInt(formData.per_genre_id, 10),
        per_marital_status_id: parseInt(formData.per_marital_status_id, 10),
        id_rol: parseInt(formData.id_rol, 10),
      };
      await createUser(payload);
      setNotification({
        open: true,
        message: "¡Usuario registrado!",
        severity: "success",
      });
      setTimeout(() => navigate("/admin/usuarios/consultar"), 2000);
    } catch (error) {
      setNotification({
        open: true,
        message: error.response?.data?.message || "Error al registrar.",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Registrar Nuevo Usuario
      </Typography>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <Paper
          elevation={0}
          sx={{ p: 3, border: "1px solid", borderColor: "divider" }}
        >
          <UsuarioForm control={control} errors={errors} />
        </Paper>
        <Box sx={{ mt: 3, display: "flex" }}>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : "Registrar Usuario"}
          </Button>
        </Box>
      </form>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert severity={notification.severity} sx={{ width: "100%" }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegistrarUsuarioAdmin;
