import { KEY_RESULT_DETAIL } from '@type/keyResult';
import { OKR, OKR_TYPE } from '@type/okr';
import React, { useEffect, useState } from 'react';

const useCreateKeyResultsByPeriod = (okr?: OKR_TYPE[]) => {
  const [keyResultsByOkr, setKeyResultsByOkr] = useState<KEY_RESULT_DETAIL[]>(
    [],
  );
  useEffect(() => {
    if (!okr) {
      return;
    }

    const keyResultsByPeriod = okr
      .map((okrDetail) => okrDetail.keyResults)
      .flat();
    setKeyResultsByOkr(keyResultsByPeriod);
  }, [!!okr]);

  return keyResultsByOkr;
};

export default useCreateKeyResultsByPeriod;
