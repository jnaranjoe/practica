// src/components/agendamiento/AgendarCitaModal.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { getMedicos } from "../../api/medicosApi"; // API para obtener la lista de médicos

const AgendarCitaModal = ({
  open,
  onClose,
  onSubmit,
  terapiaName,
  loading,
}) => {
  const [medicos, setMedicos] = useState([]);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      therapist_id: "",
      scheduled_datetime: "",
    },
  });

  useEffect(() => {
    if (open) {
      // Carga la lista de médicos cuando el modal se abre
      getMedicos()
        .then(setMedicos)
        .catch(() => console.error("No se pudo cargar la lista de médicos."));
    } else {
      reset(); // Limpia el formulario al cerrar
    }
  }, [open, reset]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Agendar Cita</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} sx={{ pt: 1 }}>
            <Typography>
              Terapia seleccionada: <strong>{terapiaName}</strong>
            </Typography>

            <Controller
              name="scheduled_datetime"
              control={control}
              rules={{ required: "Debe seleccionar una fecha y hora" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Fecha y Hora de la Cita"
                  type="datetime-local"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.scheduled_datetime}
                  helperText={errors.scheduled_datetime?.message}
                />
              )}
            />

            <FormControl fullWidth error={!!errors.therapist_id}>
              <InputLabel id="therapist-select-label">Terapeuta</InputLabel>
              <Controller
                name="therapist_id"
                control={control}
                rules={{ required: "Debe seleccionar un terapeuta" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="therapist-select-label"
                    label="Terapeuta"
                  >
                    {medicos.map((medico) => (
                      <MenuItem key={medico.med_id} value={medico.med_id}>
                        {`${medico.per_names} ${medico.per_surnames}`}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>{errors.therapist_id?.message}</FormHelperText>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Confirmar Cita"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AgendarCitaModal;
