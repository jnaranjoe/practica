import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Snackbar,
  Alert,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProductoForm from "../../../components/productos/ProductoForm";

import { createProduct, getTherapyTypes } from "../../../api/productosApi";

const RegistrarProductoAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [therapyTypes, setTherapyTypes] = useState([]);

  useEffect(() => {
    getTherapyTypes()
      .then(setTherapyTypes)
      .catch(() => {
        setNotification({
          open: true,
          message: "Error al cargar tipos de terapia.",
          severity: "error",
        });
      });
  }, []);

  const handleCreateProduct = async (data) => {
    setIsLoading(true);
    try {
      const productData = {
        ...data,
        pro_price: parseFloat(data.pro_price),
        pro_total_sessions: parseInt(data.pro_total_sessions, 10),
        pro_therapy_type_id: parseInt(data.pro_therapy_type_id, 10),
      };
      await createProduct(productData);
      setNotification({
        open: true,
        message: "¡Producto creado exitosamente!",
        severity: "success",
      });
      setTimeout(() => navigate("/admin/productos/consultar"), 2000);
    } catch (error) {
      setNotification({
        open: true,
        message: error.response?.data?.message || "Error al crear el producto.",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Registrar Nuevo Producto
      </Typography>
      <form onSubmit={handleSubmit(handleCreateProduct)}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          {/* 4. Pasamos los tipos de terapia al formulario */}
          <ProductoForm
            control={control}
            errors={errors}
            therapyTypes={therapyTypes}
          />
        </Paper>
        <Box sx={{ mt: 3, display: "flex" }}>
          <Button
            type="submit"
            variant="contained"
            size="medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Guardar Producto"
            )}
          </Button>
        </Box>
      </form>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegistrarProductoAdmin;