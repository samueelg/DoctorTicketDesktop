import { api } from "./api";

export const unidadeService = {
    get: () => api.get("/unidade"),
};