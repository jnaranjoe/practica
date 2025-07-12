import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { getBloodTypes } from "../../api/pacientesApi";

const PacienteEditModal = ({
  open,
  onClose,
  paciente,
  onSubmit,
  isLoading,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const [bloodTypes, setBloodTypes] = useState([]);

  useEffect(() => {
    if (open) {
      getBloodTypes()
        .then((data) => setBloodTypes(data || []))
        .catch(console.error);
    }
  }, [open]);

  useEffect(() => {
    if (paciente) {
      reset(paciente);
    }
  }, [paciente, reset]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Editar Info. Médica de: {paciente?.per_names}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Controller
              name="pat_medical_conditions"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Condiciones Médicas"
                  fullWidth
                  multiline
                  rows={3}
                />
              )}
            />
            <Controller
              name="pat_allergies"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Alergias"
                  fullWidth
                  multiline
                  rows={3}
                />
              )}
            />
            <FormControl fullWidth error={!!errors.pat_blood_type}>
              <InputLabel>Tipo de Sangre</InputLabel>
              <Controller
                name="pat_blood_type"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} label="Tipo de Sangre">
                    {bloodTypes.map((bt) => (
                      <MenuItem key={bt.btp_id} value={bt.btp_id}>
                        {bt.btp_type}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            <Controller
              name="pat_emergency_contact_name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contacto de Emergencia (Nombre)"
                  fullWidth
                />
              )}
            />
            <Controller
              name="pat_emergency_contact_phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contacto de Emergencia (Teléfono)"
                  fullWidth
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PacienteEditModal;
