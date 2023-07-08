import { useQuery } from '@tanstack/react-query';
import { fetchOkrYears } from '@api/okr';
import userStore from '@store/user';

const useGetOkrYears = () => {
  const store = userStore.getState();

  return useQuery<number[]>(['OKR_YEARS'], fetchOkrYears, {
    enabled: !!store.isLogin,
  });
};

export default useGetOkrYears;
