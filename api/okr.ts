import { OKR as OKR_TYPE } from '@type/okr';
import { fetcher } from './fetcher';
import { OKR, OKR_YEARS } from './path';

export const fetchOkr = async (): Promise<OKR_TYPE[]> => {
  try {
    const res = await fetcher<OKR_TYPE[]>({ path: OKR });
    return res;
  } catch (error) {
    throw error;
    // 에러 핸들링
  }
};

export const fetchOkrYears = async (): Promise<number[]> => {
  try {
    const res = await fetcher<number[]>({ path: OKR_YEARS });
    return res;
  } catch (error) {
    throw error;
    // 에러 핸들링
  }
};
