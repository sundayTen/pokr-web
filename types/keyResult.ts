import { DATE, ID } from './common';
import { INITIATIVE_DETAIL } from './initiative';

export interface KEY_RESULT_DETAIL {
  id: ID;
  objectiveId: ID;
  title: string;
  description: string;
  openDate: DATE;
  dueDate: DATE;
  achievementScore: number;
  createdAt: DATE;
  updatedAt: DATE;
  initiatives: INITIATIVE_DETAIL[];
}

export interface KEY_RESULT_INPUT {
  objectiveId: ID;
  title: string;
  description: string;
  openDate: DATE;
  dueDate: DATE;
}
