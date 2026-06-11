import { api } from "./api";

export const relatorioService = {
  getTicketsChat: (params) => api.get('/relatorio', {params}),
  exportarRelatorio: (params) => api.get('/relatorios/exportarRelatorio', {params, responseType: 'blob'})
};