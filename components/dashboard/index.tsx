'use client';

import React, { useEffect } from 'react';
import DashBoardHeader from './header';

import DashboardAside from './aside';
import DashboardMain from './main';
import { OKR as OKR_TYPE, OKR_OBJECTIVES_TYPE } from '@type/okr';

import AsideLoading from './aside/asideLoading';
import SuspenseComponent from '@components/common/suspenseComponent';
import goalManagementStore from '@store/goal-management';

interface DashBoardProps {
  currentYear: number;
  objectiveList: OKR_OBJECTIVES_TYPE[];
}

const DashBoard = ({ currentYear, objectiveList }: DashBoardProps) => {
  const { changeCurrentYear, changeObjectivesList, changeCurrentObjectiveId } =
    goalManagementStore();

  useEffect(() => {
    changeCurrentYear(currentYear);
    changeObjectivesList(objectiveList);
    changeCurrentObjectiveId(objectiveList[0].id);
  }, []);

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
