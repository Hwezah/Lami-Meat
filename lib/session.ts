"use client";

import { create } from "zustand";
import { readJSON, writeJSON } from "./storage";

/**
 * Auth UI stub. The session lives in sessionStorage["lm-session"].
 * Nothing is sent to a server. Swap for NextAuth / Clerk / Supabase later,
 * keeping the validation messages in lib/auth-validate.ts.
 */
export type Session = { name: string; email: string; at: number };

type SessionState = {
  session: Session | null;
  hydrate: () => void;
  signIn: (s: Omit<Session, "at">) => void;
  signOut: () => void;
};

const KEY = "lm-session";

export const useSession = create<SessionState>((set) => ({
  session: null,
  hydrate: () => {
    const s = readJSON<Session>("session", KEY);
    set({ session: s && s.email ? s : null });
  },
  signIn: (s) => {
    const session = { ...s, at: Date.now() };
    writeJSON("session", KEY, session);
    set({ session });
  },
  signOut: () => {
    writeJSON("session", KEY, null);
    set({ session: null });
  },
}));
