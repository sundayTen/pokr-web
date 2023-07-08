import React, { useEffect, useState, useCallback } from 'react';
import styles from '@components/common/globalLayout/header/Header.module.scss';
import Link from 'next/link';
import Script from 'next/script';
import NaverLogin from '@components/common/login/naver';
import userStore from '@store/user';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export interface NaverUserProps {
  age?: any;
  birthday?: any;
  email: string;
  gender?: any;
  id: string;
  name: string;
  nickname: any;
  profile_image: string;
}

const Header = () => {
  const router = useRouter();
  const { userToken, changeUserToken, isLogin, setIsLogin } = userStore();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const getStorageToken = localStorage.getItem('accessToken');

    if (getStorageToken || isLogin) {
      if (getStorageToken) changeUserToken(getStorageToken);
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [userToken, isLogin]);

  const handleLogout = useCallback(() => {
    window?.localStorage?.removeItem('accessToken');

    changeUserToken(null);
    setIsLogin(false);
    router.push('/');
  }, [userToken]);

  return (
    <>
      <Script
        src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js"
        defer
        onLoad={() => setScriptLoaded(true)}
      />
      <header className={styles.root}>
        <Link href="/" className={styles.logoContainer}>
          <Image
            src="/images/logo.png"
            width={24}
            height={24}
            alt="myOKR 로고"
          />
          myOKR
        </Link>
        <div className={styles.user}>
          {isLogin ? (
            <>
              <div className={styles.profile} />
              <button
                type="button"
                className={styles.logoutBtn}
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>
          ) : (
            <div className={styles.naverLoginBtn}>
              {scriptLoaded && <NaverLogin />}
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
