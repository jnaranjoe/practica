import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { getPaymentMethods, createPayment } from "../../api/ventasApi";

const RegistrarPagoModal = ({ open, onClose, invoice, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: "",
      paymentMethodId: "",
      reference: "",
      paymentDate: new Date().toISOString().split("T")[0],
    },
  });

  const selectedMethodId = watch("paymentMethodId");
  const selectedMethod = paymentMethods.find(
    (p) => p.pme_id === selectedMethodId
  );

  // Efecto para cargar los métodos de pago al abrir el modal
  useEffect(() => {
    if (open) {
      getPaymentMethods()
        .then(setPaymentMethods)
        .catch(() => setError("No se pudieron cargar los métodos de pago."));
    } else {
      reset(); // Limpia el formulario y los errores al cerrar
      setError(null);
    }
  }, [open, reset]);

  // Cálculo seguro del saldo pendiente
  const balanceDue = invoice
    ? Number(invoice.inv_grand_total || 0) - Number(invoice.total_paid || 0)
    : 0;

  // Función que se ejecuta al enviar el formulario
  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("inp_invoice_id", invoice.inv_id);
    formData.append("inp_payment_method_id", data.paymentMethodId);
    formData.append("inp_amount", data.amount);

    if (data.reference) {
      formData.append("inp_reference", data.reference);
    }

    // Como acordamos en la Opción 2, no enviamos la fecha para evitar el error de validación.
    // El backend usará la fecha actual del servidor.
    // formData.append("date_created", data.paymentDate);

    try {
      await createPayment(formData);

      // ¡Clave! Llama a onSuccess con el monto pagado para actualizar la UI en tiempo real.
      onSuccess(data.amount);
    } catch (err) {
      setError(
        err.response?.data?.message || "Ocurrió un error al registrar el pago."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Registrar Pago para Factura: {invoice?.inv_number}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {invoice && (
            <Box mb={2}>
              <Typography>
                Cliente: <strong>{invoice.client_name}</strong>
              </Typography>
              <Typography color="error">
                Saldo Pendiente: <strong>${balanceDue.toFixed(2)}</strong>
              </Typography>
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="amount"
                control={control}
                rules={{
                  required: "El monto es obligatorio",
                  valueAsNumber: true,
                  validate: (value) =>
                    (value > 0 && value <= balanceDue) ||
                    `El monto debe ser entre $0.01 y $${balanceDue.toFixed(2)}`,
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Monto a Pagar"
                    type="number"
                    fullWidth
                    error={!!errors.amount}
                    helperText={errors.amount?.message}
                    inputProps={{ step: "0.01" }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="paymentDate"
                control={control}
                rules={{ required: "La fecha es obligatoria" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Fecha de Pago"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    error={!!errors.paymentDate}
                    helperText={errors.paymentDate?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.paymentMethodId}>
                <InputLabel>Método de Pago</InputLabel>
                <Controller
                  name="paymentMethodId"
                  control={control}
                  rules={{ required: "Seleccione un método de pago" }}
                  render={({ field }) => (
                    <Select {...field} label="Método de Pago">
                      {paymentMethods.map((method) => (
                        <MenuItem key={method.pme_id} value={method.pme_id}>
                          {method.pme_name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.paymentMethodId && (
                  <Typography
                    color="error"
                    variant="caption"
                    sx={{ pl: 2, pt: 0.5 }}
                  >
                    {errors.paymentMethodId.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            {selectedMethod?.pme_require_references && (
              <Grid item xs={12}>
                <Controller
                  name="reference"
                  control={control}
                  rules={{
                    required: "La referencia es obligatoria para este método",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Número de Referencia"
                      fullWidth
                      error={!!errors.reference}
                      helperText={errors.reference?.message}
                    />
                  )}
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: "16px 24px" }}>
          <Button onClick={onClose} color="secondary" disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Registrar Pago"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RegistrarPagoModal;
