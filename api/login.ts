import { fetcher } from './fetcher';
import { NAVER_LOGIN } from './path';

interface Login {
  accessToken: string;
}

export const fetchLogin = async (token: string): Promise<Login> => {
  try {
    const res = await fetcher<Login>({
      path: NAVER_LOGIN,
      config: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken: token,
        }),
      },
    });
    return res;
  } catch (error) {
    throw error;
    // 에러 핸들링
  }
};
