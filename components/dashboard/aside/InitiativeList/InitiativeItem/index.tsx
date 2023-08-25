import Radio from '@components/common/radio';
import Text from '@components/common/text';
import { ID } from '@type/common';
import { INITIATIVE_DETAIL } from '@type/initiative';
import { getElapsedTime } from '@utils/date';
import React, { useState } from 'react';
import styles from './InitiativeItem.module.scss';

const InitiativeItem = ({
  item,
  onClickItem,
}: {
  item: INITIATIVE_DETAIL;
  onClickItem: (initiativeId: ID) => void;
}) => {
  const { id, dueDate, title, goalMetrics, currentMetrics } = item;
  const [isChecked, setIsChecked] = useState(false);

  const onClick = () => {
    onClickItem(id);
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.root} onClick={onClick}>
      <div className={styles.titleContainer}>
        <Radio status="checked" />
        <Text variant="BODY">{title}</Text>
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
