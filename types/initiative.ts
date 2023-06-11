import { DATE } from './common';

export interface INITIATIVE_DETAIL {
  id: number;
  keyResultId: number;
  title: string;
  description: string;
  openDate: DATE;
  dueDate: DATE;
  goalMetrics: number;
  currentMetrics: number;
  createdAt: DATE;
  updatedAt: DATE;
}

// initiative 생성이나 수정에 사용되는 객체
export interface INITIATIVE_INPUT {
  title: string;
  description: string;
  openDate: DATE;
  dueDate: DATE;
  goalMetrics: number;
  currentMetrics: number;
}
