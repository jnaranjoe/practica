import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert
} from '@mui/material';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550, 
  maxHeight: '90vh', 
  overflowY: 'auto', 
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3, 
  borderRadius: 2,
};

// Componente del modal de formulario para médicos
export default function MedicoFormModal({ open, onClose, medico, isViewing, onUpdateSuccess }) {
  const [formData, setFormData] = useState({
    med_id: '',
    med_person_id: '',
    per_names: '',
    per_surnames: '',
    med_type_id: '',
    med_specialty: ''
   
  });
  const [typeMedics, setTypeMedics] = useState([]); // Almacena la lista de tipos de personal médico
  const [error, setError] = useState(null); // Para mostrar mensajes de error
  const [success, setSuccess] = useState(null); // Para mostrar mensajes de éxito

   // useEffect para inicializar el formulario cuando el prop 'medico' cambia
  useEffect(() => {
    if (medico) {
      setFormData({
        med_id: medico.med_id || '',
        med_person_id: medico.med_person_id || '',
        per_names: medico.per_names || '',
        per_surnames: medico.per_surnames || '',
        med_type_id: medico.med_type_id || '',
        med_specialty: medico.med_specialty || ''
       
      });
    }
  }, [medico]);

  // useEffect para cargar los tipos de personal médico al montar el componente
  useEffect(() => {
    const fetchTypeMedics = async () => {
      try {
        const response = await axios.get(`${apiUrl}/security/TypeMedic/list`);
        if (response.data.result) {
          setTypeMedics(response.data.data);
        } else {
          console.error('Error al obtener tipos de médico:', response.data.message);
        }
      } catch (err) {
        console.error('Error al conectar con la API de tipos de médico:', err);
      }
    };
    fetchTypeMedics();
  }, []);

  // Maneja los cambios en los campos del formulario

  const handleChange = (e) => {
    if (isViewing) return;
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Maneja el envío del formulario(edicion)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (isViewing) return;

    try {
      // Prepara el payload con los datos a actualizar
      const payload = {
        med_id: formData.med_id,
        med_type_id: formData.med_type_id,
        med_specialty: formData.med_specialty,
      };

      const response = await axios.put(`${apiUrl}/security/Medic/update`, payload);

      if (response.data.result) {
        setSuccess('¡Médico actualizado exitosamente!');
        onUpdateSuccess();
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setError(response.data.message || 'Error al actualizar médico.');
      }
    } catch (err) {
      console.error('Error al actualizar médico:', err);
      if (err.response) {
        setError(`Error del servidor: ${err.response.data.message || err.response.statusText}`);
      } else if (err.request) {
        setError('Error de red: No se pudo conectar con el servidor.');
      } else {
        setError(`Error inesperado: ${err.message}`);
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
          {isViewing ? 'Detalles del Personal Médico' : 'Editar Información del Personal Médico'}
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <TextField
          margin="normal"
          fullWidth
          label="ID Médico"
          name="med_id"
          value={formData.med_id}
          onChange={handleChange}
          disabled
        />
        <TextField
          margin="normal"
          fullWidth
          label="ID Persona"
          name="med_person_id"
          value={formData.med_person_id}
          onChange={handleChange}
          disabled={isViewing || true}
          helperText={isViewing ? "" : "Este campo no puede ser modificado"}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Nombres"
          name="per_names"
          value={formData.per_names}
          onChange={handleChange}
          disabled={isViewing || true}
          helperText={isViewing ? "" : "Este campo no puede ser modificado"}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Apellidos"
          name="per_surnames"
          value={formData.per_surnames}
          onChange={handleChange}
          disabled={isViewing || true}
          helperText={isViewing ? "" : "Este campo no puede ser modificado"}
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="med_type_id-label">Tipo de Personal</InputLabel>
          <Select
            labelId="med_type_id-label"
            id="med_type_id"
            name="med_type_id"
            value={formData.med_type_id}
            label="Tipo de Personal"
            onChange={handleChange}
            disabled={isViewing}
          >
            {typeMedics.map((type) => (
              <MenuItem key={type.mpt_id} value={type.mpt_id}>
                {type.mpt_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          fullWidth
          label="Especialidad"
          name="med_specialty"
          value={formData.med_specialty}
          onChange={handleChange}
          required
          disabled={isViewing}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
          {!isViewing && (
            <Button variant="contained" color="primary" type="submit">
              Guardar Cambios
            </Button>
          )}
          <Button variant="outlined" color="secondary" onClick={onClose}>
            {isViewing ? 'Cerrar' : 'Cancelar'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}