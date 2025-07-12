// src/api/schedulingApi.js
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: apiUrl,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// --- FUNCIONES DE LA API DE AGENDAMIENTO ---

/**
 * @description
 */
export const getAllScheduledSessions = async () => {
  const response = await API.get("/scheduling/all-appointments");
  return response.data.result ? response.data.data : [];
};

/**
 * @description
 * @param {number} patientId
 */
export const getAvailableSessions = async (patientId) => {
  const response = await API.get(
    `/scheduling/patient-sessions?patient_id=${patientId}`
  );
  return response.data.result ? response.data.data : [];
};

/**
 * @description
 * @param {object} scheduleData
 */
export const scheduleSession = async (scheduleData) => {
  const response = await API.put("/scheduling/schedule-session", scheduleData);
  return response.data;
};

/**
 * @description
 * @param {object} updateData
 */
export const updateScheduledSession = async (updateData) => {
  const response = await API.put("/scheduling/update-appointment", updateData);
  return response.data;
};

/**
 * @description
 * @param {number} sessionId
 */
export const consumeSession = async (sessionId) => {
  const response = await API.put("/scheduling/consume-session", {
    session_id: sessionId,
  });
  return response.data;
};
