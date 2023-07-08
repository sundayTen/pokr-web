'use client';

import React, { useEffect } from 'react';
import DashBoardHeader from './header';
import DashboardAside from './aside';
import DashboardMain from './main';
import AsideLoading from './aside/asideLoading';
import SuspenseComponent from '@components/common/suspenseComponent';
import goalManagementStore from '@store/goal-management';
import userStore from '@store/user';
import useGetOkrYears from '@hooks/useGetOkrYears';
import useGetObjectives from '@hooks/useGetObjectives';

const DashBoard = () => {
  const { isLogin } = userStore();
  const { data: currentYears } = useGetOkrYears();
  const { data: objectiveList, refetch } = useGetObjectives(
    Number(currentYears?.[0]),
  );
  const { changeCurrentYear, changeObjectivesList, changeCurrentObjectiveId } =
    goalManagementStore();

  useEffect(() => {
    if (currentYears && currentYears?.length > 0) {
      changeCurrentYear(currentYears[0]);
      refetch();
    }
    if (objectiveList && objectiveList?.length > 0) {
      changeObjectivesList(objectiveList);
      changeCurrentObjectiveId(objectiveList[0]?.id);
    }
  }, [isLogin, currentYears, objectiveList]);

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
