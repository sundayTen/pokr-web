import React, { useEffect, useState, useCallback } from 'react';
import styles from '@components/common/globalLayout/header/Header.module.scss';
import Link from 'next/link';
import Script from 'next/script';
import NaverLogin from '@components/common/login/naver';
import userStore from '@store/user';
import Image from 'next/image';

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
  const { userToken, changeUserToken } = userStore();
  const [userInfo, setUserInfo] = useState(userToken ? true : false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (userToken) setUserInfo(true);
    else setUserInfo(false);
  }, [userToken]);

  const handleLogout = useCallback(() => {
    window?.localStorage?.removeItem('accessToken');

    changeUserToken(null);
    setUserInfo(false);
  }, [userInfo]);

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
          {scriptLoaded && !userInfo && (
            <div className={styles.naverLoginBtn}>
              <NaverLogin setUserInfo={setUserInfo} />
            </div>
          )}
          {userInfo && (
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
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
