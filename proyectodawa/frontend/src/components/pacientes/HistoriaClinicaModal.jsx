import React, { useEffect } from "react";
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
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

const HistoriaClinicaModal = ({
  open,
  onClose,
  paciente,
  historia,
  onSubmit,
}) => {
  const { handleSubmit, control, reset } = useForm();
  const isEditing = !!historia;

  useEffect(() => {
    if (open) {
      if (isEditing) {
        reset(historia);
      } else {
        reset({
          hist_patient_id: paciente?.pat_id,
          hist_primary_complaint: "",
          hist_related_trauma: false,
          hist_current_treatment: "",
          hist_notes: "",
        });
      }
    }
  }, [open, isEditing, historia, paciente, reset]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          {isEditing ? "Editar Historia Clínica" : "Nueva Historia Clínica"}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Controller
              name="hist_primary_complaint"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Motivo Principal" fullWidth />
              )}
            />
            <FormControl fullWidth>
              <InputLabel>Trauma Relacionado</InputLabel>
              <Controller
                name="hist_related_trauma"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Select {...field} label="Trauma Relacionado">
                    <MenuItem value={true}>Sí</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
            <Controller
              name="hist_current_treatment"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Tratamiento Actual" fullWidth />
              )}
            />
            <Controller
              name="hist_notes"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Notas"
                  fullWidth
                  multiline
                  rows={3}
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default HistoriaClinicaModal;
