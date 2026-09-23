"use client";

import { create } from "zustand";

type Overlay = "menu" | "search" | null;
type AuthModal = "login" | "signup" | "signout" | null;

type UIState = {
  overlay: Overlay;
  auth: AuthModal;
  toast: { msg: string; id: number } | null;
  open: (o: Exclude<Overlay, null>) => void;
  close: () => void;
  openAuth: (m: Exclude<AuthModal, null>) => void;
  closeAuth: () => void;
  showToast: (msg: string) => void;
  hideToast: () => void;
};

let toastTimer: ReturnType<typeof setTimeout> | undefined;

export const useUI = create<UIState>((set) => ({
  overlay: null,
  auth: null,
  toast: null,
  open: (overlay) => set({ overlay }),
  close: () => set({ overlay: null }),
  openAuth: (auth) => set({ auth }),
  closeAuth: () => set({ auth: null }),
  // One toast at a time; a new one restarts the 3.2s timer.
  showToast: (msg) => {
    clearTimeout(toastTimer);
    set({ toast: { msg, id: Date.now() } });
    toastTimer = setTimeout(() => set({ toast: null }), 3200);
  },
  hideToast: () => set({ toast: null }),
}));
