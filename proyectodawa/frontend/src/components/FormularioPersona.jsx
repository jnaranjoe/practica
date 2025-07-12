
import React, { useState, useEffect } from 'react';
import {
  TextField,
  MenuItem,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box
} from '@mui/material';
import axios from 'axios';

export default function FormularioPersona({ open, onClose, onGuardar, persona }) {
  const [form, setForm] = useState({
    per_identification: '',
    per_names: '',
    per_surnames: '',
    per_genre_id: '',
    per_marital_status_id: '',
    per_country: '',
    per_city: '',
    per_address: '',
    per_phone: '',
    per_mail: '',
    per_birth_date: '',
    id_rol: '' 
  });

  const [catalogoGeneros, setCatalogoGeneros] = useState([]);
  const [catalogoEstadosCiviles, setCatalogoEstadosCiviles] = useState([]);
  const [catalogoRoles, setCatalogoRoles] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCatalogos = async () => {
      try {
        const [generosRes, estadosRes, rolesRes] = await Promise.all([
          axios.get(`${apiUrl}/security/PersonGenre/list`),
          axios.get(`${apiUrl}/security/MaritalStatus/list`),
          axios.get(`${apiUrl}/security/Rol/list`)
        ]);

        setCatalogoGeneros(generosRes.data.data);
        setCatalogoEstadosCiviles(estadosRes.data.data);
        setCatalogoRoles(rolesRes.data.data);
      } catch (error) {
        console.log('Error cargando catálogos:', error);
      }
    };

    fetchCatalogos();
  }, []);

  useEffect(() => {
    if (persona) {

      setForm({
        per_identification: persona.per_identification || '',
        per_names: persona.per_names || '',
        per_surnames: persona.per_surnames || '',
        per_genre_id: persona.per_genre_id || '',
        per_marital_status_id: persona.per_marital_status_id || '',
        per_country: persona.per_country || '',
        per_city: persona.per_city || '',
        per_address: persona.per_address || '',
        per_phone: persona.per_phone || '',
        per_mail: persona.per_mail || '',
     
        per_birth_date: persona.per_birth_date ? new Date(persona.per_birth_date).toISOString().split('T')[0] : '',
        id_rol: persona.id_rol || '' 
      });
    } else {
      
      setForm({
        per_identification: '',
        per_names: '',
        per_surnames: '',
        per_genre_id: '',
        per_marital_status_id: '',
        per_country: '',
        per_city: '',
        per_address: '',
        per_phone: '',
        per_mail: '',
        per_birth_date: '',
        id_rol: ''
      });
    }
  }, [persona]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

    const handleSubmit = async () => {
    try {
      

      const basePayload = {
        per_identification: form.per_identification,
        per_names: form.per_names,
        per_surnames: form.per_surnames,
        per_genre_id: form.per_genre_id !== '' ? parseInt(form.per_genre_id) : null,
        per_marital_status_id: form.per_marital_status_id !== '' ? parseInt(form.per_marital_status_id) : null,
        per_country: form.per_country,
        per_city: form.per_city,
        per_address: form.per_address,
        per_phone: form.per_phone,
        per_mail: form.per_mail,
        per_birth_date: form.per_birth_date
      };

      console.log('Payload base (antes de ajustar por modo):', basePayload);

      
      if (persona?.user_person_id) { 
        console.log('Modo edición: Enviando PUT para actualizar persona');
        const updatePayload = {
          ...basePayload,
          
          per_id: persona.user_person_id 
        };

        console.log('Datos a enviar para actualización (PUT):', updatePayload);

        const response = await axios.put(`${apiUrl}/security/Person/update`, updatePayload);

        if (response.data.result) {
          alert('Persona actualizada exitosamente.');
          onGuardar(response.data.data || updatePayload);
          onClose();
        } else {
          console.error('Error en respuesta del servidor al actualizar:', response.data.message);
          alert('No se pudo actualizar la persona. Intenta más tarde.');
        }
      } else {
      
        console.log('Modo creación: Enviando POST para nueva persona');
        const createPayload = {
          ...basePayload,
  
          id_rol: form.id_rol !== '' ? parseInt(form.id_rol) : null
        };
        console.log('Datos a enviar para creación (POST):', createPayload);
        const response = await axios.post(`${apiUrl}/security/custom1/create`, createPayload);

        if (response.data.result) {
          alert('Persona registrada exitosamente.');
          onGuardar(response.data.data);
          onClose();
        } else {
          console.error('Error en respuesta del servidor al crear:', response.data.message);
          alert('No se pudo registrar la persona. Intenta más tarde.');
        }
      }
    } catch (error) {
      console.error('Error al guardar/actualizar persona:', error);
      if (error.response) {
        console.error('Datos de error del servidor:', error.response.data);
        alert(`Error del servidor: ${error.response.data.message || 'Error desconocido'}`);
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor:', error.request);
        alert('Error de red: No se pudo conectar con el servidor.');
      } else {
        alert('Ocurrió un error inesperado. Por favor, verifica la consola.');
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.4rem', bgcolor: '#f5f5f5' }}>
        {persona ? 'Editar Persona' : 'Registrar Persona'}
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {[
              { label: 'Identificación', name: 'per_identification' },
              { label: 'Nombres', name: 'per_names' },
              { label: 'Apellidos', name: 'per_surnames' },
              { label: 'País', name: 'per_country' },
              { label: 'Ciudad', name: 'per_city' },
              { label: 'Dirección', name: 'per_address' },
              { label: 'Teléfono', name: 'per_phone' },
              { label: 'Correo', name: 'per_mail', type: 'email' },
              { label: 'Fecha de nacimiento', name: 'per_birth_date', type: 'date' }
            ].map(({ label, name, type }) => (
              <Grid item xs={12} sm={6} key={name}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  label={label}
                  name={name}
                  type={type || 'text'}
                  value={form[name] || ''}
                  onChange={handleChange}
                  InputLabelProps={type === 'date' ? { shrink: true } : undefined}
                />
              </Grid>
            ))}

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                size="small"
                variant="outlined"
                label="Género"
                name="per_genre_id"
                value={form.per_genre_id}
                onChange={handleChange}
              >
                {catalogoGeneros.map((op) => (
                  <MenuItem key={op.id} value={op.id}>
                    {op.genre_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                size="small"
                variant="outlined"
                label="Estado civil"
                name="per_marital_status_id"
                value={form.per_marital_status_id}
                onChange={handleChange}
              >
                {catalogoEstadosCiviles.map((op) => (
                  <MenuItem key={op.id} value={op.id}>
                    {op.status_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                size="small"
                variant="outlined"
                label="Rol"
                name="id_rol"
                value={form.id_rol}
                onChange={handleChange}
              >
                {catalogoRoles.map((op) => (
                  <MenuItem key={op.rol_id} value={op.rol_id}>
                    {op.rol_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
        >
          {persona ? 'Guardar Cambios' : 'Registrar'}
        </Button>
        <Button
          onClick={onClose}
          variant="outlined"
          color="secondary"
          sx={{ borderRadius: 2, textTransform: 'none' }}
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}