// src/api/authApi.js
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL2;

export const loginRequest = async (email, password) => {
  const response = await axios.post(`${apiUrl}/security/login`, {
    login_user: email,
    login_password: password,
  });
  return response.data;
};
