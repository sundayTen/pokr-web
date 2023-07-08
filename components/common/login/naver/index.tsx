import React, { useEffect, Dispatch } from 'react';

const NaverLogin = () => {
  const initializeNaverLogin = () => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID, // process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
      callbackUrl: `${process.env.NEXT_PUBLIC_FRONT_URL}/login`, //process.env.NEXT_PUBLIC_APU_URL,
      isPopup: false,
      loginButton: { color: 'white', type: 1, height: 40 },
      callbackHandle: true,
    });

    naverLogin.init();
    naverLogin.logout();
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return <div id="naverIdLogin" />;
};

export default NaverLogin;
