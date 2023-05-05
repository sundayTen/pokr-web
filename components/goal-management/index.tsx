'use client';
import { fetchOkr, fetchOkrYears } from '@api/okr';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { OKR_TYPE } from '@type/okr';
import GoalCardList from './goalCard';
import GoalManagementHeader from './header';
import goalManagementStore from '@store/goal-management';
import { getObjectives } from '@api/objectives';
import userStore from '@store/user';
import SuspenseComponent from '@components/common/suspenseComponent';
import PeriodTab from './period-tab';

const GoalManagement = () => {
  const { currentYear, changeCurrentYear } = goalManagementStore();
  const { userToken } = userStore();

  return (
    <>
      <SuspenseComponent errorMessage="목표 리스트를 가져오는 중 에러">
        <GoalManagementHeader objectiveLength={0} />
        {
          <GoalCardList
            cards={[
              {
                id: 4,
                title: 'test',
                year: 2023,
                achievement: false,
                keyResultCount: 2,
                initiativeCount: 0,
                createdAt: '2023-04-30T06:17:19',
                updatedAt: '2023-04-30T06:17:19',
              },
            ]}
          />
        }
      </SuspenseComponent>
      <SuspenseComponent>
        <PeriodTab />
      </SuspenseComponent>
    </>
  );
};

export default GoalManagement;
