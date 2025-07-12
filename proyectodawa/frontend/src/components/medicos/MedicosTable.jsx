import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MedicosTable = ({ medicos, onEdit, onDelete, loading }) => {
  const columns = [
    { field: "per_identification", headerName: "Identificación", width: 150 },
    { field: "per_names", headerName: "Nombres", flex: 1 },
    { field: "per_surnames", headerName: "Apellidos", flex: 1 },
    { field: "mpt_name", headerName: "Tipo de Personal", width: 180 },
    { field: "med_specialty", headerName: "Especialidad", width: 180 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Editar Médico">
            <IconButton onClick={() => onEdit(params.row)} color="primary">
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
    <Box sx={{ height: 650, width: "100%", mt: 2 }}>
      <DataGrid
        rows={medicos}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.med_id}
        pageSizeOptions={[10, 25, 50]}
      />
    </Box>
  );
};

export default MedicosTable;
