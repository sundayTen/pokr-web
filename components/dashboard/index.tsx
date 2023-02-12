'use client';

import React, { Profiler, Suspense } from 'react';
import DashBoardHeader from './header';

import { useQuery } from '@tanstack/react-query';
import { fetchOkr } from '@api/okr';
import { OKR } from '@api/path';
import DashboardAside from './aside';
import DashboardMain from './main';
import { OKR as OKR_TYPE } from '@type/okr';
import ErrorBoundary from '@components/error/ErrorBoundary';

interface DashBoardProps {
  okrData?: OKR_TYPE[];
}

const DashBoard = ({ okrData }: DashBoardProps) => {
  const { data, isError, isLoading } = useQuery([OKR], fetchOkr, {
    suspense: true,
    staleTime: 3000,
    initialData: okrData,
  });

  if (isError || isLoading) {
    return <></>;
  }

  return (
    <>
      <Profiler
        id="Header"
        onRender={(
          id,
          phase,
          actualDuration,
          baseDuration,
          startTime,
          commitTime,
          interactions,
        ) => {}}
      >
        <DashBoardHeader />
      </Profiler>

      <DashboardMain />

      <Suspense fallback={<p>로딩중</p>}>
        <ErrorBoundary>
          <DashboardAside okr={data} />
        </ErrorBoundary>
      </Suspense>
    </>
  );
};

export default DashBoard;
