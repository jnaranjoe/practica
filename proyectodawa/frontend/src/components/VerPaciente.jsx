import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Divider,
  Button,
  Stack
} from '@mui/material';

const VerPaciente = ({ open, onClose, paciente, onEditarHistoria }) => {
  if (!paciente) return null;

  //Obtiene las historias clinicas del paciente si existen
  // Si no hay historias, inicializa como un array vacío
  const historias = paciente.historiasClinicas || [];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Detalles del Paciente</DialogTitle>
      <DialogContent dividers>
        <Typography variant="h6" gutterBottom>
          Datos Personales
        </Typography>
        <Box mb={2}>
          <Typography><strong>Identificacion:</strong> {paciente.per_identification}</Typography>
          <Typography><strong>Nombre:</strong> {paciente.per_names}</Typography>
          <Typography><strong>Apellido:</strong> {paciente.per_surnames}</Typography>
          <Typography><strong>Condiciones médicas:</strong> {paciente.pat_medical_conditions}</Typography>
          <Typography><strong>Alergias:</strong> {paciente.pat_allergies}</Typography>
          <Typography><strong>Tipo de sangre:</strong> {paciente.pat_blood_type}</Typography>
          <Typography><strong>Contacto emergencia:</strong> {paciente.pat_emergency_contact_name}</Typography>
          <Typography><strong>Teléfono:</strong> {paciente.pat_emergency_contact_phone}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Historias Clínicas
        </Typography>
        {historias.length > 0 ? ( //Si hay historias, las mapea y muestra
          historias.map((historia, index) => (
            <Box key={historia.hist_id} mb={2} p={2} border={1} borderRadius={2} borderColor="grey.300">
              <Typography><strong>Motivo principal:</strong> {historia.hist_primary_complaint}</Typography>
              <Typography><strong>Trauma relacionado:</strong> {historia.hist_related_trauma ? 'Sí' : 'No'}</Typography>
              <Typography><strong>Tratamiento actual:</strong> {historia.hist_current_treatment}</Typography>
              <Typography><strong>Notas:</strong> {historia.hist_notes}</Typography>
              <Stack direction="row" spacing={1} mt={1}>
                
                
                <Button variant="outlined" size="small" onClick={() => {
                  onEditarHistoria(historia); // Llama a la función para editar la historia clínica
                  onClose();
                }}>
                  Editar
                </Button>

              </Stack>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">Sin historia clínica registrada.</Typography>
        )}
      </DialogContent>

      <Box textAlign="center" my={2}>
        <Button onClick={onClose} variant="contained" color="primary">
          Cerrar
        </Button>
      </Box>
    </Dialog>
  );
};

export default VerPaciente;

