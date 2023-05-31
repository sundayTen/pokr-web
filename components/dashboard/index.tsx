'use client';

import React from 'react';
import DashBoardHeader from './header';
import { Metadata } from 'next';

import DashboardAside from './aside';
import DashboardMain from './main';
import { OKR as OKR_TYPE } from '@type/okr';

import AsideLoading from './aside/asideLoading';
import SuspenseComponent from '@components/common/suspenseComponent';

interface DashBoardProps {
  okrData?: OKR_TYPE[];
}

const DashBoard = (props: DashBoardProps) => {
  return (
    <>
      <DashBoardHeader />
      <DashboardMain />

      <SuspenseComponent
        errorMessage="에러가 발생했다"
        loadingComponent={<AsideLoading />}
      >
        <DashboardAside />
      </SuspenseComponent>
    </>
  );
};

export default DashBoard;
