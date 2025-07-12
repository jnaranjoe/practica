import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Snackbar, Alert } from "@mui/material";
import {
  getPacientes,
  updatePaciente,
  deletePaciente,
  getHistoriasClinicas,
  createHistoriaClinica,
  updateHistoriaClinica,
} from "../../../api/pacientesApi";
import PacientesTable from "../../../components/pacientes/PacientesTable";
import PacienteEditModal from "../../../components/pacientes/PacienteEditModal";
import VerDetallesPacienteModal from "../../../components/pacientes/VerDetallesPacienteModal";
import PacienteDeleteDialog from "../../../components/pacientes/PacienteDeleteDialog";
import HistoriaClinicaModal from "../../../components/pacientes/HistoriaClinicaModal";

const PacientesAdmin = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [selectedHistoria, setSelectedHistoria] = useState(null);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      const [pacientesData, historiasData] = await Promise.all([
        getPacientes(),
        getHistoriasClinicas(),
      ]);
      const pacientesConHistorias = pacientesData.map((paciente) => ({
        ...paciente,
        historiasClinicas: historiasData.filter(
          (h) => h.hist_patient_id === paciente.pat_id
        ),
      }));
      setPacientes(pacientesConHistorias);
    } catch (error) {
      setNotification({
        open: true,
        message: "Error al cargar los datos.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const handleVer = (paciente) => {
    setSelectedPaciente(paciente);
    setViewModalOpen(true);
  };
  const handleEdit = (paciente) => {
    setSelectedPaciente(paciente);
    setEditModalOpen(true);
  };
  const handleDelete = (paciente) => {
    setSelectedPaciente(paciente);
    setDeleteDialogOpen(true);
  };
  const handleAddHistory = (paciente) => {
    setSelectedPaciente(paciente);
    setSelectedHistoria(null);
    setHistoryModalOpen(true);
  };
  const handleEditHistory = (historia) => {
    const pacienteDeLaHistoria = pacientes.find(
      (p) => p.pat_id === historia.hist_patient_id
    );
    setSelectedPaciente(pacienteDeLaHistoria);
    setSelectedHistoria(historia);
    setHistoryModalOpen(true);
  };

  const handleUpdatePaciente = async (formData) => {
    if (!selectedPaciente) return;

    const payload = {
      pat_id: selectedPaciente.pat_id,
      pat_medical_conditions: formData.pat_medical_conditions,
      pat_allergies: formData.pat_allergies,
      pat_blood_type: formData.pat_blood_type,
      pat_emergency_contact_name: formData.pat_emergency_contact_name,
      pat_emergency_contact_phone: formData.pat_emergency_contact_phone,
    };


    try {

      await updatePaciente(payload);

      setEditModalOpen(false);
      fetchAllData();
      setNotification({
        open: true,
        message: "Información médica actualizada.",
        severity: "success",
      });
    } catch (error) {
      console.error("Error al actualizar paciente:", error);
      setNotification({
        open: true,
        message: "Error al actualizar la información del paciente.",
        severity: "error",
      });
    }
  };

  const handleDeleteConfirm = async () => {
    await deletePaciente(selectedPaciente.pat_id);
    setDeleteDialogOpen(false);
    fetchAllData();
    setNotification({
      open: true,
      message: "Paciente eliminado.",
      severity: "success",
    });
  };

  const handleSaveHistoria = async (formData) => {
    if (selectedHistoria) {
      await updateHistoriaClinica({
        ...formData,
        hist_id: selectedHistoria.hist_id,
      });
    } else {
      await createHistoriaClinica({
        ...formData,
        hist_patient_id: selectedPaciente.pat_id,
      });
    }
    setHistoryModalOpen(false);
    fetchAllData();
    setNotification({
      open: true,
      message: "Historial clínico guardado.",
      severity: "success",
    });
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Gestión de Pacientes
      </Typography>
      <PacientesTable
        pacientes={pacientes}
        loading={loading}
        onVer={handleVer}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddHistory={handleAddHistory}
      />
      <VerDetallesPacienteModal
        open={isViewModalOpen}
        onClose={() => setViewModalOpen(false)}
        paciente={selectedPaciente}
        onEditHistory={handleEditHistory}
      />
      <PacienteEditModal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        paciente={selectedPaciente}
        onSubmit={handleUpdatePaciente}
        isLoading={loading}
      />
      <HistoriaClinicaModal
        open={isHistoryModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        paciente={selectedPaciente}
        historia={selectedHistoria}
        onSubmit={handleSaveHistoria}
      />
      <PacienteDeleteDialog
        open={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        paciente={selectedPaciente}
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

export default PacientesAdmin;