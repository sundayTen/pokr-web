'use client';
// import { fetchOkr, fetchOkrYears } from '@api/okr';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
// import { OKR_TYPE } from '@type/okr';
import GoalCardList from './goalCard';
import GoalManagementHeader from './header';
import goalManagementStore from '@store/goal-management';
import { getObjectives } from '@api/objectives';
import userStore from '@store/user';
import { OKR_OBJECTIVES_TYPE } from '@type/okr';
import SuspenseComponent from '@components/common/SuspenseComponent';
import PeriodTab from './period-tab';
import KeyResultsList from './KeyResultsList';

const GoalManagement = () => {
  const {
    currentYear,
    changeCurrentYear,
    objectivesList,
    changeObjectivesList,
  } = goalManagementStore();
  const { userToken } = userStore();

  const { data } = useQuery<OKR_OBJECTIVES_TYPE[]>(
    ['objectives'],
    () => getObjectives(Number(currentYear)),
    {
      enabled: !!userToken && !!currentYear,
      suspense: true,
      useErrorBoundary: true,
    },
  );

  useEffect(() => {
    if (data) changeObjectivesList(data);

    return () => {};
  }, [data]);

  return (
    <>
      <SuspenseComponent errorMessage="목표 리스트를 가져오는 중 에러">
        <GoalManagementHeader objectiveLength={objectivesList.length} />
        <GoalCardList cards={objectivesList} />
      </SuspenseComponent>
      <SuspenseComponent>
        <PeriodTab />
      </SuspenseComponent>
      <SuspenseComponent>
        <KeyResultsList />
      </SuspenseComponent>
    </>
  );
};

export default GoalManagement;
