import Image from 'next/image';
import React from 'react';
import styles from './AddListItemButton.module.scss';
import cn from 'classnames';

interface AddListItemButtonProps {
  type: 'keyResults' | 'initiatives';
  onClick: () => void;
}

const AddListItemButton = ({ type, onClick }: AddListItemButtonProps) => {
  return (
    <div
      className={cn(styles.root, {
        [styles.isInitiative]: type === 'initiatives',
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

const getLabel = (type: 'keyResults' | 'initiatives') => {
  return type === 'keyResults' ? '핵심 지표 추가' : '새로운 주요 행동 추가';
};
