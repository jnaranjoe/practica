// src/components/ventas/FacturasTable.jsx
import React from "react";
import { Box, IconButton, Tooltip, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PaymentIcon from "@mui/icons-material/Payment";
import CancelIcon from "@mui/icons-material/Cancel";
import EmailIcon from "@mui/icons-material/Email";

const FacturasTable = ({
  facturas,
  onVer,
  onPagar,
  onAnular,
  onEnviar,
  loading,
}) => {
  const columns = [
    { field: "inv_number", headerName: "N° Factura", width: 120 },
    {
      field: "inv_date",
      headerName: "Fecha",
      width: 100,
      renderCell: (params) =>
        params.value
          ? new Date(params.value).toLocaleDateString("es-ES")
          : "N/A",
    },
    { field: "client_name", headerName: "Cliente", flex: 1, minWidth: 150 },
    {
      field: "inv_grand_total",
      headerName: "Total",
      width: 100,
      type: "number",
      align: "right",
      headerAlign: "right",
      renderCell: (params) => `$${Number(params.value || 0).toFixed(2)}`,
    },
    {
      field: "total_paid",
      headerName: "Pagado",
      width: 100,
      type: "number",
      align: "right",
      headerAlign: "right",
      renderCell: (params) =>
        `$${Number(params.row.total_paid || 0).toFixed(2)}`,
    },
    {
      field: "balance",
      headerName: "Saldo",
      width: 100,
      type: "number",
      align: "right",
      headerAlign: "right",
      renderCell: (params) => {
        const saldo =
          Number(params.row.inv_grand_total || 0) -
          Number(params.row.total_paid || 0);
        return (
          <span
            style={{
              fontWeight: "bold",
              color: saldo > 0 ? "#d32f2f" : "inherit",
            }}
          >
            {`$${saldo.toFixed(2)}`}
          </span>
        );
      },
    },
    {
      field: "inv_status",
      headerName: "Estado Pago",
      width: 150,
      renderCell: (params) => {
        const status = params.value || "Pendiente de Pago";
        const color = status.toLowerCase() === "pagada" ? "success" : "warning";
        return <Chip label={status} color={color} size="small" />;
      },
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 180,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const totalPagado = Number(params.row.total_paid || 0);
        const totalFactura = Number(params.row.inv_grand_total || 0);
        const estaPagada = totalPagado >= totalFactura;
        const estaAnulada = !params.row.inv_state; // inv_state es true si está activa

        return (
          <Box>
            <Tooltip title="Ver Detalles">
              <IconButton onClick={() => onVer(params.row)}>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={
                estaAnulada
                  ? "Factura Anulada"
                  : estaPagada
                  ? "Factura Saldada"
                  : "Registrar Pago"
              }
            >
              <span>
                <IconButton
                  onClick={() => onPagar(params.row)}
                  color="primary"
                  disabled={estaPagada || estaAnulada}
                >
                  <PaymentIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Enviar por Correo">
              <IconButton
                onClick={() => onEnviar(params.row)}
                color="secondary"
              >
                <EmailIcon />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={estaAnulada ? "Factura ya Anulada" : "Anular Factura"}
            >
              <span>
                <IconButton
                  onClick={() => onAnular(params.row)}
                  color="error"
                  disabled={estaAnulada}
                >
                  <CancelIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 650, width: "100%", mt: 2 }}>
      <DataGrid
        rows={facturas}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.inv_id}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
      />
    </Box>
  );
};

export default FacturasTable;
