import { create } from "zustand";
import { Toast } from "@/types";
import { uid } from "@/lib/utils";

interface UIState {
  theme: "light" | "dark";
  mobileMenuOpen: boolean;
  activeModal: string | null;
  toasts: Toast[];

  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
  setMobileMenu: (open: boolean) => void;
  openModal: (id: string) => void;
  closeModal: () => void;
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: "dark",
  mobileMenuOpen: false,
  activeModal: null,
  toasts: [],

  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),

  setTheme: (theme) => set({ theme }),

  setMobileMenu: (open) => set({ mobileMenuOpen: open }),

  openModal: (id) => set({ activeModal: id }),

  closeModal: () => set({ activeModal: null }),

  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: uid() }],
    })),

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
