import { PERIOD_TYPE } from './../components/goal-management/period-tab/index';
import { ID, ValueOf } from '@type/common';
import { OKR_OBJECTIVES_TYPE } from '@type/okr';
import { create } from 'zustand';
// OKR_OBJECTIVES_TYPE
interface GoalManagementStore {
  currentYear: number | string;
  changeCurrentYear: (data: string | number) => void;
  objectivesList: OKR_OBJECTIVES_TYPE[];
  changeObjectivesList: (data: OKR_OBJECTIVES_TYPE[]) => void;
  currentObjectiveId: ID | null;
  changeCurrentObjectiveId: (targetObjectiveId: ID) => void;
  currentTab: ValueOf<typeof PERIOD_TYPE>;
  changeCurrentTab: (tab: ValueOf<typeof PERIOD_TYPE>) => void;
}

const goalManagementStore = create<GoalManagementStore>((set) => ({
  currentYear: new Date().getFullYear(),
  changeCurrentYear: (data: string | number) => set({ currentYear: data }),
  objectivesList: [],
  changeObjectivesList: (data: OKR_OBJECTIVES_TYPE[]) =>
    set({ objectivesList: data }),
  currentObjectiveId: null,
  changeCurrentObjectiveId: (targetObjectiveId: ID) =>
    set({ currentObjectiveId: targetObjectiveId }),
  currentTab: PERIOD_TYPE.WHOLE,
  changeCurrentTab: (tab: ValueOf<typeof PERIOD_TYPE>) =>
    set({ currentTab: tab }),
}));

export default goalManagementStore;
