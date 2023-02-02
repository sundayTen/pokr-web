import { HOST, OKR } from './path';

export const fetchOkr = async () => {
  const res = await fetch(`${HOST}${OKR}`, {
    method: 'GET',
    cache: 'default', // SSR 타입에 따라 분기
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6bnVsbCwibmlja25hbWUiOm51bGwsImVtYWlsIjpudWxsLCJleHAiOjE3MDY4ODQ4ODF9.EihO9VK3rte6esD_hOTQfp3be1Qi9UZ0gpjsud1-tgY',
    },
  });

  if (!res.ok) {
    throw new Error('데이터 페칭 실패');
  }

  return res.json();
};
