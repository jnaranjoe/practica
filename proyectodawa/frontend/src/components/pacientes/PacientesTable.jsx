import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

const PacientesTable = ({
  pacientes,
  onVer,
  onEdit,
  onDelete,
  onAddHistory,
  loading,
}) => {
  const columns = [
    { field: "per_identification", headerName: "Identificación", width: 150 },
    { field: "per_names", headerName: "Nombres", flex: 1 },
    { field: "per_surnames", headerName: "Apellidos", flex: 1 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Ver Detalles">
            <IconButton onClick={() => onVer(params.row)}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar Info. Médica">
            <IconButton onClick={() => onEdit(params.row)} color="primary">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Añadir Historia">
            <IconButton
              onClick={() => onAddHistory(params.row)}
              color="secondary"
            >
              <NoteAddIcon />
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
        rows={pacientes}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.pat_id}
        pageSizeOptions={[10, 25, 50]}
      />
    </Box>
  );
};

export default PacientesTable;
