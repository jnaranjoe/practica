import React, { useState } from 'react'; 
import {DataGrid } from '@mui/x-data-grid'; 
import {Box, Typography, IconButton, Paper } from '@mui/material'; 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'; 
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import VisibilityIcon from '@mui/icons-material/Visibility'; 

import HistoriaClinica from './HistoriaClinica'; 
import VerPaciente from './VerPaciente'; 

  const TablaPaciente = ({
    pacientes, // Prop: Lista de pacientes a mostrar.
    onEdit, // Prop: Función para manejar la edición de un paciente.
    onDelete, // Prop: Función para manejar la eliminación de un paciente.
    onGuardarHistoria, // Prop: Función para guardar una nueva historia clínica.
    onEditarHistoria, // Prop: Función para editar una historia clínica existente.
    openVer, // Prop: Controla la visibilidad del modal de VerPaciente.
    onCloseVer, // Prop: Función para cerrar el modal de VerPaciente.
    pacienteAVer, // Prop: Paciente cuyos detalles se van a mostrar en VerPaciente.
    onOpenVer // Prop: Función para abrir el modal de VerPaciente.
  }) => {

  const [openDialog, setOpenDialog] = useState(false); // Estado para controlar la visibilidad del modal de `HistoriaClinica` (para agregar).
  const [selectedPatient, setSelectedPatient] = useState(null); // Almacena el paciente seleccionado para añadir una historia clínica.
  const [historiaClinica, setHistoriaClinica] = useState(null); 

  //  Abre el modal de HistoriaClinica para añadir una nueva historia ---
  const handleOpenDialog = (paciente) => {
  setSelectedPatient(paciente); // Establece el paciente para la nueva historia.
  setHistoriaClinica(null); // Asegura que no haya historia inicial (es para agregar).
  setOpenDialog(true); // Abre el modal.
  };

  // Cierra el modal de HistoriaClinica 
  const handleCloseDialog = () => {
    setOpenDialog(false); // Cierra el modal.
    setSelectedPatient(null); // Limpia el paciente seleccionado.
    setHistoriaClinica(null); // Limpia la historia.
  };

  // Maneja el guardado de una nueva historia clínica 
  const handleGuardarHistoria = async (historia) => {
    try {
    await onGuardarHistoria(historia); // Llama a la función `guardarHistoriaClinica` de `Paciente`.
    handleCloseDialog(); // Cierra el modal después de guardar.
    } catch (error) {
    console.error('Error al guardar la historia clínica:', error);
    alert('No se pudo guardar la historia clínica.');
    }
  };

  //Maneja la edición de una historia clínica (llamada desde VerPaciente) 
  const handleEditarHistoriaDesdeVerPaciente = (historia) => {
    onEditarHistoria(historia); // Llama a `handleOpenEditHistoria` en el componente `Paciente`.
  };

  //Estado para controlar la visibilidad de las columnas de la tabla ---
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    historiasClinicas: false, // Oculta la columna "Historias" por defecto.
  });

  // --- Definición de las columnas de la tabla ---
  const columns = [
  { field: 'pat_id', headerName: 'ID', minWidth: 100 },
  { field: 'pat_person_id', headerName: 'id_person', minWidth: 150, flex: 1 },
  { field: 'per_identification', headerName: 'Identificación', minWidth: 100 },
  { field: 'per_names', headerName: 'Nombre', minWidth: 100 },
  { field: 'per_surnames', headerName: 'Apellidos', minWidth: 100, flex: 1 },
  { field: 'pat_medical_conditions', headerName: 'Condiciones médicas', minWidth: 180, flex: 1 },
  { field: 'pat_allergies', headerName: 'Alergias', minWidth: 150, flex: 1 },
  { field: 'pat_blood_type', headerName: 'Tipo de sangre', minWidth: 120 },
  { field: 'pat_emergency_contact_name', headerName: 'Contacto emergencia', minWidth: 180, flex: 1 },
  { field: 'pat_emergency_contact_phone', headerName: 'Tel. emergencia', minWidth: 160 },
  {field: 'pat_state', headerName: 'Estado', minWidth: 100},
  {
  field: 'historiasClinicas',
  headerName: 'Historias',
  minWidth: 50,
  // Renderiza el número de historias clínicas asociadas a cada paciente.
  renderCell: (params) => (
  <span style={{ fontSize: 10, color: 'gray' }}>{params.value ? params.value.length : 0}</span>
  ),
  },
  {
  field: 'acciones',
  headerName: 'Acciones',
  minWidth: 370,
  sortable: false, 
  
  renderCell: (params) => (
  <Box display="flex" gap={0.5}>
  
    <IconButton onClick={() => {
      console.log("params.row en TablaPaciente antes de onOpenVer:", params.row);
      onOpenVer(params.row); // Llama a la función `handleOpenVerModal` de `Paciente`.
    }} size="small" sx={{ fontSize: 11 }}>
      <VisibilityIcon fontSize="small" />
      <span style={{ marginLeft: 4 }}>Ver historia Clínica </span>
    </IconButton>

    <IconButton onClick={() => onEdit(params.row)} color="primary" size="small" sx={{ fontSize: 11 }}>
      <EditIcon fontSize="small" />
      <span style={{ marginLeft: 4 }}>Editar</span>
    </IconButton>

 
    <IconButton onClick={() => onDelete(params.row)} color="error" size="small" sx={{ fontSize: 11 }}>
      <DeleteIcon fontSize="small" />
      <span style={{ marginLeft: 4 }}>Eliminar</span>
    </IconButton>

  {/* Botón "Historia" (para agregar nueva historia clínica) */}
    <IconButton onClick={() => handleOpenDialog(params.row)} color="secondary" size="small" sx={{ fontSize: 11 }}>
      <HistoryEduIcon fontSize="small" />
      <span style={{ marginLeft: 4 }}>Historia</span>
    </IconButton>
  </Box>
  ),
  }
  ];

  return (
    <Box sx={{
      padding: 4,
      backgroundColor: '#f0f2f5',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <Paper
        elevation={4} 
        sx={{
        padding: 3,
        width: '80%',
        maxWidth: 1200,
        overflowX: 'auto', 
        borderRadius: 2,
        backgroundColor: '#fff',
      
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600, color: '#1976d2', mb: 2 }}
        >
          Información Médica de Pacientes
        </Typography>

        <Box sx={{ minWidth: '900px' }}> 
          <DataGrid
            rows={pacientes} 
            columns={columns} 
            getRowId={(row) => row.pat_id} // Función para obtener el ID único de cada fila.
            autoHeight 
            pageSize={10} 
            rowsPerPageOptions={[10, 20, 50]} 
            disableColumnMenu 
            columnVisibilityModel={columnVisibilityModel} 
            onColumnVisibilityModelChange={(newModel) => {
              setColumnVisibilityModel(newModel); 
            }}
            sx={{
              border: 1,
              borderColor: '#e0e0e0',
              borderRadius: 1,
              backgroundColor: '#fafafa',
              '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#e3f2fd',
              fontWeight: 'bold',
                fontSize: 14,
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#f9f9f9',
              },
                '& .MuiDataGrid-cell': {
                fontSize: 13,
              },
              }}
            />
        </Box>
      </Paper>

    {/* Modal para agregar/editar una Historia Clínica */}
      <HistoriaClinica
        open={openDialog} 
        onClose={handleCloseDialog} // Función para cerrar.
        paciente={selectedPatient} // Paciente al que se le añadirá/editará la historia.
        historiaInicial={historiaClinica} // Se pasa null para "agregar", o el objeto historia para "editar".
        onGuardar={handleGuardarHistoria} // Función para guardar la historia clínica.
      />

      {/* Modal para ver los detalles de un paciente y sus historias clínicas */}
      <VerPaciente
        open={openVer} 
        onClose={onCloseVer} // Función para cerrar.
        paciente={pacienteAVer} // Paciente a mostrar.
        onEditarHistoria={handleEditarHistoriaDesdeVerPaciente} // Función para editar una historia desde esta vista.
    />
    </Box>
  );
};

export default TablaPaciente; 