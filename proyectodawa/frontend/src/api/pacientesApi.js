import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL3;

const API = axios.create({
  baseURL: apiUrl,
});

// Añadimos el interceptor para que todas las peticiones lleven el token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    // Tu backend espera una cabecera 'token'
    config.headers["token"] = token;
  }
  return config;
});

// --- FUNCIONES DE LA API ---
export const getPacientes = async () => {
  const response = await API.get("/security/Patient/list");
  // Filtramos en el frontend por si el backend no lo hace
  return response.data.result
    ? response.data.data.filter((p) => p.pat_state === true)
    : [];
};

export const updatePaciente = async (patientData) => {
  const response = await API.put("/security/Patient/update", patientData);
  return response.data;
};

export const deletePaciente = async (patientId) => {
  const response = await API.put("/security/Patient/delete", {
    pat_id: patientId,
    pat_state: false,
  });
  return response.data;
};

export const getHistoriasClinicas = async () => {
  try {
    const response = await API.get("/security/MedHistory/list");
    return response.data.result ? response.data.data : [];
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return []; // Si no hay historias, devuelve un array vacío
    }
    throw error;
  }
};

export const createHistoriaClinica = async (historiaData) => {
  const response = await API.post("/security/MedHistory/create", historiaData);
  return response.data;
};

export const updateHistoriaClinica = async (historiaData) => {
  const response = await API.put("/security/MedHistory/update", historiaData);
  return response.data;
};

export const getBloodTypes = async () => {
  try {
    const response = await API.get("/security/BloodType/list");
    return response.data.result ? response.data.data : [];
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn(
        "No se encontraron tipos de sangre en la BD, devolviendo lista vacía."
      );
      return [];
    }
    throw error;
  }
};
