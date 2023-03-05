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
  mode: 'cors' | 'navigate' | 'no-cors' | 'same-origin';
  cache:
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
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6bnVsbCwibmlja25hbWUiOm51bGwsImVtYWlsIjpudWxsLCJleHAiOjE3MDkwMjE5NjN9.BB5PZHeCu3Lp41E1l_I059Z7HmK7rwDh57iVHeRARag',
  },
  mode: 'cors',
};

/**
 * fetchApi 활용을 위한 fetcher 모듈
 * @param {string} path
 * @param {FetcherRequest?} config
 * @returns {Promise<T>}
 */
export const fetcher = async <T>({
  path,
  config,
}: FetcherRequest): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}/${path}`, {
      ...defaultConfig,
      ...config,
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    handleError(error);
    throw error;
  }
};

const handleError = (status) => {
  switch (status) {
    case 401:
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
