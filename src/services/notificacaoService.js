import { api } from "./api";

export const notificacaoService = {
    create: () => api.post("/notificacao"),
    listar: () => api.get("/notificacao"),
    ler: (id) => api.patch(`/notificacao/${id}`),
    remover: (id) => api.delete(`/notificacao/${id}`)
}