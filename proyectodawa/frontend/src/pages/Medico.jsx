import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Alert, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material"; 
import TablaPersonalMedico from "../components/TablaMedico"; 
import MedicoFormModal from "../components/MedicoFormModal"; 

const apiUrl = import.meta.env.VITE_API_URL;

export default function Medico() {
  
  const [personalMedico, setPersonalMedico] = useState([]); // Almacena la lista de personal médico obtenida de la API
  const [error, setError] = useState(null); // Almacena mensajes de error para mostrar al usuario
  const [selectedMedico, setSelectedMedico] = useState(null); // Guarda el objeto del médico seleccionado para editar o ver
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla la visibilidad del modal de formulario
  const [isViewing, setIsViewing] = useState(false); // Indica si el modal está en modo de visualización (true) o edición (false)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false); // Controla la visibilidad del diálogo de confirmación para eliminar
  const [medicoToDelete, setMedicoToDelete] = useState(null); // Almacena el médico que se va a eliminar lógicamente

  // Función asíncrona para obtener la lista de personal médico desde la API
  const fetchPersonalMedico = async () => {
    try {
      setError(null); // Limpia cualquier error previo antes de la nueva solicitud
      const response = await axios.get(`${apiUrl}/security/Medic/list`); // Realiza la petición GET a la API

      if (response.data.result) {
        setPersonalMedico(response.data.data); 
      } else {
        
        setError(response.data.message || 'Error al obtener personal médico.');
        console.error('Error en respuesta del servidor:', response.data.message);
      }
    } catch (err) {
      
      console.error('Error al conectar con la API de personal médico:', err);
      if (err.response) {
        setError(`Error del servidor: ${err.response.data.message || err.response.statusText}`);
      } else if (err.request) {
        setError('Error de red: No se pudo conectar con el servidor.');
      } else {
        setError(`Error inesperado: ${err.message}`);
      }
    }
  };

  // useEffect para cargar el personal médico cuando el componente se monta
  useEffect(() => {
    fetchPersonalMedico();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  // Función para manejar la edición de un médico
  const handleEdit = (medico) => {
    setSelectedMedico(medico); // Establece el médico seleccionado
    setIsViewing(false); // Cambia al modo edición
    setIsModalOpen(true); // Abre el modal
  };

  // Función para manejar la visualización de un médico (solo lectura)
  const handleView = (medico) => {
    setSelectedMedico(medico); // Establece el médico seleccionado
    setIsViewing(true); // Cambia al modo de visualización
    setIsModalOpen(true); // Abre el modal
  };

  // Función para cerrar el modal de formulario
  const handleCloseModal = () => {
    setIsModalOpen(false); // Cierra el modal
    setSelectedMedico(null); // Limpia el médico seleccionado
    setIsViewing(false); // Restablece el modo de visualización
  };

  // --- Funciones para la Eliminación Lógica ---
  // Abre el diálogo de confirmación para eliminar un médico
  const handleClickDelete = (medico) => {
    setMedicoToDelete(medico); // Guarda el médico que se quiere eliminar
    setOpenConfirmDialog(true); // Abre el diálogo de confirmación
  };

  // Cierra el diálogo de confirmación de eliminación
  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false); // Cierra el diálogo
    setMedicoToDelete(null); // Limpia el médico a eliminar
  };

  // Confirma y ejecuta la eliminación lógica del médico
  const handleConfirmDelete = async () => {
    if (!medicoToDelete) return; // Si no hay médico seleccionado para eliminar, no hace nada

    try {
      setError(null); 

      // Prepara el payload con el ID del médico y el estado 'false' 
      const payload = {
        med_id: medicoToDelete.med_id,
        med_state: 'false' // 'false' indica una eliminación lógica 
      };

      // Envía la solicitud PUT a la API para eliminar lógicamente
      const response = await axios.put(`${apiUrl}/security/Medic/delete`, payload);

      if (response.data.result) {
        fetchPersonalMedico(); // Si la eliminación lógica es exitosa, recarga la lista de médicos
        alert(`Médico ${medicoToDelete.per_names} ${medicoToDelete.per_surnames} eliminado lógicamente correctamente.`);
      } else {
        setError(response.data.message || 'Error al inactivar personal médico.');
        console.error('Error en respuesta del servidor al eliminar:', response.data.message);
      }
    } catch (err) {
      console.error('Error al conectar con la API de eliminación:', err);
      if (err.response) {
        setError(`Error del servidor: ${err.response.data.message || err.response.statusText}`);
      } else if (err.request) {
        setError('Error de red: No se pudo conectar con el servidor.');
      } else {
        setError(`Error inesperado: ${err.message}`);
      }
    } finally {
      handleCloseConfirmDialog(); 
    }
  };

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Alert severity="error">
          <Typography variant="h6">Error al cargar el personal médico:</Typography>
          <Typography>{error}</Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      {/* Componente de la tabla que muestra la lista de médicos */}
      <TablaPersonalMedico
        personalMedico={personalMedico} // Pasa la lista de médicos
        onEdit={handleEdit} // Pasa la función para manejar la edición
        onView={handleView} // Pasa la función para manejar la visualización
        onDelete={handleClickDelete} // Pasa la función para iniciar la eliminación lógica
      />

      {/* Modal para ver/editar un médico (se muestra solo si isModalOpen es true) */}
      {isModalOpen && (
        <MedicoFormModal
          open={isModalOpen} // Controla si el modal está abierto
          onClose={handleCloseModal} // Función para cerrar el modal
          medico={selectedMedico} // Pasa el médico seleccionado para prellenar el formulario
          isViewing={isViewing} // Indica si el modal es para ver o editar
          onUpdateSuccess={fetchPersonalMedico} // Función para recargar los datos de la tabla después de una actualización exitosa
        />
      )}

      {/* Diálogo de confirmación para la eliminación lógica */}
      <Dialog
        open={openConfirmDialog} // Controla si el diálogo está abierto
        onClose={handleCloseConfirmDialog} // Función para cerrar el diálogo
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmar eliminación "}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que quieres **eliminar lógicamente** al médico{' '}
            <Typography component="span" fontWeight="bold">
              {medicoToDelete ? `${medicoToDelete.per_names} ${medicoToDelete.per_surnames}` : ''}
            </Typography>
            ? Su estado cambiará a 'Inactivo'.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Inactivar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}