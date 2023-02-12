import { OKR as OKR_TYPE } from '@type/okr';

export const fetchOkr = async (): Promise<OKR_TYPE[]> => {
  const res = await fetch(`http://127.0.0.1:8080/api/me/okr`, {
    method: 'GET',
    cache: 'default', // SSR 타입에 따라 분기
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6bnVsbCwibmlja25hbWUiOm51bGwsImVtYWlsIjpudWxsLCJleHAiOjE3MDc3MDY5NDl9.a_cgko2jtY8gc5gEQyvffxvGyWwd-fwnOZ94mx3ZX48',
    },
    mode: 'cors',
  });

  if (!res.ok) {
    switch (res.status) {
      case 401:
        throw new Error('인증 문제 발생');

      default:
        throw new Error('데이터 페칭 실패');
    }
  }

  return res.json();
};
