// src/components/usuarios/UsuariosTable.jsx
import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const UsuariosTable = ({ users, onEdit, onDelete, loading }) => {
  const columns = [
    { field: "per_identification", headerName: "Identificación", width: 150 },
    { field: "per_names", headerName: "Nombres", width: 200 },
    { field: "per_surnames", headerName: "Apellidos", width: 200 },
    { field: "per_mail", headerName: "Correo", flex: 1 },
    { field: "rol_name", headerName: "Rol", width: 150 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Editar">
            <IconButton onClick={() => onEdit(params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton onClick={() => onDelete(params.row)} color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: "100%", mt: 2 }}>
      <DataGrid
        rows={users}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.id_user_rol}
        pageSizeOptions={[10, 25]}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
      />
    </Box>
  );
};

export default UsuariosTable;
