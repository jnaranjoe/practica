// src/components/ventas/FacturaDetallesModal.jsx
import React, { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Divider,
  CircularProgress,
  Alert,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import { getInvoiceById, getPaymentsByInvoiceId } from "../../api/ventasApi";

const formatCurrency = (amount) => `$${Number(amount || 0).toFixed(2)}`;
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return isNaN(date) ? "Fecha inválida" : date.toLocaleDateString();
};

// 1. El modal ahora recibe el objeto 'invoice' completo
const FacturaDetallesModal = ({ open, onClose, invoice }) => {
  const [lineItems, setLineItems] = useState([]); // Estado para los productos de la factura
  const [payments, setPayments] = useState([]); // Estado para la lista de pagos
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open || !invoice) {
      setLineItems([]);
      setPayments([]);
      setError(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Se siguen buscando los detalles para mostrar el desglose
        const [invoiceDetailsResponse, paymentsData] = await Promise.all([
          getInvoiceById(invoice.inv_id),
          getPaymentsByInvoiceId(invoice.inv_id),
        ]);

        if (invoiceDetailsResponse && invoiceDetailsResponse.data) {
          setLineItems(invoiceDetailsResponse.data.details || []);
        }
        setPayments(paymentsData || []);
      } catch (err) {
        setError("No se pudieron cargar los detalles de la factura.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [open, invoice]);

  // 2. El cálculo ahora usa el 'total_paid' que viene del objeto 'invoice'
  const financialSummary = useMemo(() => {
    if (!invoice) return null;

    const totalPagado = Number(invoice.total_paid || 0); // USA EL DATO DE LA TABLA
    const totalFactura = Number(invoice.inv_grand_total || 0);
    const saldoPendiente = totalFactura - totalPagado;
    const estado = saldoPendiente <= 0 ? "Pagada" : "Pendiente de Pago";

    return {
      subtotal: invoice.inv_subtotal || 0,
      iva: invoice.inv_iva || 0, // Asegúrate que tu backend envíe este campo o ajústalo
      tax: invoice.inv_tax || 0,
      total: totalFactura,
      totalPagado,
      saldoPendiente,
      estado,
    };
  }, [invoice]);

  const getStatusChip = (status) => {
    if (!status) return null;
    const color = status.toLowerCase() === "pagada" ? "success" : "warning";
    return <Chip label={status} color={color} size="small" />;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Detalles de la Factura: {invoice?.inv_number || ""}
      </DialogTitle>
      <DialogContent dividers>
        {loading && (
          <Box display="flex" justifyContent="center" my={5}>
            <CircularProgress />
          </Box>
        )}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && invoice && financialSummary && (
          <Box>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} md={8}>
                <Typography variant="h6">Cliente:</Typography>
                <Typography>{invoice.client_name}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle1">
                  <strong>Fecha:</strong> {formatDate(invoice.inv_date)}
                </Typography>
                <Typography
                  component="div"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <strong>Estado:</strong>{" "}
                  {getStatusChip(financialSummary.estado)}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Productos
            </Typography>

            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Producto</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                    <TableCell align="right">Precio Unit.</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lineItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.pro_name}</TableCell>
                      <TableCell align="right">{item.ind_quantity}</TableCell>
                      <TableCell align="right">
                        {formatCurrency(item.ind_unit_price)}
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(item.ind_total)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Pagos Registrados
                </Typography>
                {payments.length > 0 ? (
                  payments.map((p) => (
                    <Box
                      key={p.inp_id}
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Typography variant="body2">
                        {p.payment_method} ({formatDate(p.date_created)})
                      </Typography>
                      <Typography variant="body2">
                        {formatCurrency(p.inp_amount)}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography color="text.secondary">
                    No hay pagos registrados.
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-end"
                >
                  <Typography>
                    Subtotal: {formatCurrency(financialSummary.subtotal)}
                  </Typography>
                  <Typography>
                    Impuesto: {formatCurrency(financialSummary.tax)}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    Total Factura: {formatCurrency(financialSummary.total)}
                  </Typography>
                  <Divider sx={{ width: "50%", my: 1 }} />
                  <Typography>
                    Total Pagado: {formatCurrency(financialSummary.totalPagado)}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color:
                        financialSummary.saldoPendiente > 0
                          ? "error.main"
                          : "success.main",
                    }}
                  >
                    Saldo Pendiente:{" "}
                    {formatCurrency(financialSummary.saldoPendiente)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FacturaDetallesModal;
