import { OKR } from './path';
import { OKR as OKR_TYPE } from '@type/okr';

export const fetchOkr = async (): Promise<OKR_TYPE[]> => {
  const res = await fetch(`http://localhost:8080/api/me/okr`, {
    method: 'GET',
    cache: 'default', // SSR 타입에 따라 분기
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6bnVsbCwibmlja25hbWUiOm51bGwsImVtYWlsIjpudWxsLCJleHAiOjE3MDc2NTc2MzR9.IwVInJz4VzRvnzeJ_BJr3szzSfok3M2sNI58ZAPJIZY',
    },
    mode: 'no-cors',
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
