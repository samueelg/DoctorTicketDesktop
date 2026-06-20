import { create } from "zustand";
import { usuariosService } from "../services/usuarioService";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,

  fetchUser: async () => {
    try {
      set({ loading: true });

      const response = await usuariosService.me();

      if (response.status === 200) {
        set({
          user: {
            id: response.data.id,
            nome: response.data.nome,
            ramal: response.data.ramal,
            tipo: response.data.tipo,
            idMovidesk: response.data.idMovidesk,
            exibeNotificacoes: response.data.exibeNotificacoes ?? true,
          },
        });
      }
    } catch (error) {
      console.log("Erro ao buscar usuário:", error);
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    set({ user: null });
  },
}));