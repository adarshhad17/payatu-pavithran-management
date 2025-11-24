import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ======================================
// AUTH
// ======================================
export const authRegister = (b) => api.post("/auth/register", b);
export const authLogin = (b) => api.post("/auth/login", b);

// ======================================
// PARENT — GET ALL TRANSACTIONS
// ======================================
export const getTransactions = (q = "") =>
  api.get(`/transactions${q ? `?q=${q}` : ""}`);

// ======================================
// PARENT — UPDATE ONLY NOTE
// (Backend uses: PUT /api/transactions/:id)
// ======================================
export const updateNoteApi = (id, body) =>
  api.put(`/transactions/${id}`, body);

// ======================================
// ADMIN — ADD NEW RECORD
// (Backend uses: POST /api/admin/add)
// ======================================
export const adminAddApi = (data) =>
  api.post("/admin/add", data);

// ======================================
// ADMIN — UPDATE FULL RECORD
// (Backend uses: PUT /api/admin/:id)
// ======================================
export const adminUpdateApi = (id, body) =>
  api.put(`/admin/${id}`, body);

// ======================================
// ADMIN — DELETE RECORD
// (Backend uses: DELETE /api/admin/:id)
// ======================================
export const adminDeleteApi = (id) =>
  api.delete(`/admin/${id}`);
