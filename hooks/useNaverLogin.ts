import React, { useState, useCallback, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { fetchLogin } from '@api/login';

const useNaverLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [token, setToken] = useState('');

  const { mutate } = useMutation(fetchLogin, {
    onError: (err) => {
      setIsLoading(false);
      setLoginSuccess(false);
    },
    onSuccess: (res) => {
      if (res) {
        window.localStorage.setItem('accessToken', res.accessToken);
        setToken(res.accessToken);
        setLoginSuccess(true);
      }
      setIsLoading(false);
    },
  });

  // const handleLoadingToggle = (flag: boolean) => {
  //   setIsLoading(flag);
  // };

  const handleNaverLogin = useCallback(async (token: string) => {
    setIsLoading(true);

    try {
      mutate(token);
      // 위 response를 가지고 서비스에 알맞는 로직을 구성해주시면 됩니다
    } catch (error) {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = window?.location?.href?.split('=')[1]?.split('&')[0];
    // 네이버 아이디 로그인이 query에 accesstoken으로 넘겨주는 값을 추출해옵니다.

    if (token) handleNaverLogin(token);
  }, []);

  return {
    loginSuccess,
    token,
    isLoading,
    // onLoadingToggle: handleLoadingToggle,
  };
};

export default useNaverLogin;
