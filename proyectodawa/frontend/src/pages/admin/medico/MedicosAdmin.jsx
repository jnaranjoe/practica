import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Snackbar, Alert } from "@mui/material";
import {
  getMedicos,
  updateMedico,
  deleteMedico,
} from "../../../api/medicosApi";
import MedicosTable from "../../../components/medicos/MedicosTable";
import MedicoEditModal from "../../../components/medicos/MedicoEditModal";
import MedicoDeleteDialog from "../../../components/medicos/MedicoDeleteDialog";

const MedicosAdmin = () => {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedico, setSelectedMedico] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchMedicos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getMedicos();
      setMedicos(data);
    } catch (error) {
      setNotification({
        open: true,
        message: "Error al cargar el personal médico.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedicos();
  }, [fetchMedicos]);

  const handleEdit = (medico) => {
    setSelectedMedico(medico);
    setEditModalOpen(true);
  };

  const handleDelete = (medico) => {
    setSelectedMedico(medico);
    setDeleteDialogOpen(true);
  };

  const handleUpdate = async (formData) => {
    if (!selectedMedico) return;
    setLoading(true);
    try {
      const payload = {
        med_id: selectedMedico.med_id,
        med_type_id: parseInt(formData.med_type_id, 10),
        med_specialty: formData.med_specialty,
      };
      await updateMedico(payload);
      setNotification({
        open: true,
        message: "Médico actualizado con éxito.",
        severity: "success",
      });
      setEditModalOpen(false);
      fetchMedicos();
    } catch (error) {
      setNotification({
        open: true,
        message: "Error al actualizar.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedMedico) return;
    try {
      await deleteMedico(selectedMedico.med_id);
      setNotification({
        open: true,
        message: "Médico eliminado con éxito.",
        severity: "success",
      });
      setDeleteDialogOpen(false);
      fetchMedicos();
    } catch (error) {
      setNotification({
        open: true,
        message: "Error al eliminar.",
        severity: "error",
      });
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Gestión de Personal Médico
      </Typography>
      <MedicosTable
        medicos={medicos}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <MedicoEditModal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        medico={selectedMedico}
        onSubmit={handleUpdate}
        isLoading={loading}
      />
      <MedicoDeleteDialog
        open={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        medico={selectedMedico}
      />
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert severity={notification.severity}>{notification.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default MedicosAdmin;
