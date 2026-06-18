import { api } from "./api";

export const franqueadoService = {
    get: (params) => api.get("/franqueado", { params }),
};