// src/components/ventas/FacturaForm.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  MenuItem,
  IconButton,
  Alert,
  CircularProgress,
  Stack,
  Snackbar,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { DataGrid } from "@mui/x-data-grid";
import { getProductos, createInvoice } from "../../api/ventasApi";

const IVA_RATE = 0.15; // Según tu backend, usas 15%

export default function FacturaForm({ patient }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
      } catch (err) {
        setNotification({
          open: true,
          message: "Error al cargar productos.",
          severity: "error",
        });
      }
    };
    fetchProductos();
  }, []);

  useEffect(() => {
    const currentSubtotal = invoiceItems.reduce(
      (acc, item) => acc + item.ind_total,
      0
    );
    const calculatedDiscount = currentSubtotal * (discount / 100);
    const baseForTax = currentSubtotal - calculatedDiscount;
    const calculatedTax = baseForTax * IVA_RATE;
    setSubtotal(currentSubtotal);
    setTax(calculatedTax);
    setGrandTotal(baseForTax + calculatedTax);
  }, [invoiceItems, discount]);

  const handleAddItem = () => {
    const productToAdd = productos.find((p) => p.pro_id === selectedProductId);
    if (!productToAdd) return;
    const newItem = {
      id: Date.now(),
      ind_product_id: productToAdd.pro_id,
      pro_name: productToAdd.pro_name,
      ind_quantity: quantity,
      ind_unit_price: parseFloat(productToAdd.pro_price) || 0,
      ind_total: quantity * (parseFloat(productToAdd.pro_price) || 0),
    };
    setInvoiceItems((prev) => [...prev, newItem]);
    setSelectedProductId("");
    setQuantity(1);
  };

  const handleDeleteItem = (id) => {
    setInvoiceItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmitInvoice = async () => {
    if (invoiceItems.length === 0) {
      setNotification({
        open: true,
        message: "Debe agregar al menos un producto.",
        severity: "warning",
      });
      return;
    }
    setLoading(true);
    try {
      const invoiceData = {
        inv_client_id: patient.pat_person_id,
        inv_patient_id: patient.pat_id,
        inv_discount: subtotal * (discount / 100),
        details: invoiceItems.map((item) => ({
          ind_product_id: item.ind_product_id,
          ind_quantity: item.ind_quantity,
          ind_unit_price: item.ind_unit_price,
        })),
      };
      await createInvoice(invoiceData);
      setNotification({
        open: true,
        message: "¡Factura creada exitosamente!",
        severity: "success",
      });
      setInvoiceItems([]);
      setDiscount(0);
    } catch (err) {
      setNotification({
        open: true,
        message: err.response?.data?.message || "Error al crear la factura.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: "pro_name", headerName: "Producto", flex: 1 },
    {
      field: "ind_quantity",
      headerName: "Cantidad",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ind_unit_price",
      headerName: "Precio Unit.",
      width: 150,
      align: "right",
      headerAlign: "right",
      renderCell: (params) =>
        isFinite(params.value)
          ? `$${Number(params.value).toFixed(2)}`
          : "$0.00",
    },
    {
      field: "ind_total",
      headerName: "Total",
      width: 150,
      align: "right",
      headerAlign: "right",
      renderCell: (params) =>
        isFinite(params.value)
          ? `$${Number(params.value).toFixed(2)}`
          : "$0.00",
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 100,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={() => handleDeleteItem(params.row.id)}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Detalles de la Factura
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2 }}>
        <TextField
          select
          label="Seleccione un producto"
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          fullWidth
        >
          {productos.map((p) => (
            <MenuItem key={p.pro_id} value={p.pro_id}>{`${
              p.pro_name
            } - $${Number(p.pro_price).toFixed(2)}`}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Cantidad"
          type="number"
          value={quantity}
          onChange={(e) =>
            setQuantity(Math.max(1, parseInt(e.target.value) || 1))
          }
          sx={{ width: { xs: "100%", sm: 150 } }}
        />
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleAddItem}
          disabled={!selectedProductId}
        >
          Agregar
        </Button>
      </Stack>
      <Box sx={{ height: 300, width: "100%", mb: 2 }}>
        <DataGrid
          rows={invoiceItems}
          columns={columns}
          hideFooter
          localeText={{ noRowsLabel: "Aún no hay productos en la factura" }}
        />
      </Box>
      <Grid container spacing={2} justifyContent="flex-end" alignItems="center">
        <Grid item xs={12} sm={4}>
          <TextField
            label="Subtotal"
            value={`$${subtotal.toFixed(2)}`}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Descuento (%)"
            type="number"
            value={discount}
            onChange={(e) =>
              setDiscount(Math.max(0, parseFloat(e.target.value) || 0))
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label={`IVA (${IVA_RATE * 100}%)`}
            value={`$${tax.toFixed(2)}`}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="right">
            Total: ${grandTotal.toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmitInvoice}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Generar Factura"}
        </Button>
      </Box>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert severity={notification.severity} sx={{ width: "100%" }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
