import React, { useEffect, useState } from 'react';
import { OKR_TYPE } from '@type/okr';
import Select from '@components/common/select';
import styles from './GoalManagementHeader.module.scss';
import goalManagementStore from '@store/goal-management';
import userStore from '@store/user';
import Button from '@components/common/button';
import CreateObjective from '@components/shared/createObjective';
import { useOverlay } from '@toss/use-overlay';
import useGetOkrYears from '@hooks/useGetOkrYears';

const GoalManagementHeader = ({
  objectiveLength,
}: {
  objectiveLength: number;
}) => {
  const { isLogin } = userStore();
  const { currentYear, changeCurrentYear } = goalManagementStore();
  const [years, setYears] = useState<number[]>([]);
  const { open } = useOverlay();

  const { data, isSuccess } = useGetOkrYears();

  useEffect(() => {
    if (isSuccess) {
      setYears(data);
      changeCurrentYear(data?.[0]);
    }
  }, [data]);

  const onClickCreate = () => {
    open(({ exit }) => {
      return <CreateObjective close={exit} />;
    });
  };

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
            목표 <span>{objectiveLength}</span>
          </strong>
        </div>
        <div className={styles.right}>
          <Button
            label="+ 목표 추가하기"
            size="SMALL"
            buttonStyle="PAINTED"
            onClick={onClickCreate}
          />
        </div>
      </section>
    </div>
  );
};

export default GoalManagementHeader;
