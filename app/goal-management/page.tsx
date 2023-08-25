'use client';
import React, { useEffect } from 'react';
import GoalManagement from '@components/goal-management';
import { useRouter } from 'next/navigation';
import userStore from '@store/user';

const Page = () => {
  const { isLogin } = userStore();
  const { replace } = useRouter();

  useEffect(() => {
    if (!isLogin) {
      replace('/');
    }
  }, [isLogin]);
  return <GoalManagement />;
};

export default Page;
