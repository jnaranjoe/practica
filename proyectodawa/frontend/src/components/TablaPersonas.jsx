import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  Button,
  Stack,
  Paper,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import { useTheme } from '@mui/material/styles';

export default function TablaPersonas({ personas, onEditar, onEliminar}) {
  const theme = useTheme();

  const columnas = [
    { field: 'id_user_rol', headerName: 'id_user_rol', minWidth: 70 },
    { field: 'id_user', headerName: 'id_user', minWidth: 150 },
    { field: 'user_person_id', headerName: 'user_person_id', minWidth: 150, flex: 1 },
    { field: 'per_identification', headerName: 'Identificación', minWidth: 150, flex: 1 },
    { field: 'per_names', headerName: 'Nombres', minWidth: 150, flex: 1 }, 
    { field: 'per_surnames', headerName: 'Apellidos', minWidth: 150, flex: 1 },
    { field: 'per_genre_id', headerName: 'Género', minWidth: 120 },
    { field: 'per_marital_status_id', headerName: 'Estado Civil', minWidth: 150 },
    { field: 'per_country', headerName: 'País', minWidth: 100 },
    { field: 'per_city', headerName: 'Ciudad', minWidth: 100 },
    { field: 'per_address', headerName: 'Dirección', minWidth: 180 },
    { field: 'per_phone', headerName: 'Teléfono', minWidth: 130 },
    { field: 'per_mail', headerName: 'Correo', minWidth: 200, flex: 1 },
    { field: 'per_birth_date', headerName: 'Nacimiento', minWidth: 130 },
    { field: 'id_rol', headerName: 'id_rol', minWidth: 120 },
    { field: 'rol_name', headerName: 'Rol', minWidth: 150, flex: 1 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      minWidth: 280,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => onEditar(params.row)}
          >
            Editar
          </Button>
         
          <Button
            variant="outlined"
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => onEliminar(params.row.id_user_rol)} 
          >
            Eliminar
          </Button>
        </Stack>
      ),
    },
  ];
  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 3,
          width: '100%',
          overflowX: 'auto',
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: theme.palette.text.primary,
            mb: 2
          }}
        >
          Lista de Personas Registradas
        </Typography>

        <Box sx={{ width: '100%' }}>
          <DataGrid
            rows={personas}
            columns={columnas}
            getRowId={(row) => row.id_user_rol}
            autoHeight
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
            disableRowSelectionOnClick
            sx={{
              border: 1,
              borderColor: theme.palette.divider,
              borderRadius: 1,
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: theme.palette.background.paper,
                fontWeight: 'bold',
                fontSize: 14,
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: theme.palette.action.hover,
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
}