import React from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material"; // Importamos Typography
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductosTable = ({ products, loading, onEdit, onDelete }) => {
  const columns = [
    { field: "pro_id", headerName: "ID", width: 90 },
    { field: "pro_name", headerName: "Nombre", width: 250 },
    { field: "pro_description", headerName: "Descripción", width: 300 },
    {
      field: "pro_price",
      headerName: "Precio",
      type: "number",
      width: 130,
      // ¡SOLUCIÓN! Usamos renderCell para un control total sobre la celda.
      renderCell: (params) => {
        const price = params.value;
        // Verificamos si el valor es un número válido.
        if (isFinite(price)) {
          // Si es un número, lo formateamos y lo mostramos dentro de un Typography.
          return <Typography>{`$${Number(price).toFixed(2)}`}</Typography>;
        }
        // Si no, mostramos N/A.
        return <Typography color="textSecondary">N/A</Typography>;
      },
    },
    {
      field: "pro_total_sessions",
      headerName: "Sesiones",
      type: "number",
      width: 120,
    },
    {
      field: "pro_state",
      headerName: "Activo",
      width: 120,
      type: "boolean",
      renderCell: (params) => (params.value ? "Sí" : "No"),
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Editar Producto">
            <IconButton onClick={() => onEdit(params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar Producto">
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
        rows={products || []}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.pro_id}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #eee",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: (theme) => theme.palette.action.hover,
            fontWeight: "bold",
          },
        }}
      />
    </Box>
  );
};

export default ProductosTable;
