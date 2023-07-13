import Image from 'next/image';
import React from 'react';
import styles from './AddListItemButton.module.scss';
import cn from 'classnames';
import { ValueOf } from '@type/common';

export const ADD_BUTTON_TYPE = {
  KEY_RESULTS: 'keyResults',
  INITIATIVES: 'initiatives',
} as const;

interface AddListItemButtonProps {
  type: ValueOf<typeof ADD_BUTTON_TYPE>;
  onClick: () => void;
}

const AddListItemButton = ({ type, onClick }: AddListItemButtonProps) => {
  return (
    <div
      className={cn(styles.root, {
        [styles.isInitiative]: type === ADD_BUTTON_TYPE.INITIATIVES,
      })}
      onClick={onClick}
    >
      <Image
        src={'/images/add.png'}
        width={24}
        height={24}
        alt={`${getLabel(type)} 아이콘`}
      />
      <label className={styles.label}>{getLabel(type)}</label>
    </div>
  );
};

export default AddListItemButton;

const getLabel = (type: ValueOf<typeof ADD_BUTTON_TYPE>) => {
  return type === ADD_BUTTON_TYPE.KEY_RESULTS
    ? '핵심 지표 추가'
    : '새로운 주요 행동 추가';
};
