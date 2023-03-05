import { OKR as OKR_TYPE } from '@type/okr';
import { fetcher } from './fetcher';
import { OKR } from './path';

export const fetchOkr = async (): Promise<OKR_TYPE[]> => {
  try {
    const res = await fetcher<OKR_TYPE[]>({ path: OKR });
    return res;
  } catch (error) {
    throw error;
    // 에러 핸들링
  }
};
