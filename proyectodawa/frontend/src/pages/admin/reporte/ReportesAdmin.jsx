// src/pages/admin/reporte/ReportesAdmin.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Grid, CircularProgress, Alert } from "@mui/material";
import { getTodaySales, getWeeklySales } from "../../../api/dashboardApi";
import StatCard from "../../../components/StatCard"; // Se utiliza el StatCard existente

const ReportesAdmin = () => {
  const [todayData, setTodayData] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [todayResponse, weeklyResponse] = await Promise.all([
        getTodaySales(),
        getWeeklySales(),
      ]);
      setTodayData(todayResponse);
      setWeeklyData(weeklyResponse);
    } catch (err) {
      setError(
        "No se pudieron cargar los datos del dashboard. Por favor, intente de nuevo."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  const weeklySalesTotal = weeklyData.reduce(
    (sum, day) => sum + day.total_sales,
    0
  );
  const weeklySalesChartData = weeklyData.map((day) => day.total_sales);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Reportes y Estadísticas
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Ventas de Hoy"
            value={`$${Number(todayData?.total_sales || 0).toFixed(2)}`}
            interval={`Total de ${todayData?.total_invoices || 0} facturas`}
            trend="up"
            data={[
              ...weeklySalesChartData.slice(-6),
              todayData?.total_sales || 0,
            ]}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Ventas de la Semana"
            value={`$${weeklySalesTotal.toFixed(2)}`}
            interval="Total de los últimos 7 días"
            trend="neutral"
            data={weeklySalesChartData}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportesAdmin;
