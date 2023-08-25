import { useEffect, useState } from 'react';
import { KEY_RESULT_DETAIL } from '@type/keyResult';
import { OKR_TYPE } from '@type/okr';

const useCreateKeyResultsByPeriod = (okr?: OKR_TYPE[], isFetching: boolean) => {
  const [keyResultsByOkr, setKeyResultsByOkr] = useState<KEY_RESULT_DETAIL[]>(
    [],
  );
  useEffect(() => {
    if (!okr || isFetching) {
      return;
    }

    const keyResultsByPeriod = okr
      .map((okrDetail) => okrDetail.keyResults)
      .flat();
    setKeyResultsByOkr(keyResultsByPeriod);
  }, [okr, isFetching]);

  return keyResultsByOkr;
};

export default useCreateKeyResultsByPeriod;
