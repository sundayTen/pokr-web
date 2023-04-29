import { create } from 'zustand';

interface GoalManagementStore {
  currentYear: number | string;
  changeCurrentYear: (data: string | number) => void;
}

const goalManagementStore = create<GoalManagementStore>((set) => ({
  currentYear: new Date().getFullYear(),
  changeCurrentYear: (data: string | number) => set({ currentYear: data }),
}));

export default goalManagementStore;
