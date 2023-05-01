import React, { useEffect, useState } from 'react';
import { OKR_TYPE } from '@type/okr';
import Button from '@components/common/button';
import Select from '@components/common/select';
import styles from './GoalManagementHeader.module.scss';
import goalManagementStore from '@store/goal-management';
import { useQuery } from '@tanstack/react-query';

import userStore from '@store/user';
import { fetchOkrYears } from '@api/okr';

const GoalManagementHeader = ({
  objectiveLgneth,
}: {
  objectiveLgneth: number;
}) => {
  const { userToken } = userStore();
  const { currentYear, changeCurrentYear } = goalManagementStore();
  const [years, setYears] = useState<number[]>([]);

  const { data } = useQuery(['okr_years'], fetchOkrYears, {
    // enabled: !!userToken,
    suspense: true,
    useErrorBoundary: true,
    onSuccess: (res) => {
      if (res.length > 0) {
        setYears(res);
        changeCurrentYear(res[0]);
      }
    },
  });

  return (
    <div className={styles.root}>
      <section className={styles.header}>
        <div className={styles.left}>
          <Select
            value={String(currentYear)}
            options={years.sort((a: number, b: number) => a - b)}
            onChange={(e) => {
              changeCurrentYear(e);
            }}
          />
          <strong>
            목표 <span>{objectiveLgneth}</span>
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
    </div>
  );
};

export default GoalManagementHeader;
