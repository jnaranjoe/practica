import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Componente funcional que recibe los datos de los médicos y las funciones de acción como props
const TablaPersonalMedico = ({ personalMedico = [], onEdit, onView, onDelete }) => { 
  const columns = [
    { field: 'med_id', headerName: 'ID Médico', minWidth: 100 },
    { field: 'med_person_id', headerName: 'ID Persona', minWidth: 120 },
    { field: 'per_names', headerName: 'Nombres', minWidth: 150 },
    { field: 'per_surnames', headerName: 'Apellidos', minWidth: 150 },
    { field: 'med_type_id', headerName: 'ID Tipo', minWidth: 120 },
    { field: 'mpt_name', headerName: 'Tipo de Personal', minWidth: 150 },
    { field: 'med_specialty', headerName: 'Especialidad', minWidth: 150 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      minWidth: 280,
      renderCell: (params) => (
        <Box display="flex" gap={0.5}>
          <IconButton
            color="info"
            size="small"
            sx={{ fontSize: 11 }}
            onClick={() => onView(params.row)}
          >
            <VisibilityIcon fontSize="small" />
            <span style={{ marginLeft: 4 }}>Ver</span>
          </IconButton>
          <IconButton
            color="primary"
            size="small"
            sx={{ fontSize: 11 }}
            onClick={() => onEdit(params.row)}
          >
            <EditIcon fontSize="small" />
            <span style={{ marginLeft: 4 }}>Editar</span>
          </IconButton>
          <IconButton
            color="error"
            size="small"
            sx={{ fontSize: 11 }}
            onClick={() => onDelete(params.row)} 
          >
            <DeleteIcon fontSize="small" />
            <span style={{ marginLeft: 4 }}>Eliminar</span> 
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f0f2f5', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
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
          Información del Personal Médico
        </Typography>

        <Box sx={{ minWidth: '900px' }}>
          <DataGrid
            rows={personalMedico} //Datos que se mistraran en la tabla
            columns={columns}
            getRowId={(row) => row.med_id}
            autoHeight
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
            disableColumnMenu
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
    </Box>
  );
};

export default TablaPersonalMedico;