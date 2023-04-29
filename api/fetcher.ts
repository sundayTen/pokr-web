import userStore from '@store/user';
import { BASE_URL } from './path';

interface FetcherRequest {
  path: string;
  config?: FetchConfig;
}

interface FetchConfig {
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  headers: {
    'Content-Type': string;
    Authorization?: string;
  };
  mode?: 'cors' | 'navigate' | 'no-cors' | 'same-origin';
  cache?:
    | 'default'
    | 'force-cache'
    | 'no-cache'
    | 'no-store'
    | 'only-if-cached'
    | 'reload';
  body?: any;
}

const defaultConfig: FetchConfig = {
  method: 'GET',
  cache: 'default', // SSR 타입에 따라 분기
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * fetchApi 활용을 위한 fetcher 모듈
 * API 요청에 성공하면 response 객체를. 아니면 falsy한 값을 리턴한다.
 * @param {string} path
 * @param {FetcherRequest?} config
 * @returns {Promise<T>}
 */
export const fetcher = async <T>({
  path,
  config,
}: FetcherRequest): Promise<T> => {
  const store = userStore.getState();

  if (store.userToken) {
    defaultConfig.headers.Authorization = `Bearer ${store.userToken}`;
  }

  try {
    const response = await fetch(`${BASE_URL}/${path}`, {
      ...defaultConfig,
      ...config,
    });

    if (response.ok) {
      return await response.json();
    }

    handleError(response.status);
  } catch (error) {
    throw error;
  }
};

const handleError = (status: number) => {
  switch (status) {
    case 401:
      window?.localStorage?.removeItem('accessToken');
      userStore.setState({ userToken: null });
      throw new Error('인증 문제 발생');
    case 404:
      throw new Error('데이터를 찾을 수 없음');
    case 500:
      throw new Error('서버가 응답하지 않음');
    case 503:
      throw new Error('타임아웃');

    default:
      throw new Error('데이터 페칭 실패');
  }
};
