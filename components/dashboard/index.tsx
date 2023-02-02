'use client';

import React from 'react';
import DashBoardHeader from './header';
import DashBoardPeriod from './period';
import styles from '@components/dashboard/header/DashBoardHeader.module.scss';
import DashBoardGraph from './graph';
import { useQuery } from '@tanstack/react-query';
import { fetchOkr } from '@api/okr';
import { OKR } from '@api/path';
import DashboardAside from './aside';

interface DashBoardProps {
  okrData: any;
}

const DashBoard = ({ okrData }: DashBoardProps) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: [OKR],
    queryFn: fetchOkr,
    initialData: okrData,
  });

  if (isError || isLoading) {
    return <></>;
  }

  return (
    <div className={styles.dashBoard}>
      <DashBoardHeader />
      <DashBoardPeriod />
      <DashBoardGraph />
      <DashboardAside okr={data} />
    </div>
  );
};

export default DashBoard;
