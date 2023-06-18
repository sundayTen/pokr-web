import AutoHeightImage from '@components/common/autoHeightImage';
import React from 'react';
import styles from './CalendarHeader.module.scss';

interface CalendarHeaderProps {
  title: string;
  type: 'prev' | 'next';
  onClickArrowIcon: () => void;
}

const CalendarHeader = ({
  title,
  type,
  onClickArrowIcon,
}: CalendarHeaderProps) => {
  return (
    <div className={styles.root}>
      {type === 'prev' ? (
        <AutoHeightImage
          src="/images/prev-arrow.png"
          alt="이전 월 확인하기 아이콘"
          width={24}
          height={24}
        />
      ) : (
        <div className={styles.void} />
      )}

      <h6 className={styles.title}>{title}</h6>

      {type === 'next' ? (
        <AutoHeightImage
          src="/images/next-arrow.png"
          alt="다음 월 확인하기 아이콘"
          width={24}
          height={24}
        />
      ) : (
        <div className={styles.void} />
      )}
    </div>
  );
};

export default CalendarHeader;
