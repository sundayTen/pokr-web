import ToggleArrow from '@components/common/toggleArrow';
import CountBall from '@components/goal-management/KeyResultsList/KeyResultsParentItem/CountBall';
import React, { useState } from 'react';
import InitiativeList from '../../InitiativeList';
import styles from './KeyResultItem.module.scss';

interface KeyResultItemProps {
  title: string;
}

const KeyResultItem = ({ title }: KeyResultItemProps) => {
  const [isOpened, setIsOpened] = useState(false);

  const onClickItem = () => {
    setIsOpened(!isOpened);
  };

  return (
    <>
      <div className={styles.root} onClick={onClickItem}>
        <div className={styles.code} />
        <div className={styles.content}>
          <div className={styles.titleContainer}>
            <span className={styles.label}>100평 땅 매입하기</span>
            <CountBall count={6} />
          </div>

          <ToggleArrow isActive={isOpened} />
        </div>
      </div>
      {isOpened && <InitiativeList />}
    </>
  );
};

export default KeyResultItem;
