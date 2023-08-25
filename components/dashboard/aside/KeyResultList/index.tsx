import React from 'react';
import styles from './KeyResultList.module.scss';
import Image from 'next/image';
import KeyResultItem from './KeyResultItem';
import { useQuery } from '@tanstack/react-query';
import { OKR } from '@api/path';
import { fetchOkr } from '@api/okr';
import useCreateKeyResultsByPeriod from './useGenerateKeyResultsByPeriod';
import userStore from '@store/user';

interface KeyResultListProps {
  startDate: string;
  endDate: string;
}

// 특정 날짜의 주요 행동을 보여주는 컴포넌트
const KeyResultList = ({ startDate, endDate }: KeyResultListProps) => {
  const { isLogin } = userStore();

  const { data: okrData, isFetching } = useQuery(
    [OKR, startDate, endDate],
    ({ queryKey }) =>
      fetchOkr({
        start_date: queryKey[1],
        end_date: queryKey[2],
      }),
    {
      suspense: true,
      useErrorBoundary: true,
      enabled: startDate.length === 10 && endDate.length === 10 && !!isLogin, // 임시 validation check. 날짜 형식 체크를 해야 함.
    },
  );
  console.log(
    '🚀 ~ file: index.tsx:21 ~ KeyResultList ~ isFetching:',
    isFetching,
  );

  const keyResults = useCreateKeyResultsByPeriod(okrData);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.labelContainer}>
          <span className={styles.label}>주요 행동</span>
          <span className={styles.label}>{keyResults.length}</span>
        </div>

        <button className={styles.labelContainer}>
          <span className={styles.label}>자세히 보기</span>
          <Image
            src={'/images/arrow_right.png'}
            width={16}
            height={16}
            alt="자세히 보기 버튼 아이콘"
          />
        </button>
      </div>

      {keyResults.map((keyResult) => (
        <KeyResultItem key={keyResult.id} keyResultItem={keyResult} />
      ))}
    </div>
  );
};

export default KeyResultList;
