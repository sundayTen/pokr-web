import { OKR_OBJECTIVES_TYPE } from '@type/okr';
import { create } from 'zustand';
// OKR_OBJECTIVES_TYPE
interface GoalManagementStore {
  currentYear: number | string;
  changeCurrentYear: (data: string | number) => void;
  objectivesList: OKR_OBJECTIVES_TYPE[];
  changeObjectivesList: (data: OKR_OBJECTIVES_TYPE[]) => void;
}

const goalManagementStore = create<GoalManagementStore>((set) => ({
  currentYear: new Date().getFullYear(),
  changeCurrentYear: (data: string | number) => set({ currentYear: data }),
  objectivesList: [],
  changeObjectivesList: (data: OKR_OBJECTIVES_TYPE[]) =>
    set({ objectivesList: data }),
}));

export default goalManagementStore;
