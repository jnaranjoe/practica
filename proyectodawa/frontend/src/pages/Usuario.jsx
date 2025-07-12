import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Box,
  Stack,
  Typography
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ColorModeIconDropdown from '../theme/ColorModeIconDropdown';
import { useTheme } from '@mui/material/styles';

import axios from 'axios';
import FormularioPersona from '../components/FormularioPersona';
import TablaPersonas from '../components/TablaPersonas';

export default function Usuario() {
  const theme = useTheme();
  const [modalFormulario, setModalFormulario] = useState(false);
  const [personaActual, setPersonaActual] = useState(null);
  const [dataUserRol, setDataUserRol] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  // Obtener datos de usuarios
  const fetchClientes = async () => {
    try {
      const response = await axios.get(`${apiUrl}/security/UserRol/list`);
      const allUsers = response.data.data;
      console.log('Todos los usuarios:', allUsers);
 
      const activeUsers = allUsers.filter(user => user.state === true || user.state === 1); 
      setDataUserRol(activeUsers); 

    } catch (error) {
      console.log('Error al cargar clientes:', error);
      alert('Error al cargar la lista de personas. Por favor, intenta de nuevo.');
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const guardarPersona = (personaNuevaOEditada) => {
    fetchClientes();
    setModalFormulario(false);
  };

  const eliminarPersona = async (id_user_rol_a_eliminar) => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres dar de baja este registro de usuario/rol?');
    if (confirmDelete) {
      try {
        const response = await axios.put(`${apiUrl}/security/UserRol/delete`, { 
          id_user_rol: id_user_rol_a_eliminar,
          state: false 
        });

        if (response.data.result) {
          alert('Registro de usuario/rol dado de baja exitosamente.'); 
          fetchClientes(); 
        } else {
          console.error('Error en respuesta del servidor al dar de baja:', response.data.message);
          alert(`No se pudo dar de baja el registro: ${response.data.message || 'Error desconocido'}`);
        }
      } catch (error) {
        console.error('Error al dar de baja registro de usuario/rol:', error);
        if (error.response) {
          console.error('Datos de error del servidor:', error.response.data);
          alert(`Error del servidor: ${error.response.data.message || error.response.statusText}`);
        } else if (error.request) {
          console.error('No se recibió respuesta del servidor:', error.request);
          alert('Error de red: No se pudo conectar con el servidor.');
        } else {
          alert('Ocurrió un error inesperado al dar de baja. Por favor, verifica la consola para más detalles.');
        }
      }
    }
  };

 
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight="bold">
          Gestión de Usuarios
        </Typography>
        <ColorModeIconDropdown />

        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          onClick={() => {
            setPersonaActual(null);
            setModalFormulario(true);
          }}
          sx={{ borderRadius: 2, textTransform: 'none' }}
        >
          Registrar Persona
        </Button>
      </Box>

      <TablaPersonas
        personas={dataUserRol} 
        onEditar={(p) => {
          setPersonaActual(p);
          setModalFormulario(true);
        }}
        onEliminar={eliminarPersona} 
      />

      <FormularioPersona
        open={modalFormulario}
        onClose={() => setModalFormulario(false)}
        onGuardar={guardarPersona}
        persona={personaActual}
      />

    </Container>
  );
}