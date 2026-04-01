import { create } from 'zustand';
import type { Listener } from '@/types';

interface ListenerState {
  listeners: Listener[];
  isLoading: boolean;
  error: string | null;
  setListeners: (listeners: Listener[]) => void;
  addListener: (listener: Listener) => void;
  removeListener: (id: string) => void;
  updateListener: (id: string, updates: Partial<Listener>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useListenerStore = create<ListenerState>((set) => ({
  listeners: [],
  isLoading: false,
  error: null,
  setListeners: (listeners) => set({ listeners }),
  addListener: (listener) => set((state) => ({ listeners: [...state.listeners, listener] })),
  removeListener: (id) => set((state) => ({ 
    listeners: state.listeners.filter(l => l.id !== id) 
  })),
  updateListener: (id, updates) => set((state) => ({
    listeners: state.listeners.map(l => l.id === id ? { ...l, ...updates } : l)
  })),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
