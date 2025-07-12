// src/api/ventasApi.js
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: apiUrl,
});

// 3. Añadimos el interceptor para que todas las peticiones lleven el token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// --- FUNCIONES DE LA API ---

export const getPacientes = async () => {
  const response = await API.get("/security/Patient/list");
  return response.data.result
    ? response.data.data.filter((p) => p.pat_state === true)
    : [];
};

export const getProductos = async () => {
  const response = await API.get("/security/Product/list");
  return response.data.result
    ? response.data.data.filter((p) => p.pro_state === true)
    : [];
};

export const createInvoice = async (invoiceData) => {
  const response = await API.post("/finance/invoice/create", invoiceData);
  return response.data;
};

export const getInvoices = async () => {
  const response = await API.get("/finance/invoices");
  return response.data.result ? response.data.data : [];
};

export const getInvoiceById = async (invoiceId) => {
  const response = await API.get(`/finance/invoice?id=${invoiceId}`);
  return response.data;
};

export const getPaymentMethods = async () => {
  const response = await API.get("/finance/payment-methods");
  return response.data.result ? response.data.data : [];
};

export const createPayment = async (paymentData) => {
  const response = await API.post("/finance/payment/create", paymentData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getPaymentsByInvoiceId = async (invoiceId) => {
  try {
    const response = await API.get(
      `/finance/invoice/payments?invoice_id=${invoiceId}`
    );
    return response.data.result ? response.data.data : [];
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return [];
    }
    throw error;
  }
};

/**
 * @description Anula una factura cambiando su estado a inactivo.
 * @param {number} invoiceId - El ID de la factura a anular.
 * @returns {Promise<Object>} La respuesta de la API.
 */
export const voidInvoice = async (invoiceId) => {
  try {
    const response = await API.put("/finance/invoice/update-state", {
      inv_id: invoiceId,
      inv_state: false, // false significa que la factura se anula.
    });
    return response.data;
  } catch (error) {
    console.error("Error voiding invoice:", error);
    throw error;
  }
};

/**
 * @description Solicita al backend que envíe una factura por correo.
 * @param {number} invoiceId - El ID de la factura a enviar.
 * @returns {Promise<Object>} La respuesta de la API.
 */
export const sendInvoiceByEmail = async (invoiceId) => {
  try {
    // Hacemos una petición POST con el ID de la factura en el cuerpo
    const response = await API.post("/finance/invoice/send-email", {
      invoice_id: invoiceId,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending invoice by email:", error);
    throw error;
  }
};
