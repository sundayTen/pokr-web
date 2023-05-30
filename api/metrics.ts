import {
  METRICS as METRICS_TYPE,
  METRICS_OBJECTIVES_DATA,
} from '@type/metrics';
import { fetcher } from './fetcher';
import { METRICS_HALF, METRICS_OBJECTIVES, METRICS_QUARTER } from './path';

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

// fetch metrics objects type data with fetcher module
export const fetchMetricsObjects = async () => {
  try {
    const res = await fetcher<METRICS_OBJECTIVES_DATA[]>({
      path: METRICS_OBJECTIVES,
    });

    return res;
  } catch (error) {
    throw error;
  }
};
