// src/api/dashboardApi.js
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

/**
 * @description
 */
export const getTodaySales = async () => {
  const response = await API.get("/finance/dashboard/today-sales");
  return response.data.result
    ? response.data.data
    : { total_sales: 0, total_invoices: 0 };
};

/**
 * @description
 */
export const getWeeklySales = async () => {
  const response = await API.get("/finance/dashboard/weekly-sales-by-day");
  return response.data.result ? response.data.data : [];
};
