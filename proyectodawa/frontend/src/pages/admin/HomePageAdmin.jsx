// src/pages/admin/HomePageAdmin.jsx
import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { BarChart } from "@mui/x-charts/BarChart";

import { getTodaySales, getWeeklySales } from "../../api/dashboardApi";
import { getAllScheduledSessions } from "../../api/schedulingApi";

import StatCard from "../../components/StatCard";

const getInitials = (name = "") => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2);
};

const HomePageAdmin = () => {
  const [todayData, setTodayData] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [todayResponse, weeklyResponse, appointmentsResponse] =
        await Promise.all([
          getTodaySales(),
          getWeeklySales(),
          getAllScheduledSessions(),
        ]);

      setTodayData(todayResponse);
      setWeeklyData(weeklyResponse);

      const today = new Date().setHours(0, 0, 0, 0);
      const todaysApps = appointmentsResponse.filter((app) => {
        const appDate = new Date(app.appointment_datetime).setHours(0, 0, 0, 0);
        return appDate === today;
      });
      setTodaysAppointments(todaysApps);
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
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  const weeklyChartData = weeklyData.map((day) => day.total_sales);
  const weeklyChartLabels = weeklyData.map((day) =>
    new Date(day.sale_date).toLocaleDateString("es-EC", { weekday: "short" })
  );

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Ventas de Hoy"
            value={`$${Number(todayData?.total_sales || 0).toFixed(2)}`}
            interval={`Total de ${todayData?.total_invoices || 0} facturas`}
            trend="up"
            data={weeklyChartData}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Citas de Hoy
            </Typography>
            {todaysAppointments.length > 0 ? (
              <List dense>
                {todaysAppointments.map((app) => (
                  <React.Fragment key={app.sec_id}>
                    <ListItem>
                      <ListItemIcon
                        sx={{
                          minWidth: 40,
                          bgcolor: "primary.main",
                          color: "white",
                          borderRadius: "50%",
                          p: 1,
                          mr: 2,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {getInitials(app.patient_name)}
                      </ListItemIcon>
                      <ListItemText
                        primary={app.patient_name}
                        secondary={`${new Date(
                          app.appointment_datetime
                        ).toLocaleTimeString("es-EC", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })} - ${app.therapy_name}`}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="80%"
              >
                <EventAvailableIcon
                  color="disabled"
                  sx={{ fontSize: 40, mb: 1 }}
                />
                <Typography color="text.secondary">
                  No hay citas para hoy
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 2, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Ventas de la Semana
            </Typography>
            {weeklyChartData.length > 0 ? (
              <Box sx={{ width: "100%", height: 300 }}>
                <BarChart
                  series={[
                    { data: weeklyChartData, label: "Ventas ($)", type: "bar" },
                  ]}
                  xAxis={[{ scaleType: "band", data: weeklyChartLabels }]}
                />
              </Box>
            ) : (
              <Typography color="text.secondary">
                No hay datos de ventas para esta semana.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePageAdmin;
