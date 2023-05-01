'use client';
import React from 'react';
import SuspenseComponent from '@components/common/suspenseComponent';
import GoalManagement from '@components/goal-management';

const Page = () => {
  return (
    <SuspenseComponent errorMessage="에러가 발생했다">
      <GoalManagement />
    </SuspenseComponent>
  );
};

export default Page;
