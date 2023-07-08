import { useQuery } from '@tanstack/react-query';
import { OKR_OBJECTIVES_TYPE } from '@type/okr';
import userStore from '@store/user';
import { OBJECTIVES } from '@api/path';
import { getObjectives } from '@api/objectives';

const useGetObjectives = (year: number) => {
  const store = userStore.getState();

  return useQuery<OKR_OBJECTIVES_TYPE[]>(
    [OBJECTIVES],
    () => getObjectives(year),
    {
      enabled: !!store.isLogin,
    },
  );
};

export default useGetObjectives;
