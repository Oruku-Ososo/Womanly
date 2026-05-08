import { create } from 'zustand';

interface WellnessLog {
  date: string;
  mood: string | null;
  symptoms: string[];
}

interface WellnessStore {
  logs: WellnessLog[];
  addLog: (log: WellnessLog) => void;
  getLatestLog: () => WellnessLog | undefined;
}

export const useStore = create<WellnessStore>((set, get) => ({
  logs: [],
  addLog: (log) =>
    set((state) => ({
      logs: [log, ...state.logs.filter((l) => l.date !== log.date)],
    })),
  getLatestLog: () => get().logs[0],
}));
