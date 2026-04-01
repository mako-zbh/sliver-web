import { create } from 'zustand';
import type { Beacon, Task } from '@/types';

interface BeaconState {
  beacons: Beacon[];
  selectedBeacon: string | null;
  tasks: Map<string, Task[]>;
  isLoading: boolean;
  error: string | null;
  setBeacons: (beacons: Beacon[]) => void;
  addBeacon: (beacon: Beacon) => void;
  removeBeacon: (id: string) => void;
  setSelectedBeacon: (id: string | null) => void;
  addTask: (beaconId: string, task: Task) => void;
  updateTask: (beaconId: string, taskId: string, updates: Partial<Task>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useBeaconStore = create<BeaconState>((set) => ({
  beacons: [],
  selectedBeacon: null,
  tasks: new Map(),
  isLoading: false,
  error: null,
  setBeacons: (beacons) => set({ beacons }),
  addBeacon: (beacon) => set((state) => ({ beacons: [...state.beacons, beacon] })),
  removeBeacon: (id) => set((state) => ({
    beacons: state.beacons.filter(b => b.id !== id),
    selectedBeacon: state.selectedBeacon === id ? null : state.selectedBeacon
  })),
  setSelectedBeacon: (id) => set({ selectedBeacon: id }),
  addTask: (beaconId, task) => set((state) => {
    const newTasks = new Map(state.tasks);
    const beaconTasks = newTasks.get(beaconId) || [];
    newTasks.set(beaconId, [...beaconTasks, task]);
    return { tasks: newTasks };
  }),
  updateTask: (beaconId, taskId, updates) => set((state) => {
    const newTasks = new Map(state.tasks);
    const beaconTasks = newTasks.get(beaconId) || [];
    newTasks.set(beaconId, beaconTasks.map(t => t.id === taskId ? { ...t, ...updates } : t));
    return { tasks: newTasks };
  }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
