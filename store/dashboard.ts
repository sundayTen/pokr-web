import { create } from 'zustand';

export type GRAPH_DATA = {
  name: string;
  '사용자 평균': number;
  '이용자 평균 달성도': number;
};

interface DashBoardStore {
  graphData: GRAPH_DATA[];
  changeGraphData: (data: GRAPH_DATA[]) => void;
}

const dashBoardStore = create<DashBoardStore>((set) => ({
  graphData: [
    { name: '1월', '사용자 평균': 0, '이용자 평균 달성도': 0 },
    { name: '2월', '사용자 평균': 0, '이용자 평균 달성도': 0 },
    { name: '3월', '사용자 평균': 0, '이용자 평균 달성도': 0 },
    { name: '4월', '사용자 평균': 0, '이용자 평균 달성도': 0 },
    { name: '5월', '사용자 평균': 0, '이용자 평균 달성도': 0 },
    { name: '6월', '사용자 평균': 0, '이용자 평균 달성도': 0 },
  ],
  changeGraphData: (data: GRAPH_DATA[]) => set({ graphData: data }),
}));

export default dashBoardStore;
