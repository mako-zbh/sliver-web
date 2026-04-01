import { create } from 'zustand';

interface ConnectionState {
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  operator: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export const useConnectionStore = create<ConnectionState>((set) => ({
  isConnected: false,
  isConnecting: false,
  error: null,
  operator: null,
  connect: async () => {
    set({ isConnecting: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ isConnected: true, isConnecting: false, operator: 'operator' });
    } catch (err) {
      set({ error: 'Failed to connect', isConnecting: false });
    }
  },
  disconnect: () => set({ isConnected: false, operator: null }),
}));
