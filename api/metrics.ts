import { METRICS as METRICS_TYPE } from '@type/metrics';

export const fetchMetrics = async (url: string): Promise<METRICS_TYPE[]> => {
  const res = await fetch(`http://127.0.0.1:8080/${url}`, {
    method: 'GET',
    cache: 'default', // SSR 타입에 따라 분기
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6bnVsbCwibmlja25hbWUiOm51bGwsImVtYWlsIjpudWxsLCJleHAiOjE3MDkzNDczMjJ9.KS6rIta6oNT5yCU3HuLMRuMg6wWSCfzXfTDCp7uyAUg',
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
