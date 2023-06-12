import { ID } from './common';

export interface OKR {
  objectiveId: ID;
  objectiveTitle: string;
  keyResults: KEY_RESULT[];
}

export interface KEY_RESULT {
  initiatives: INITIATIVE[];
  keyResultId: ID;
  keyResultTitle: string;
}

export interface INITIATIVE {
  achievement: boolean;
  initiativeId: ID;
  initiativeTitle: string;
}

export interface OKY_KEY_RESULT_TYPE {
  achievementScore: number;
  description: string;
  dueDate: string;
  id: number;
  initiatives: any[];
  openDate: string;
  title: string;
}

export interface OKR_TYPE {
  achievement: boolean;
  id: number;
  keyResults: OKY_KEY_RESULT_TYPE[];
  title: string;
  year: number;
}

export interface OKR_OBJECTIVES_TYPE {
  id: number;
  title: string;
  year: number;
  achievement: boolean;
  keyResultCount: number;
  initiativeCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface FETCH_OKR_PAYLOAD {
  start_date: string;
  end_date: string;
}
