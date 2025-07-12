import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const HistoriaClinica = ({
  open, //Prop: Controla la visibilidad del modal 
  onClose, // Prop: Función para cerrar el modal.
  paciente, // Prop: Objeto paciente (usado para crear nueva historia, proporciona el patient_id).
  historiaInicial = null, // Prop: Objeto historia clínica para edición (si es null, es para crear).
  onGuardar // Prop: Función para guardar (crear o actualizar) la historia clínica.
}) => {
  // Estado local para la historia clínica que se está creando/editando 
  const [historia, setHistoria] = useState({
    hist_id: '',
    hist_patient_id: '',
    hist_primary_complaint: '',
    hist_related_trauma: false,  
    hist_current_treatment: '',
    hist_notes: ''
  });

   //Efecto para inicializar el formulario cuando el modal se abre o cambia el paciente/historia inicial ---
  useEffect(() => {
    if (historiaInicial) {
      setHistoria(historiaInicial); // Si hay historia inicial, carga sus datos para edición.
    } 
    else if (paciente) {

      // Si hay un paciente pero no historia inicial, es para crear una nueva historia.
      setHistoria({
        hist_id: '', 
        hist_patient_id: paciente.pat_id,
        hist_primary_complaint: '',
        hist_related_trauma: false, 
        hist_current_treatment: '',
        hist_notes: ''
      });
    }
  }, [historiaInicial, paciente, open]); 

  //Maneja los cambios en los campos del formulario 
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'hist_related_trauma') {
      setHistoria((prev) => ({
        ...prev,
        [name]: value === 'true' 
      }));
    } else {
      setHistoria((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Maneja el guardado de la historia clínica 
  const handleGuardar = () => {
    onGuardar(historia); // Llama a la función `onGuardar` (que puede ser `guardarHistoriaClinica` o `actualizarHistoriaClinica` en `Paciente`).
    onClose(); 
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{historiaInicial ? 'Editar Historia Clínica' : 'Nueva Historia Clínica'}</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} mt={1}>
          <TextField
            name="hist_primary_complaint"
            label="Motivo principal"
            value={historia.hist_primary_complaint || ''} 
            onChange={handleChange}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="label-related-trauma">Trauma relacionado</InputLabel>
            <Select
              labelId="label-related-trauma"
              name="hist_related_trauma"
              value={historia.hist_related_trauma.toString()} 
              label="Trauma relacionado"
              onChange={handleChange}
            >
              <MenuItem value="true">Sí</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="hist_current_treatment"
            label="Tratamiento actual"
            value={historia.hist_current_treatment || ''} 
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="hist_notes"
            label="Notas"
            value={historia.hist_notes || ''} 
            onChange={handleChange}
            multiline
            minRows={3}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleGuardar} variant="contained" color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HistoriaClinica;