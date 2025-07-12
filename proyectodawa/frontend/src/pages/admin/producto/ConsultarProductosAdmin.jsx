import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Button, Stack, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

import {
  getProducts,
  updateProduct,
  deleteProduct,
} from "../../../api/productosApi";
import ProductosTable from "../../../components/productos/ProductosTable";
import ProductoEditModal from "../../../components/productos/ProductoEditModal";
import ProductoDeleteDialog from "../../../components/productos/ProductoDeleteDialog";

const ConsultarProductosAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setNotification({
        open: true,
        message: "Error al cargar los productos.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleUpdateProduct = async (formData) => {
    if (!selectedProduct) return;
    setLoading(true);
    try {
      const payload = {
        pro_name: formData.pro_name,
        pro_description: formData.pro_description,
        pro_price: parseFloat(formData.pro_price),
        pro_total_sessions: parseInt(formData.pro_total_sessions, 10),
        pro_therapy_type_id: parseInt(formData.pro_therapy_type_id, 10),
      };

      await updateProduct(selectedProduct.pro_id, payload);

      setNotification({
        open: true,
        message: "Producto actualizado exitosamente!",
        severity: "success",
      });
      setEditModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error("Error al actualizar:", err);
      setNotification({
        open: true,
        message:
          err.response?.data?.message || "Error al actualizar el producto.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProduct) return;
    await deleteProduct(selectedProduct.pro_id);
    setNotification({
      open: true,
      message: "Producto eliminado!",
      severity: "success",
    });
    setDeleteDialogOpen(false);
    fetchProducts();
  };

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h4" component="h1">
          Listado de Productos
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/admin/productos/registrar")}
        >
          Registrar Producto
        </Button>
      </Stack>

      <ProductosTable
        products={products}
        loading={loading}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <ProductoEditModal
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        producto={selectedProduct}
        onSubmit={handleUpdateProduct}
        isLoading={loading}
      />

      <ProductoDeleteDialog
        open={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        productName={selectedProduct?.pro_name}
      />

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert severity={notification.severity} sx={{ width: "100%" }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ConsultarProductosAdmin;
