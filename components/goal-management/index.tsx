'use client';
import { fetchOkr } from '@api/okr';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { OKR_TYPE } from '@type/okr';
import GoalCardList from './goalCard';
import GoalManagementHeader from './header';
import goalManagementStore from '@store/goal-management';

const GoalManagement = () => {
  const { data } = useQuery(['okr'], fetchOkr, {
    suspense: true,
    useErrorBoundary: true,
  });
  const { currentYear } = goalManagementStore();

  return (
    <>
      <GoalManagementHeader okrData={data} />
      <GoalCardList
        cards={
          data &&
          data.filter((okr: any) => okr.year === Number(currentYear))[0]
            ?.keyResults
        }
      />
    </>
  );
};

export default GoalManagement;
