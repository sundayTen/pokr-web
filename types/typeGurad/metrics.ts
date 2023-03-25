import { METRICS, METRICS_OBJECTIVES_DATA } from '@type/metrics';

//typeGuards for METRICS Type
export const isMetrics = (data: unknown): data is METRICS => {
  return !!data;
};

//typeGuards for METRICS_OBJECTIVES_DATA
export const isMetricsObjectivesData = (
  data: unknown,
): data is METRICS_OBJECTIVES_DATA => {
  return (
    !!data && typeof (data as METRICS_OBJECTIVES_DATA).objectiveId === 'number'
  );
};
