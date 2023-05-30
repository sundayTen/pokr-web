import CheckBox from '@components/common/checkbox';
import { getElapsedTime } from '@utils/date';
import React, { useState } from 'react';
import styles from './InitiativeItem.module.scss';

const DUMMY_DEADLINE = '2021-10-10';

const InitiativeItem = () => {
  const [isChecked, setIsChecked] = useState(false);

  const onClickItem = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.root} onClick={onClickItem}>
      <CheckBox label="이력서 작성하기" isChecked={isChecked} />

      <div className={styles.additionalDataContainer}>
        <span className={styles.deadline}>
          {getElapsedTime(DUMMY_DEADLINE)}
        </span>
        <span className={styles.count}>10 / 12</span>
      </div>
    </div>
  );
};

export default InitiativeItem;
