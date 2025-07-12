import React from "react";
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

const ProductoForm = ({ control, errors, therapyTypes }) => {
  return (
    <Stack spacing={2.5}>
      <Controller
        name="pro_name"
        control={control}
        rules={{ required: "El nombre del producto es requerido" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nombre del Producto"
            fullWidth
            error={!!errors.pro_name}
            helperText={errors.pro_name?.message}
          />
        )}
      />
      <Controller
        name="pro_description"
        control={control}
        rules={{ required: "La descripción es requerida" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Descripción"
            fullWidth
            multiline
            rows={3}
            error={!!errors.pro_description}
            helperText={errors.pro_description?.message}
          />
        )}
      />
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Controller
          name="pro_price"
          control={control}
          rules={{ required: "El precio es requerido" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Precio"
              type="number"
              fullWidth
              error={!!errors.pro_price}
              helperText={errors.pro_price?.message}
            />
          )}
        />
        <Controller
          name="pro_total_sessions"
          control={control}
          rules={{ required: "El número de sesiones es requerido" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Total de Sesiones"
              type="number"
              fullWidth
              error={!!errors.pro_total_sessions}
              helperText={errors.pro_total_sessions?.message}
            />
          )}
        />
      </Stack>
      <FormControl fullWidth error={!!errors.pro_therapy_type_id}>
        <InputLabel>Tipo de Terapia</InputLabel>
        <Controller
          name="pro_therapy_type_id"
          control={control}
          rules={{ required: "Debes seleccionar un tipo de terapia" }}
          render={({ field }) => (
            <Select {...field} label="Tipo de Terapia">
              {(therapyTypes || []).map((type) => (

                <MenuItem key={type.tht_id} value={type.tht_id}>
                  {type.tht_name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText>{errors.pro_therapy_type_id?.message}</FormHelperText>
      </FormControl>
    </Stack>
  );
};

export default ProductoForm;