// src/routes/AppRouter.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

import DashboardLayout from "../layouts/DashboardLayout";

import HomePage from "../pages/HomePage";
import SignIn from "../pages/SignIn";
import RegistrarFacturaPage from "../pages/RegistrarFacturaPage";
import HomePageAdmin from "../pages/admin/HomePageAdmin";
import UsuariosAdmin from "../pages/admin/usuario/UsuariosAdmin";
import PacientesAdmin from "../pages/admin/paciente/PacientesAdmin";
import MedicosAdmin from "../pages/admin/medico/MedicosAdmin";
import ReportesAdmin from "../pages/admin/reporte/ReportesAdmin";
import RegistrarUsuarioAdmin from "../pages/admin/usuario/RegistrarUsuarioAdmin";
import ConsultarUsuariosAdmin from "../pages/admin/usuario/ConsultarUsuariosAdmin";
import VentasAdmin from "../pages/admin/venta/VentasAdmin";
import ConsultarFacturasAdmin from "../pages/admin/venta/ConsultarFacturasAdmin";
import ProductosAdmin from "../pages/admin/producto/ProductosAdmin";
import RegistrarProductoAdmin from "../pages/admin/producto/RegistrarProductoAdmin";
import ConsultarProductosAdmin from "../pages/admin/producto/ConsultarProductosAdmin";
import SettingsPage from "../pages/admin/SettingsPage";
import AgendarCitasAdmin from "../pages/admin/agendamiento/AgendarCitasAdmin";

import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider, useAuth } from "../context/AuthContext";

const UnauthorizedPage = () => <div>403 - No Autorizado</div>;
const NotFoundPage = () => <div>404 - Página no encontrada</div>;

const InitialRedirect = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  return isAuthenticated ? <Navigate to="/admin/home" replace /> : <HomePage />;
};

export default function AppRouter() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* --- RUTAS PÚBLICAS --- */}
          <Route path="/" element={<InitialRedirect />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* --- RUTAS PROTEGIDAS --- */}
          <Route path="/admin" element={<DashboardLayout />}>
            {/* Rutas accesibles para TODOS los roles logueados */}
            <Route
              path="home"
              element={
                <ProtectedRoute
                  allowedRoles={["admin", "secretario/a", "medico"]}
                >
                  <HomePageAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="settings"
              element={
                <ProtectedRoute
                  allowedRoles={["admin", "secretario/a", "medico"]}
                >
                  <SettingsPage />
                </ProtectedRoute>
              }
            />

            {/* Rutas solo para ADMIN */}
            <Route
              path="usuarios"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <UsuariosAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="usuarios/registrar"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <RegistrarUsuarioAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="usuarios/consultar"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ConsultarUsuariosAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="medicos"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <MedicosAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="productos"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ProductosAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="productos/registrar"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <RegistrarProductoAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="productos/consultar"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ConsultarProductosAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="reportes"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ReportesAdmin />
                </ProtectedRoute>
              }
            />

            {/* Ruta de agendamiento para Admin y Secretario */}
            <Route
              path="agendamiento"
              element={
                <ProtectedRoute allowedRoles={["admin", "secretario/a"]}>
                  <AgendarCitasAdmin />
                </ProtectedRoute>
              }
            />

            {/* Rutas para ADMIN y SECRETARIO */}
            <Route
              path="ventas"
              element={
                <ProtectedRoute allowedRoles={["admin", "secretario/a"]}>
                  <VentasAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="ventas/registrar"
              element={
                <ProtectedRoute allowedRoles={["admin", "secretario/a"]}>
                  <RegistrarFacturaPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="ventas/consultar"
              element={
                <ProtectedRoute allowedRoles={["admin", "secretario/a"]}>
                  <ConsultarFacturasAdmin />
                </ProtectedRoute>
              }
            />

            {/* Rutas para ADMIN y MEDICO */}
            <Route
              path="pacientes"
              element={
                <ProtectedRoute allowedRoles={["admin", "medico"]}>
                  <PacientesAdmin />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
