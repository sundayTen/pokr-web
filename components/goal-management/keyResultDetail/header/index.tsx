import Text from '@components/common/text';
import Image from 'next/image';
import React from 'react';
import styles from './KeyResultDetailHeader.module.scss';

interface KeyResultDetailHeaderProps {
  onClickClose: () => void;
  onClickWrite: () => void;
  onClickDrop: () => void;
  status: string;
}

const KeyResultDetailHeader = ({
  onClickClose,
  onClickDrop,
  onClickWrite,
  status = '달성완료',
}: KeyResultDetailHeaderProps) => {
  return (
    <div className={styles.root}>
      <button className={styles.statusButton}>
        <Image
          src={'/images/completed_status.png'}
          width={24}
          height={24}
          alt="상태 아이콘"
        />
        <Text variant="LABEL">{status}</Text>
      </button>

      <div className={styles.iconsContainer}>
        <button onClick={onClickWrite}>
          <Image
            src={'/images/edit.png'}
            width={24}
            height={24}
            alt="수정 아이콘"
          />
        </button>
        <button onClick={onClickDrop}>
          <Image
            src={'/images/delete.png'}
            width={24}
            height={24}
            alt="삭제 아이콘"
          />
        </button>
        <button onClick={onClickClose}>
          <Image
            src={'/images/close_gray.png'}
            width={24}
            height={24}
            alt="닫기 아이콘"
          />
        </button>
      </div>
    </div>
  );
};

export default KeyResultDetailHeader;
