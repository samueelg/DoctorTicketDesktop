import { api } from "./api";

export const ligacaoService = {
  transcrever: (formData) => api.post('/transcrever', formData)
};