import CheckBox from '@components/common/checkbox';
import Radio from '@components/common/radio';
import Text from '@components/common/text';
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
      <div className={styles.titleContainer}>
        <Radio status="checked" />
        <Text variant="LABEL">부동산 탐방</Text>
      </div>

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
