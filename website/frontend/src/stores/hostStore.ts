import { create } from 'zustand';
import type { Host } from '@/types';

interface HostState {
  hosts: Host[];
  selectedHost: string | null;
  isLoading: boolean;
  error: string | null;
  setHosts: (hosts: Host[]) => void;
  addHost: (host: Host) => void;
  removeHost: (id: string) => void;
  updateHost: (id: string, updates: Partial<Host>) => void;
  setSelectedHost: (id: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useHostStore = create<HostState>((set) => ({
  hosts: [],
  selectedHost: null,
  isLoading: false,
  error: null,
  setHosts: (hosts) => set({ hosts }),
  addHost: (host) => set((state) => ({ hosts: [...state.hosts, host] })),
  removeHost: (id) => set((state) => ({
    hosts: state.hosts.filter(h => h.id !== id),
    selectedHost: state.selectedHost === id ? null : state.selectedHost
  })),
  updateHost: (id, updates) => set((state) => ({
    hosts: state.hosts.map(h => h.id === id ? { ...h, ...updates } : h)
  })),
  setSelectedHost: (id) => set({ selectedHost: id }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
