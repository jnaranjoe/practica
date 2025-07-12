import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: apiUrl,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["token"] = token;
  }
  return config;
});

export const getMedicos = async () => {
  const response = await API.get("/security/Medic/list");
  return response.data.result
    ? response.data.data.filter((m) => m.med_state === true)
    : [];
};

export const updateMedico = async (medicoData) => {
  const response = await API.put("/security/Medic/update", medicoData);
  return response.data;
};

export const deleteMedico = async (medicoId) => {
  const response = await API.put("/security/Medic/delete", {
    med_id: medicoId,
    med_state: false,
  });
  return response.data;
};

export const getTiposDeMedico = async () => {
  try {
    const response = await API.get("/security/TypeMedic/list");
    return response.data.result ? response.data.data : [];
  } catch (error) {
    if (error.response && error.response.status === 404) return [];
    throw error;
  }
};
