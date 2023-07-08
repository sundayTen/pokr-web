import { FETCH_OKR_PAYLOAD } from './../types/okr';
import { OKR_TYPE } from '@type/okr';
import { fetcher } from './fetcher';
import { OKR, OKR_YEARS } from './path';

export const fetchOkr = async ({
  start_date,
  end_date,
}: FETCH_OKR_PAYLOAD): Promise<OKR_TYPE[]> => {
  try {
    const res = await fetcher<OKR_TYPE[]>({
      path: `${OKR}?start_date=${start_date}&end_date=${end_date}`,
      config: {
        cache: 'default',
        method: 'GET',
      },
    });
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
