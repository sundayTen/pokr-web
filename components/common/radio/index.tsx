import { ValueOf } from '@type/common';
import Image from 'next/image';
import React from 'react';
import styles from './Radio.module.scss';

export const RADIO_STATUS = {
  CHECKED: 'checked',
  UNCHECKED: 'unchecked',
  DISABLED: 'disabled',
} as const;

interface RadioProps {
  status: ValueOf<typeof RADIO_STATUS>;
}

const Radio = ({ status = RADIO_STATUS.UNCHECKED }: RadioProps) => {
  return (
    <button className={styles.root}>
      <Image
        width={24}
        height={24}
        alt="체크 아이콘"
        src={`/images/checkbox/checkbox_${status}.png`}
      />
    </button>
  );
};

export default Radio;
