import React, { useEffect, useState } from 'react';
import { OKR_TYPE } from '@type/okr';
import Button from '@components/common/button';
import Select from '@components/common/select';
import styles from './GoalManagementHeader.module.scss';
import goalManagementStore from '@store/goal-management';

const GoalManagementHeader = ({ okrData }: { okrData: any }) => {
  const [years, setYears] = useState<number[]>([]);
  const [totalKeyResult, setTotalKeyResult] = useState<number>(0);
  const { currentYear, changeCurrentYear } = goalManagementStore();

  // console.log(okrData);

  useEffect(() => {
    if (okrData.length > 0) {
      const getYears = okrData.reduce((acc: string[], cur: OKR_TYPE) => {
        return [...acc, String(cur.year)];
      }, []);

      setYears(getYears);
      changeCurrentYear(getYears[0]);
      setTotalKeyResult(okrData[0].keyResults.length);
    }

    return () => {};
  }, []);

  return (
    <div className={styles.root}>
      <section className={styles.header}>
        <div className={styles.left}>
          <Select
            value={String(currentYear)}
            options={years.sort((a: number, b: number) => a - b)}
            onChange={(e) => {
              changeCurrentYear(e);
              setTotalKeyResult(
                okrData.filter((okr: OKR_TYPE) => okr.year === Number(e))[0]
                  ?.keyResults?.length,
              );
            }}
          />
          <strong>
            목표 <span>{totalKeyResult}</span>
          </strong>
        </div>
        <div className={styles.right}>
          <Button
            label="+ 목표 추가하기"
            size="SMALL"
            buttonStyle="PAINTED"
            onClick={() => console.log('d')}
          />
        </div>
      </section>
      {/* <section className={styles.goalCardList}>
        <GoalCardList
          cards={
            okrData.filter((okr: OKR_TYPE) => okr.year === Number(e))[0]
              ?.keyResults
          }
        />
      </section> */}
    </div>
  );
};

export default GoalManagementHeader;
