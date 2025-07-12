// src/pages/admin/agendamiento/AgendarCitasAdmin.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Button, Paper, Snackbar, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// Importaciones de tus componentes y API
import SeleccionarPacienteModal from "../../../components/ventas/SeleccionarPacienteModal";
import SeleccionarSesionModal from "../../../components/agendamiento/SeleccionarSesionModal";
import AgendarCitaModal from "../../../components/agendamiento/AgendarCitaModal";
import CitaDetallesModal from "../../../components/agendamiento/CitaDetallesModal";
import {
  getAllScheduledSessions,
  getAvailableSessions,
  scheduleSession,
  consumeSession,
} from "../../../api/schedulingApi";

const AgendarCitasAdmin = () => {
  const [isPatientModalOpen, setPatientModalOpen] = useState(false);
  const [isSessionModalOpen, setSessionModalOpen] = useState(false);
  const [isSchedulingModalOpen, setSchedulingModalOpen] = useState(false);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [availableSessions, setAvailableSessions] = useState([]);
  const [sessionToSchedule, setSessionToSchedule] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const fetchAllAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllScheduledSessions();

      const formattedEvents = data.map((event) => ({
        id: event.sec_id,
        title: `${event.patient_name} - ${event.therapy_name}`,
        start: event.appointment_datetime,

        color: event.ses_consumed ? "#388e3c" : "#1976d2",
        extendedProps: {
          therapist: event.therapist_name,
          consumed: event.ses_consumed,
        },
      }));
      setCalendarEvents(formattedEvents);
    } catch (error) {
      setNotification({
        open: true,
        message: "Error al cargar las citas del calendario.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllAppointments();
  }, [fetchAllAppointments]);

  const handleOpenPatientModal = () => setPatientModalOpen(true);

  const handlePatientSelected = async (paciente) => {
    setPatientModalOpen(false);
    setSelectedPatient(paciente);
    setLoading(true);
    setSessionModalOpen(true);
    try {
      const sessions = await getAvailableSessions(paciente.pat_id);
      setAvailableSessions(sessions);
    } catch (error) {
      setNotification({
        open: true,
        message: "Error al cargar las sesiones del paciente.",
        severity: "error",
      });
      setSessionModalOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSessionSelected = (sesion) => {
    setSessionModalOpen(false);
    setSessionToSchedule(sesion);
    setSchedulingModalOpen(true);
  };

  const handleConfirmSchedule = async (formData) => {
    setLoading(true);
    const scheduleData = {
      session_id: sessionToSchedule.sec_id,
      therapist_id: formData.therapist_id,
      scheduled_datetime: formData.scheduled_datetime,
    };
    try {
      await scheduleSession(scheduleData);
      setNotification({
        open: true,
        message: "¡Cita agendada exitosamente!",
        severity: "success",
      });
      setSchedulingModalOpen(false);
      fetchAllAppointments();
    } catch (error) {
      setNotification({
        open: true,
        message: error.response?.data?.message || "Error al agendar la cita.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setDetailsModalOpen(true);
  };

  const handleConsumeSession = async (sessionId) => {
    setLoading(true);
    try {
      await consumeSession(sessionId);
      setNotification({
        open: true,
        message: "Sesión marcada como realizada.",
        severity: "success",
      });
      setDetailsModalOpen(false);
      fetchAllAppointments();
    } catch (error) {
      setNotification({
        open: true,
        message: "Error al actualizar la sesión.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          Agenda de Citas
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenPatientModal}
        >
          Agendar Nueva Cita
        </Button>
      </Box>

      <Paper sx={{ p: 2, border: "1px solid", borderColor: "divider" }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={calendarEvents}
          eventClick={handleEventClick}
          height="70vh"
          locale="es"
          buttonText={{
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
          }}
        />
      </Paper>

      <SeleccionarPacienteModal
        open={isPatientModalOpen}
        onClose={() => setPatientModalOpen(false)}
        onSelectPatient={handlePatientSelected}
      />
      <SeleccionarSesionModal
        open={isSessionModalOpen}
        onClose={() => setSessionModalOpen(false)}
        availableSessions={availableSessions}
        onSelectSession={handleSessionSelected}
        loading={loading}
      />
      <AgendarCitaModal
        open={isSchedulingModalOpen}
        onClose={() => setSchedulingModalOpen(false)}
        onSubmit={handleConfirmSchedule}
        terapiaName={sessionToSchedule?.pro_name}
        loading={loading}
      />

      <CitaDetallesModal
        open={isDetailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        event={selectedEvent}
        onConsume={handleConsumeSession}
        loading={loading}
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

export default AgendarCitasAdmin;
