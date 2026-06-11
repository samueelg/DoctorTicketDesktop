import { api } from "./api";

export const usuariosService = {
  me: () => api.get("/me"),
  list: (params) => api.get("/usuarios", { params }),
  get: (id) => api.get(`/usuarios/${id}`),
  create: (payload) => api.post("/usuarios", payload),
  patch: (id, payload) => api.patch(`/usuarios/${id}`, payload),
  remove: (id) => api.delete(`/usuarios/${id}`),
};