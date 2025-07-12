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
import { getTiposDeMedico } from "../../api/medicosApi";

const MedicoEditModal = ({ open, onClose, medico, onSubmit, isLoading }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const [tiposDeMedico, setTiposDeMedico] = useState([]);

  useEffect(() => {
    if (open) {
      getTiposDeMedico().then(setTiposDeMedico).catch(console.error);
    }
  }, [open]);

  useEffect(() => {
    if (medico) {
      reset(medico);
    }
  }, [medico, reset]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Editar Personal Médico: {medico?.per_names}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <FormControl fullWidth error={!!errors.med_type_id}>
              <InputLabel>Tipo de Personal</InputLabel>
              <Controller
                name="med_type_id"
                control={control}
                rules={{ required: "Campo requerido" }}
                render={({ field }) => (
                  <Select {...field} label="Tipo de Personal">
                    {tiposDeMedico.map((tipo) => (
                      <MenuItem key={tipo.mpt_id} value={tipo.mpt_id}>
                        {tipo.mpt_name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>{errors.med_type_id?.message}</FormHelperText>
            </FormControl>
            <Controller
              name="med_specialty"
              control={control}
              rules={{ required: "La especialidad es requerida" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Especialidad"
                  fullWidth
                  error={!!errors.med_specialty}
                  helperText={errors.med_specialty?.message}
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

export default MedicoEditModal;
