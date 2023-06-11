import React from 'react';
import styles from './KeyResultDetailHeader.module.scss';

interface KeyResultDetailHeaderProps {
  onClickClose: () => void;
  onClickWrite: () => void;
  onClickDrop: () => void;
}

const KeyResultDetailHeader = ({
  onClickClose,
  onClickDrop,
  onClickWrite,
}: KeyResultDetailHeaderProps) => {
  return (
    <div className={styles.root}>
      <div>달성완료</div>

      <div className={styles.iconsContainer}>아이콘들</div>
    </div>
  );
};

export default KeyResultDetailHeader;
