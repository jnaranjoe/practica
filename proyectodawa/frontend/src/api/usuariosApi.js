// src/api/usuariosApi.js
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL2;

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

export const getUsers = async () => {
  const response = await API.get("/security/UserRol/list");
  if (response.data.result && Array.isArray(response.data.data)) {
    return response.data.data.filter((user) => user.state === true);
  }
  return [];
};

export const createUser = async (userData) => {
  const response = await API.post("/security/custom1/create", userData);
  return response.data;
};

export const updateUser = async (personData) => {
  const response = await API.put("/security/Person/update", personData);
  return response.data;
};

export const deleteUserRole = async (userRoleId) => {
  const response = await API.put("/security/UserRol/delete", {
    id_user_rol: userRoleId,
    state: false,
  });
  return response.data;
};

export const getCatalogs = async () => {
  const [genres, maritalStatus, roles] = await Promise.all([
    API.get("/security/PersonGenre/list"),
    API.get("/security/MaritalStatus/list"),
    API.get("/security/Rol/list"),
  ]);
  return {
    genres: genres.data.data || [],
    maritalStatus: maritalStatus.data.data || [],
    roles: roles.data.data || [],
  };
};
