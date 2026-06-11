import { api } from "./api";

export const ticketService = {
    create: (payload) => api.post("/ticket", payload),
}