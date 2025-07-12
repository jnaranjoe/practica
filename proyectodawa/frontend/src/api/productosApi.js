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

// --- FUNCIONES DE LA API ---
export const getProducts = async () => {
  const response = await API.get("/security/Product/list");
  return response.data.result ? response.data.data : [];
};

export const createProduct = async (productData) => {
  const response = await API.post("/security/Product/create", productData);
  return response.data;
};

export const updateProduct = async (productId, productData) => {
  const payload = { ...productData, pro_id: productId };
  const response = await API.put("/security/Product/update", payload);
  return response.data;
};

export const deleteProduct = async (productId) => {
  const response = await API.put("/security/Product/delete", {
    pro_id: productId,
    pro_state: false,
  });
  return response.data;

};

export const getTherapyTypes = async () => {
  const response = await API.get("/security/TherapyType/list");
  return response.data.result
    ? response.data.data.filter((t) => t.tht_state === true)
    : [];
};
