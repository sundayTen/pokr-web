import CheckboxIcon from '@components/common/checkBoxIcon';
import Text from '@components/common/text';
import React from 'react';
import styles from './KeyResultsListItem.module.scss';
import cn from 'classnames';
import { YYYYMMDD } from '@utils/date';
import Progress from './Progress';
import { INITIATIVE_DETAIL } from '@type/initiative';

interface KeyResultsListItem {
  initiativeItem: INITIATIVE_DETAIL;
  onClick: () => void;
}

const KeyResultsListItem = ({
  initiativeItem,
  onClick,
}: KeyResultsListItem) => {
  const { title, openDate, dueDate, currentMetrics, goalMetrics } =
    initiativeItem;
  return (
    <li className={styles.root} onClick={onClick}>
      <div className={styles.titleContainer}>
        <CheckboxIcon
          state={currentMetrics >= goalMetrics ? 'active' : 'inactive'}
        />
        <label className={cn(styles.title, styles.active)}>{title}</label>
      </div>
      <Text variant="BODY" weight="BOLD" style={{ flex: 1 }}>
        {YYYYMMDD(openDate)}
      </Text>
      <Text variant="BODY" weight="BOLD" style={{ flex: 1 }}>
        {YYYYMMDD(dueDate)}
      </Text>

      <Progress total={goalMetrics} current={currentMetrics} />
    </li>
  );
};

export default KeyResultsListItem;
