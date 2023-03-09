import { METRICS as METRICS_TYPE } from '@type/metrics';
import { fetcher } from './fetcher';
import { METRICS_HALF, METRICS_QUARTER } from './path';

export const fetchMetrics = async (
  num: number,
  type: string,
): Promise<METRICS_TYPE[]> => {
  try {
    const res = await fetcher<METRICS_TYPE[]>({
      path: `${type === 'half' ? METRICS_HALF : METRICS_QUARTER}/${num}`,
    });
    return res;
  } catch (error) {
    throw error;
    // 에러 핸들링
  }
};
