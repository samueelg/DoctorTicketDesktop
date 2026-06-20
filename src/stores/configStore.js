import { create } from "zustand";

export const useConfigStore = create((set) => ({
    isOpen: false,

    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));