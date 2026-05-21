import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface WellnessLog {
  date: string;
  mood: string | null;
  symptoms: string[];
}

interface WellnessStore {
  logs: WellnessLog[];
  userName: string;
  addLog: (log: WellnessLog) => void;
  getLatestLog: () => WellnessLog | undefined;
  setUserName: (name: string) => void;
}

export const useStore = create<WellnessStore>()(
  persist(
    (set, get) => ({
      logs: [],
      userName: 'Beautiful',
      addLog: (log) =>
        set((state) => ({
          logs: [log, ...state.logs.filter((l) => l.date !== log.date)],
        })),
      getLatestLog: () => get().logs[0],
      setUserName: (name) => set({ userName: name }),
    }),
    {
      name: 'wellness-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
