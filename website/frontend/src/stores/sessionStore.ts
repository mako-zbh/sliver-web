import { create } from 'zustand';
import type { Session } from '@/types';

interface SessionState {
  sessions: Session[];
  activeSession: string | null;
  isLoading: boolean;
  error: string | null;
  setSessions: (sessions: Session[]) => void;
  addSession: (session: Session) => void;
  removeSession: (id: string) => void;
  setActiveSession: (id: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  sessions: [],
  activeSession: null,
  isLoading: false,
  error: null,
  setSessions: (sessions) => set({ sessions }),
  addSession: (session) => set((state) => ({ sessions: [...state.sessions, session] })),
  removeSession: (id) => set((state) => ({ 
    sessions: state.sessions.filter(s => s.id !== id),
    activeSession: state.activeSession === id ? null : state.activeSession
  })),
  setActiveSession: (id) => set({ activeSession: id }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
