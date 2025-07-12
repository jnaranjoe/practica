import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TablaPaciente from '../components/TablaPaciente';
import HistoriaClinica from '../components/HistoriaClinica';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';

const apiUrl = import.meta.env.VITE_API_URL;

const Paciente = () => {
  const [pacientes, setPacientes] = useState([]); // Almacena la lista de pacientes
  const [bloodTypes, setBloodTypes] = useState([]); // Almacena la lista de tipos de sangre.
  const [openEdit, setOpenEdit] = useState(false); // Controla la visibilidad del modal de edición de paciente.
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null); // Almacena el paciente seleccionado para edición.

  const [openEditHistoria, setOpenEditHistoria] = useState(false);  // Controla la visibilidad del modal de edición de historia clínica.
  const [historiaSeleccionadaParaEditar, setHistoriaSeleccionadaParaEditar] = useState(null); // Almacena la historia clínica seleccionada para edición.


  const [openVerModal, setOpenVerModal] = useState(false); // Controla la visibilidad del modal para ver detalles del paciente.
  const [pacienteParaVerDetalles, setPacienteParaVerDetalles] = useState(null); // Almacena el paciente cuyos detalles se van a ver.

  // Efecto para obtener pacientes y sus historias clínicas al cargar el componente ---
  useEffect(() => {
    const obtenerPacientesYHistorias = async () => {
      try {
        // Realiza peticiones para obtener la lista de pacientes y historias clínicas.
        const [resPacientes, resHistorias] = await Promise.all([
          axios.get(`${apiUrl}/security/Patient/list`),
          axios.get(`${apiUrl}/security/MedHistory/list`)
        ]);

        if (resPacientes.data.result && resHistorias.data.result) {
          const pacientesData = resPacientes.data.data; // Datos de los pacientes.
          const historiasData = resHistorias.data.data;

           // Mapea los pacientes y les adjunta sus historias clínicas correspondientes.
          const pacientesConHistorias = pacientesData.map((paciente) => {
            const historias = historiasData.filter(
              (h) => h.hist_patient_id === paciente.pat_id
            );
            return { ...paciente, historiasClinicas: historias };
          });

          setPacientes(pacientesConHistorias); // Actualiza el estado de los pacientes.
        } else {
          console.error('Error al obtener datos');
        }
      } catch (error) {
        console.error('Error al conectar con API:', error);
      }
    };

    obtenerPacientesYHistorias(); // Se llama a la función para obtener los datos.
  }, []);

   // Efecto para obtener los tipos de sangre ---
  useEffect(() => {
    const fetchBloodTypes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/security/BloodType/list`); //Peticion para obtener tipos de sangre 
        if (response.data.result) {
          setBloodTypes(response.data.data); // Actualiza el estado de los tipos de sangre
        } else {
          console.error('Error al obtener tipos de sangre:', response.data.message);
        }
      } catch (error) {
        console.error('Error al conectar con la API de tipos de sangre:', error);
      }
    };

    fetchBloodTypes(); // Llama a la función para obtener los tipos de sangre
  }, []);

  // Función para guardar una nueva historia clínica 
  const guardarHistoriaClinica = async (historia) => {
    try {
      const { hist_id, ...historiaSinId } = historia; // Elimina el ID si existe, ya que no se debe enviar al crear una nueva historia clínica.

      const response = await axios.post(`${apiUrl}/security/MedHistory/create`, historiaSinId); // Petición POST para crear historia.

      if (response.data.result) {
        alert('Historia clínica guardada correctamente.');

        const nuevaHistoriaCompleta = {
          ...historiaSinId, 
          hist_id: response.data.data.hist_id // Asigna el ID generado por la API.
        };

         // Actualiza la lista de pacientes añadiendo la nueva historia a su paciente correspondiente
        setPacientes(prevPacientes => {
          const updatedPacientes = prevPacientes.map(p => {
            if (p.pat_id === nuevaHistoriaCompleta.hist_patient_id) {
              return {
                ...p,
                historiasClinicas: [...p.historiasClinicas, nuevaHistoriaCompleta] // Añade la nueva historia
              };
            }
            return p;
          });
          return updatedPacientes;
        });

        setPacienteParaVerDetalles(prev => {
          if (prev && prev.pat_id === nuevaHistoriaCompleta.hist_patient_id) {
            return {
              ...prev,
              historiasClinicas: [...prev.historiasClinicas, nuevaHistoriaCompleta]
            };
          }
          return prev;
        });

      } else {
        alert('Error al guardar historia clínica: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error al crear historia clínica:', error);
      alert('Ocurrió un error al guardar la historia clínica.');
    }
  };

  // Función para ACTUALIZAR una historia clínica existente
  const actualizarHistoriaClinica = async (historiaActualizada) => {
    try {
      if (!historiaActualizada.hist_id) {
        alert('Error: La historia clínica no tiene un ID para actualizar.');
        return;
      }

      const response = await axios.put(`${apiUrl}/security/MedHistory/update`, historiaActualizada); // Petición PUT para actualizar historia.

      if (response.data.result) {
        alert('Historia clínica actualizada correctamente.');

         // Actualiza la lista de pacientes con la historia clínica modificada
        setPacientes(prevPacientes => {
          const updatedPacientes = prevPacientes.map(p => {
            if (p.pat_id === historiaActualizada.hist_patient_id) {
              return {
                ...p,
                historiasClinicas: p.historiasClinicas.map(h =>
                  h.hist_id === historiaActualizada.hist_id ? historiaActualizada : h //Reemplaza la historia antigua por la actualizada 
                )
              };
            }
            return p;
          });
          return updatedPacientes;
        });

        setPacienteParaVerDetalles(prev => {
          if (prev && prev.pat_id === historiaActualizada.hist_patient_id) {
            return {
              ...prev,
              historiasClinicas: prev.historiasClinicas.map(h =>
                h.hist_id === historiaActualizada.hist_id ? historiaActualizada : h
              )
            };
          }
          return prev;
        });

        setOpenEditHistoria(false); // Cierra el modal de edición de historia clínica
        setHistoriaSeleccionadaParaEditar(null); // Limpia la historia seleccionada para editar

      } else {
        alert('Error al actualizar historia clínica: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error al actualizar historia clínica:', error);
      alert('Ocurrió un error al actualizar la historia clínica.');
    }
  };

   //Abre el modal de edición de historia clínica con la historia seleccionada 
  const handleOpenEditHistoria = (historia) => {
    console.log("Historia recibida para edición:", historia);
    setHistoriaSeleccionadaParaEditar(historia); // Establece la historia a editar
    setOpenEditHistoria(true); //Abre el modal 
  };

  //Cierra el modal de edición de historia clínica
  const handleCloseEditHistoria = () => {
    setOpenEditHistoria(false);
    setHistoriaSeleccionadaParaEditar(null); // Limpia la historia seleccionada.
  };

  //  Abre el modal para ver los detalles de un paciente
  const handleOpenVerModal = (paciente) => {

    const pacienteEnEstadoActual = pacientes.find(p => p.pat_id === paciente.pat_id);
    setPacienteParaVerDetalles(pacienteEnEstadoActual || paciente); // Establece el paciente a ver.
    setOpenVerModal(true);
  };

   //Cierra el modal para ver los detalles de un paciente
  const handleCloseVerModal = () => {
    setOpenVerModal(false);
    setPacienteParaVerDetalles(null);
  };

  //Maneja la apertura del modal de edición de paciente
  const handleEdit = (paciente) => {
    const tipoSangre = bloodTypes.find(bt => bt.btp_id === paciente.pat_blood_type)?.btp_type || '';
    setPacienteSeleccionado({ ...paciente, pat_blood_type: tipoSangre }); // Establece el paciente para edición.
    setOpenEdit(true); //abre el modal de edición
  };

   //Maneja la eliminación logica  de un paciente
  const handleDelete = async (paciente) => { 
    const confirm = window.confirm(`¿Deseas eliminar al paciente ${paciente.per_names} ${paciente.per_surnames}?`);
    if (!confirm) {
      return; // Si el usuario cancela, no hace nada.
    }

    try {
      
      const dataToSend = {
        pat_id: paciente.pat_id,
        pat_state: 'false' // Cambia el estado A FALSE para eliminar lógicamente el paciente
      };

   
      const response = await axios.put(`${apiUrl}/security/Patient/delete`, dataToSend); // Petición PUT para cambiar el estado.

      if (response.data.result) {
        alert('Paciente eliminado correctamente.');
    
        // Actualiza la lista de pacientes eliminando al paciente eliminado
        setPacientes((prev) =>
          prev.filter((p) => p.pat_id !== paciente.pat_id)
        );
      
        if (pacienteParaVerDetalles && pacienteParaVerDetalles.pat_id === paciente.pat_id) {
          handleCloseVerModal();
        }
      } else {
        alert('Error al eliminar paciente: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error al conectar con la API para eliminar paciente:', error);
      alert('Ocurrió un error al intentar eliminar el paciente.');
    }
  };


  const handleActualizarPaciente = (pacienteActualizado) => {
     setPacientes((prev) =>
       prev.map((p) =>
         p.pat_id === pacienteActualizado.pat_id ? pacienteActualizado : p
       )
     );
   
     if (pacienteParaVerDetalles && pacienteParaVerDetalles.pat_id === pacienteActualizado.pat_id) {
       setPacienteParaVerDetalles(pacienteActualizado);
     }
  };

  //  Maneja los cambios en los campos del formulario de edición de paciente
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPacienteSeleccionado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Guarda los cambios en la edición de un paciente
  const handleSave = async () => {
    try {
      const bloodTypeObject = bloodTypes.find(
        (bt) => bt.btp_type === pacienteSeleccionado.pat_blood_type
      );

      if (!bloodTypeObject) {
        alert('Tipo de sangre inválido. Por favor selecciona uno válido.');
        return;
      }
      
      // Crea el objeto de paciente a enviar a la API para la actualización.
      const pacienteParaActualizar = {
        pat_id: pacienteSeleccionado.pat_id,
        pat_medical_conditions: pacienteSeleccionado.pat_medical_conditions,
        pat_allergies: pacienteSeleccionado.pat_allergies,
        pat_blood_type: bloodTypeObject.btp_id,
        pat_emergency_contact_name: pacienteSeleccionado.pat_emergency_contact_name,
        pat_emergency_contact_phone: pacienteSeleccionado.pat_emergency_contact_phone,
      };

      const response = await axios.put(`${apiUrl}/security/Patient/update`, pacienteParaActualizar);

      if (response.data.result) {
        // Actualiza la lista de pacientes con los datos modificados
        setPacientes((prev) =>
          prev.map((p) =>
            p.pat_id === pacienteParaActualizar.pat_id
              ? { ...p, ...pacienteParaActualizar, pat_blood_type: pacienteSeleccionado.pat_blood_type }
              : p
          )
        );
        
        if (pacienteParaVerDetalles && pacienteParaVerDetalles.pat_id === pacienteParaActualizar.pat_id) {
          setPacienteParaVerDetalles(prev => ({
            ...prev,
            ...pacienteParaActualizar,
            pat_blood_type: pacienteSeleccionado.pat_blood_type 
          }));
        }

        setOpenEdit(false);
        setPacienteSeleccionado(null);
        alert('Paciente actualizado correctamente.'); 
      } else {
        alert('Error al actualizar paciente: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error al actualizar paciente:', error);
      alert('Ocurrió un error al intentar actualizar el paciente.');
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: '#f0f4f8',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <TablaPaciente
        pacientes={pacientes} //Pasa la lista de pacientes 
        onEdit={handleEdit} //fucnión para editar un paciente
        onDelete={handleDelete} //Función para eliminar un paciente
        onActualizarPaciente={handleActualizarPaciente} //funcion para actualizar un paciente en el estado local
        onGuardarHistoria={guardarHistoriaClinica} //Función para guardar una nueva historia clínica
        onEditarHistoria={handleOpenEditHistoria} //Función para abrir el modal de edición de historia clínica
        openVer={openVerModal} //Estado para controlar la visibilidad del modal de "Ver Paciente".
        onCloseVer={handleCloseVerModal} // Función para cerrar el modal de "Ver Paciente".
        pacienteAVer={pacienteParaVerDetalles} // Paciente cuyos detalles se están viendo.
        onOpenVer={handleOpenVerModal} // Función para abrir el modal de "Ver Paciente".
      />

      {/* Modal para editar información médica */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="md" fullWidth>
        <DialogTitle>Editar Información Médica</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, paddingTop: 1 }}>
            <TextField
              label="Condiciones médicas"
              name="pat_medical_conditions"
              value={pacienteSeleccionado?.pat_medical_conditions || ''}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Alergias"
              name="pat_allergies"
              value={pacienteSeleccionado?.pat_allergies || ''}
              onChange={handleInputChange}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="label-blood-type">Tipo de sangre</InputLabel>
              <Select
                labelId="label-blood-type"
                label="Tipo de sangre"
                name="pat_blood_type"
                value={pacienteSeleccionado?.pat_blood_type || ''}
                onChange={handleInputChange}
              >
                {/* Mapea los tipos de sangre obtenidos de la API para las opciones del selector */}
                {bloodTypes.map((btp) => (
                  <MenuItem key={btp.btp_id} value={btp.btp_type}>
                    {btp.btp_type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Contacto de emergencia"
              name="pat_emergency_contact_name"
              value={pacienteSeleccionado?.pat_emergency_contact_name || ''}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Teléfono de emergencia"
              name="pat_emergency_contact_phone"
              value={pacienteSeleccionado?.pat_emergency_contact_phone || ''}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleSave}>Guardar</Button>
        </DialogActions>
      </Dialog>

      {/* Usado para editar la hisotria clinica existente*/}
      <HistoriaClinica
        open={openEditHistoria}
        onClose={handleCloseEditHistoria}
        paciente={historiaSeleccionadaParaEditar ? null : pacientes.find(p => p.pat_id === pacienteSeleccionado?.pat_id)}
        historiaInicial={historiaSeleccionadaParaEditar}
        onGuardar={actualizarHistoriaClinica} 
      />
    </Box>
  );
};

export default Paciente;