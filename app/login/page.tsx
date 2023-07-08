'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useNaverLogin from '@hooks/useNaverLogin';
import userStore from '@store/user';

const Page = () => {
  const router = useRouter();
  const { isLoading, loginSuccess, token } = useNaverLogin();
  const { setIsLogin, changeUserToken } = userStore();

  useEffect(() => {
    if (loginSuccess && token) {
      setIsLogin(true);
      changeUserToken(token);
      router.replace('/dashboard');
    }
  }, [isLoading, loginSuccess]);

  return <div>{isLoading ? <p>...loading</p> : <p>login success</p>}</div>;
};

export default Page;
