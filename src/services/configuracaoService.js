import { api } from "./api";

export const configuracaoService = {
  salvar: (id, params) => api.post(`/configuracao/${id}`, params),
};