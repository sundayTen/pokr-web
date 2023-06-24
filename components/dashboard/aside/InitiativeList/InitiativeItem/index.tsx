import CheckBox from '@components/common/checkbox';
import Radio from '@components/common/radio';
import Text from '@components/common/text';
import { INITIATIVE_DETAIL } from '@type/initiative';
import { getElapsedTime } from '@utils/date';
import React, { useState } from 'react';
import styles from './InitiativeItem.module.scss';

const InitiativeItem = ({ item }: { item: INITIATIVE_DETAIL }) => {
  const { dueDate, title, goalMetrics, currentMetrics } = item;
  const [isChecked, setIsChecked] = useState(false);

  const onClickItem = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.root} onClick={onClickItem}>
      <div className={styles.titleContainer}>
        <Radio status="checked" />
        <Text variant="LABEL">{title}</Text>
      </div>

      <div className={styles.additionalDataContainer}>
        <span className={styles.deadline}>{getElapsedTime(dueDate)}</span>
        <span
          className={styles.count}
        >{`${currentMetrics} / ${goalMetrics}`}</span>
      </div>
    </div>
  );
};

export default InitiativeItem;
