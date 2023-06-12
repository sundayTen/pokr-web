'use client';
// import { fetchOkr, fetchOkrYears } from '@api/okr';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect, useRef } from 'react';
// import { OKR_TYPE } from '@type/okr';
import GoalCardList from './goalCard';
import GoalManagementHeader from './header';
import goalManagementStore from '@store/goal-management';
import { getObjectives } from '@api/objectives';
import userStore from '@store/user';
import { OKR_OBJECTIVES_TYPE } from '@type/okr';
import PeriodTab from './period-tab';
import KeyResultsList from './KeyResultsList';
import SuspenseComponent from '@components/common/suspenseComponent';
import KeyResultDetail, { KeyResultDetailRef } from './keyResultDetail';
import Button from '@components/common/button';

const GoalManagement = () => {
  const detailRef = useRef<KeyResultDetailRef>(null);
  const { currentYear, objectivesList, changeObjectivesList } =
    goalManagementStore();
  const { userToken } = userStore();

  const { data, isSuccess } = useQuery<OKR_OBJECTIVES_TYPE[]>(
    ['objectives'],
    () => getObjectives(Number(currentYear)),
    {
      enabled: !!userToken && !!currentYear,
      suspense: true,
      useErrorBoundary: true,
    },
  );

  useEffect(() => {
    if (data && userToken) changeObjectivesList(data);

    return () => {};
  }, [data]);

  return (
    <div style={{ position: 'relative' }}>
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

      <KeyResultDetail ref={detailRef} />
    </div>
  );
};

export default GoalManagement;
