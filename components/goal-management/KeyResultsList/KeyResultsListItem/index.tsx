import CheckboxIcon, { CheckBoxType } from '@components/common/checkBoxIcon';
import Text from '@components/common/text';
import React from 'react';
import styles from './KeyResultsListItem.module.scss';
import cn from 'classnames';
import { YYYYMMDD } from '@utils/date';
import Progress from './Progress';

interface KeyResultsListItem {
  state: CheckBoxType;
  title: string;
  startDate: number;
  endDate: number;
  onClick: () => void;
}

const KeyResultsListItem = ({
  state = 'inactive',
  title,
  endDate,
  startDate,
  onClick,
}: KeyResultsListItem) => {
  return (
    <li className={styles.root} onClick={onClick}>
      <div className={styles.titleContainer}>
        <CheckboxIcon state={state} />
        <label className={cn(styles.title, styles.active)}>{title}</label>
      </div>
      <Text variant="BODY" weight="BOLD" style={{ flex: 1 }}>
        {YYYYMMDD(startDate)}
      </Text>
      <Text variant="BODY" weight="BOLD" style={{ flex: 1 }}>
        {YYYYMMDD(endDate)}
      </Text>

      <Progress total={30} current={23} />
    </li>
  );
};

export default KeyResultsListItem;
