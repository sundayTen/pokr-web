'use client';
import React, { useEffect } from 'react';
import DashBoard from '@components/dashboard';
import userStore from '@store/user';
import { useRouter } from 'next/navigation';

const Page = async () => {
  const { isLogin } = userStore();
  const { replace } = useRouter();

  useEffect(() => {
    if (!isLogin) {
      replace('/');
      return;
    }
  }, [isLogin]);

  return <DashBoard />;
};

export default Page;
