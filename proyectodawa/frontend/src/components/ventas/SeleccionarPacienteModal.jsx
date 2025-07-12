// src/components/ventas/SeleccionarPacienteModal.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import { getPacientes } from "../../api/ventasApi";

const SeleccionarPacienteModal = ({ open, onClose, onSelectPatient }) => {
  const [pacientes, setPacientes] = useState([]);
  const [filteredPacientes, setFilteredPacientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (open) {
      const fetchPacientes = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await getPacientes();
          setPacientes(data);
          setFilteredPacientes(data);
        } catch (err) {
          setError("No se pudieron cargar los pacientes.");
        } finally {
          setLoading(false);
        }
      };
      fetchPacientes();
    }
  }, [open]);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = pacientes.filter(
      (p) =>
        `${p.per_names} ${p.per_surnames}`
          .toLowerCase()
          .includes(lowercasedFilter) ||
        p.per_identification.includes(lowercasedFilter)
    );
    setFilteredPacientes(filtered);
  }, [searchTerm, pacientes]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Seleccionar Paciente</DialogTitle>
      <DialogContent dividers>
        <TextField
          autoFocus
          label="Buscar por nombre o identificación..."
          fullWidth
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && (
          <List sx={{ maxHeight: 400, overflow: "auto" }}>
            {filteredPacientes.map((paciente) => (
              <ListItem key={paciente.pat_id} disablePadding>
                <ListItemButton onClick={() => onSelectPatient(paciente)}>
                  <ListItemText
                    primary={`${paciente.per_names} ${paciente.per_surnames}`}
                    secondary={`ID: ${paciente.per_identification}`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SeleccionarPacienteModal;
