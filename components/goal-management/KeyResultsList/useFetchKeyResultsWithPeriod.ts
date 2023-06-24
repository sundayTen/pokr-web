import { fetchOkr } from '@api/okr';
import { OKR } from '@api/path';
import goalManagementStore from '@store/goal-management';
import { useQuery } from '@tanstack/react-query';
import { ValueOf } from '@type/common';
import { KEY_RESULT_DETAIL } from '@type/keyResult';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { PERIOD_TYPE } from '../period-tab';

const useFetchKeyResultsWithPeriod = () => {
  const { currentTab, currentObjectiveId } = goalManagementStore();
  const [keyResults, setKeyResults] = useState<KEY_RESULT_DETAIL[]>([]);
  const {
    data: okrData,
    isError,
    isLoading,
  } = useQuery(
    [OKR, ...generatePeriodStartEndDate(currentTab)],
    ({ queryKey }) =>
      fetchOkr({
        start_date: queryKey[1],
        end_date: queryKey[2],
      }),
    {
      suspense: true,
      useErrorBoundary: true,
      enabled: currentTab !== null,
    },
  );

  useEffect(() => {
    if (isError || isLoading || !okrData || currentObjectiveId === null) {
      return;
    }

    const targetKeyResults = okrData.find(
      (okr) => okr.id === currentObjectiveId,
    );

    setKeyResults(targetKeyResults?.keyResults ?? []);
  }, [!!okrData, isError, isLoading, currentObjectiveId]);

  return keyResults;
};

export default useFetchKeyResultsWithPeriod;

export const generatePeriodStartEndDate = (
  tab: ValueOf<typeof PERIOD_TYPE>,
) => {
  const currentDate = dayjs();
  let startDate = null;
  let endDate = null;

  switch (tab) {
    case PERIOD_TYPE.WHOLE:
      startDate = currentDate.startOf('year').format('YYYY-MM-DD');
      endDate = currentDate.endOf('year').format('YYYY-MM-DD');
      break;
    case PERIOD_TYPE['1Q']:
      startDate = currentDate.startOf('year').format('YYYY-MM-DD');
      endDate = currentDate
        .startOf('year')
        .add(2, 'month')
        .endOf('month')
        .format('YYYY-MM-DD');
      break;
    case PERIOD_TYPE['2Q']:
      startDate = currentDate
        .startOf('year')
        .add(3, 'month')
        .format('YYYY-MM-DD');
      endDate = currentDate
        .startOf('year')
        .add(5, 'month')
        .endOf('month')
        .format('YYYY-MM-DD');
      break;
    case PERIOD_TYPE['3Q']:
      startDate = currentDate
        .startOf('year')
        .add(6, 'month')
        .format('YYYY-MM-DD');
      endDate = currentDate
        .startOf('year')
        .add(8, 'month')
        .endOf('month')
        .format('YYYY-MM-DD');
      break;
    case PERIOD_TYPE['4Q']:
      startDate = currentDate
        .startOf('year')
        .add(9, 'month')
        .format('YYYY-MM-DD');
      endDate = currentDate.endOf('year').format('YYYY-MM-DD');
      break;
    default:
      break;
  }
  return [startDate, endDate];
};
