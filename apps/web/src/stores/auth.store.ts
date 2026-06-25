'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/** Usuário autenticado (pai/mãe). Espelha o payload do JWT do backend. */
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'PARENT' | 'ADMIN';
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: () => boolean;
  setSession: (session: { user: AuthUser; accessToken: string }) => void;
  clear: () => void;
}

/**
 * Sessão de autenticação. Persistida em localStorage para sobreviver a reloads.
 * O token é lido pelo API client (`lib/api`) para montar o header Authorization.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: () => Boolean(get().accessToken),
      setSession: ({ user, accessToken }) => set({ user, accessToken }),
      clear: () => set({ user: null, accessToken: null }),
    }),
    { name: 'commet-auth' },
  ),
);
