'use client';
import userStore from '@store/user';
import { useEffect } from 'react';
import styles from './Home.module.scss';
import { useRouter } from 'next/navigation';

const Home = () => {
  const { isLogin } = userStore();
  const { replace } = useRouter();

  useEffect(() => {
    if (isLogin) {
      replace('/dashboard');
      return;
    }
  }, [isLogin]);

  return (
    <div className={styles.root}>
      {isLogin ? <></> : <h1>네이버 로그인으로 MyOKR 시작하기</h1>}
    </div>
  );
};

export default Home;
