import React from 'react';
import styles from './InitiativeListItem.module.scss';
import Radio, { RADIO_STATUS } from '@components/common/radio';
import Text from '@components/common/text';
import { ValueOf } from '@type/common';
import { INITIATIVE_STATUS } from '..';

interface InitiativeListItemProps {
  title: string;
  status: ValueOf<typeof INITIATIVE_STATUS>;
  onClick: () => void;
}

const InitiativeListItem = ({
  title,
  status,
  onClick,
}: InitiativeListItemProps) => {
  return (
    <button
      className={styles.root}
      disabled={status === INITIATIVE_STATUS.DISABLED}
      onClick={onClick}
    >
      <Radio
        status={
          status === INITIATIVE_STATUS.DONE
            ? RADIO_STATUS.CHECKED
            : status === INITIATIVE_STATUS.DISABLED
            ? RADIO_STATUS.DISABLED
            : RADIO_STATUS.UNCHECKED
        }
      />
      <Text variant="BODY">{title ?? '?'}</Text>
    </button>
  );
};

export default InitiativeListItem;
