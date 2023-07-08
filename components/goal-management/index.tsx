'use client';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect, useRef } from 'react';
import GoalCardList from './goalCard';
import GoalManagementHeader from './header';
import goalManagementStore from '@store/goal-management';
import userStore from '@store/user';
import PeriodTab from './period-tab';
import KeyResultsList from './KeyResultsList';
import SuspenseComponent from '@components/common/suspenseComponent';
import KeyResultDetail, { KeyResultDetailRef } from './keyResultDetail';
import useGetObjectives from '@hooks/useGetObjectives';
import { useRouter } from 'next/navigation';

const GoalManagement = () => {
  const detailRef = useRef<KeyResultDetailRef>(null);
  const {
    currentYear,
    objectivesList,
    changeObjectivesList,
    changeCurrentObjectiveId,
  } = goalManagementStore();
  const { isLogin } = userStore();
  const { replace } = useRouter();

  const { data, refetch } = useGetObjectives(Number(currentYear));

  useEffect(() => {
    if (!isLogin) {
      replace('/');
    }
    if (isLogin && currentYear) refetch();

    if (data) {
      changeObjectivesList(data);

      if (data.length > 0) {
        changeCurrentObjectiveId(data[0].id);
      }
    }
  }, [data, isLogin, currentYear]);

  return (
    <div style={{ position: 'relative' }}>
      <SuspenseComponent errorMessage="목표 리스트를 가져오는 중 에러">
        <GoalManagementHeader objectiveLength={objectivesList.length} />
        <GoalCardList cards={objectivesList} />
      </SuspenseComponent>

      <PeriodTab />

      <SuspenseComponent>
        <KeyResultsList />
      </SuspenseComponent>
      <KeyResultDetail ref={detailRef} />
    </div>
  );
};

export default GoalManagement;
