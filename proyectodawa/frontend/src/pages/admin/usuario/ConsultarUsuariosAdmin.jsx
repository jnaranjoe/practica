// src/pages/admin/usuario/ConsultarUsuariosAdmin.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Button, Stack, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

import { getUsers, updateUser, deleteUserRole } from "../../../api/usuariosApi";
import UsuariosTable from "../../../components/usuarios/UsuariosTable";
import UsuarioEditModal from "../../../components/usuarios/UsuarioEditModal";
import UsuarioDeleteDialog from "../../../components/usuarios/UsuarioDeleteDialog";
import { useAuth } from "../../../context/AuthContext";

const ConsultarUsuariosAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();
  const { token } = useAuth(); // Se usa en la capa de API

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      setNotification({
        open: true,
        message: "Error al cargar usuarios.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  // --- ¡FUNCIÓN CORREGIDA Y DEFINITIVA! ---
  const handleUpdateUser = async (formData) => {
    if (!selectedUser) return;
    setLoading(true);
    try {
      // 1. Creamos un objeto 'payload' limpio solo con los campos que el backend espera.
      const payload = {
        per_id: selectedUser.user_person_id, // El ID de la persona a actualizar
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
      };

      await updateUser(payload);

      setNotification({
        open: true,
        message: "Usuario actualizado con éxito",
        severity: "success",
      });
      setEditModalOpen(false);
      fetchUsers(); // Recargamos la tabla para ver los cambios
    } catch (error) {
      console.error("Error al actualizar:", error);
      setNotification({
        open: true,
        message:
          error.response?.data?.message || "Error al actualizar el usuario.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;
    setLoading(true);
    try {
      await deleteUserRole(selectedUser.id_user_rol);
      setNotification({
        open: true,
        message: "Usuario eliminado con éxito",
        severity: "success",
      });
      setDeleteDialogOpen(false);
      fetchUsers();
    } catch (error) {
      setNotification({
        open: true,
        message: "Error al eliminar",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h4" component="h1">
          Gestión de Usuarios
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/admin/usuarios/registrar")}
        >
          Registrar Usuario
        </Button>
      </Stack>

      <UsuariosTable
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      <UsuarioEditModal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        user={selectedUser}
        onSubmit={handleUpdateUser}
      />

      <UsuarioDeleteDialog
        open={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        userName={`${selectedUser?.per_names} ${selectedUser?.per_surnames}`}
      />

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

export default ConsultarUsuariosAdmin;
