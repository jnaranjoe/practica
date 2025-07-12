// src/components/usuarios/UsuarioForm.jsx
import React, { useState, useEffect } from "react";
import {
  Stack,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { getCatalogs } from "../../api/usuariosApi";

const UsuarioForm = ({ control, errors, isEditing = false }) => {
  const [catalogs, setCatalogs] = useState({
    genres: [],
    maritalStatus: [],
    roles: [],
  });

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const data = await getCatalogs();
        setCatalogs(data);
      } catch (error) {
        console.error("Error al cargar catálogos:", error);
      }
    };
    fetchCatalogs();
  }, []);

  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Controller
          name="per_identification"
          control={control}
          rules={{ required: "La identificación es requerida" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Identificación"
              fullWidth
              error={!!errors.per_identification}
              helperText={errors.per_identification?.message}
            />
          )}
        />
        <Controller
          name="per_birth_date"
          control={control}
          rules={{ required: "La fecha de nacimiento es requerida" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Fecha de Nacimiento"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!errors.per_birth_date}
              helperText={errors.per_birth_date?.message}
            />
          )}
        />
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Controller
          name="per_names"
          control={control}
          rules={{ required: "El nombre es requerido" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Nombres"
              fullWidth
              error={!!errors.per_names}
              helperText={errors.per_names?.message}
            />
          )}
        />
        <Controller
          name="per_surnames"
          control={control}
          rules={{ required: "El apellido es requerido" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Apellidos"
              fullWidth
              error={!!errors.per_surnames}
              helperText={errors.per_surnames?.message}
            />
          )}
        />
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Controller
          name="per_mail"
          control={control}
          rules={{
            required: "El correo es requerido",
            pattern: { value: /^\S+@\S+$/i, message: "Correo no válido" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Correo Electrónico"
              type="email"
              fullWidth
              error={!!errors.per_mail}
              helperText={errors.per_mail?.message}
            />
          )}
        />
        <Controller
          name="per_phone"
          control={control}
          rules={{ required: "El teléfono es requerido" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Teléfono"
              fullWidth
              error={!!errors.per_phone}
              helperText={errors.per_phone?.message}
            />
          )}
        />
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Controller
          name="per_country"
          control={control}
          rules={{ required: "El país es requerido" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="País"
              fullWidth
              error={!!errors.per_country}
              helperText={errors.per_country?.message}
            />
          )}
        />
        <Controller
          name="per_city"
          control={control}
          rules={{ required: "La ciudad es requerida" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Ciudad"
              fullWidth
              error={!!errors.per_city}
              helperText={errors.per_city?.message}
            />
          )}
        />
      </Stack>
      <Controller
        name="per_address"
        control={control}
        rules={{ required: "La dirección es requerida" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Dirección"
            fullWidth
            error={!!errors.per_address}
            helperText={errors.per_address?.message}
          />
        )}
      />
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <FormControl fullWidth error={!!errors.per_genre_id}>
          <InputLabel>Género</InputLabel>
          <Controller
            name="per_genre_id"
            control={control}
            rules={{ required: "Seleccione un género" }}
            render={({ field }) => (
              <Select {...field} label="Género">
                {catalogs.genres.map((g) => (
                  <MenuItem key={g.id} value={g.id}>
                    {g.genre_name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.per_genre_id?.message}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={!!errors.per_marital_status_id}>
          <InputLabel>Estado Civil</InputLabel>
          <Controller
            name="per_marital_status_id"
            control={control}
            rules={{ required: "Seleccione un estado civil" }}
            render={({ field }) => (
              <Select {...field} label="Estado Civil">
                {catalogs.maritalStatus.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.status_name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>
            {errors.per_marital_status_id?.message}
          </FormHelperText>
        </FormControl>
      </Stack>
      <FormControl fullWidth error={!!errors.id_rol}>
        <InputLabel>Rol</InputLabel>
        <Controller
          name="id_rol"
          control={control}
          rules={{ required: "Seleccione un rol" }}
          render={({ field }) => (
            <Select {...field} label="Rol" disabled={isEditing}>
              {catalogs.roles.map((r) => (
                <MenuItem key={r.rol_id} value={r.rol_id}>
                  {r.rol_name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText>{errors.id_rol?.message}</FormHelperText>
      </FormControl>
    </Stack>
  );
};

export default UsuarioForm;
