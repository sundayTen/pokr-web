import React, { useEffect, Dispatch } from 'react';
import { useMutation } from '@tanstack/react-query';
import { fetchLogin } from '@api/login';
import userStore from '@store/user';

interface NaverLoginProps {
  setUserInfo: Dispatch<React.SetStateAction<boolean>>;
}

const NAVER_CALLBACK_URL = 'http://localhost:3000/dashboard';

const NaverLogin = ({ setUserInfo }: NaverLoginProps) => {
  const { changeUserToken } = userStore();

  const { mutate } = useMutation(fetchLogin, {
    onError: (err) => {
      console.log(err, 'naver error!!!');
    },
    onSuccess: (res) => {
      if (res) {
        window.localStorage.setItem('accessToken', res.accessToken);
        changeUserToken(res.accessToken);
        setUserInfo(true);

        window.opener.location.href = NAVER_CALLBACK_URL;
        window.close();
      }
    },
  });

  const naverLogin = new window.naver.LoginWithNaverId({
    clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
    callbackUrl: NAVER_CALLBACK_URL,
    isPopup: true,
    loginButton: { color: 'white', type: 1, height: 40 },
  });

  const getUser = async () => {
    await naverLogin.logout();
    await naverLogin.getLoginStatus((status: boolean) => {
      if (status) {
        mutate(naverLogin.accessToken.accessToken);
      }
    });
  };

  useEffect(() => {
    naverLogin.init();

    getUser();
  }, []);

  return <div id="naverIdLogin" />;
};

export default NaverLogin;
