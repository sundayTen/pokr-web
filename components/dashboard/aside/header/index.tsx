import React, { useState } from 'react';
import styles from './Header.module.scss';
import cn from 'classnames';
import Image from 'next/image';
import dayjs from 'dayjs';

interface AsideHeaderProps {
  currentDate: dayjs.Dayjs;
  onClickToday: () => void;
  onClickPrev: () => void;
  onClickNext: () => void;
}

const Header = ({
  currentDate,
  onClickNext,
  onClickPrev,
  onClickToday,
}: AsideHeaderProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1>{currentDate.format('YYYY년 MM월 DD일')}</h1>
        <div className={styles.buttons}>
          <button
            className={cn(styles.buttonContainer, styles.todayButton)}
            onClick={onClickToday}
          >
            오늘
          </button>

          <div className={styles.buttons}>
            <button
              className={cn(styles.buttonContainer, styles.left)}
              onClick={onClickPrev}
            >
              <Image
                src={'/images/prev-arrow.png'}
                width={24}
                height={24}
                alt="지난 주 보기 아이콘"
              />
            </button>
            <button
              className={cn(styles.buttonContainer, styles.right)}
              onClick={onClickNext}
            >
              <Image
                src={'/images/next-arrow.png'}
                width={24}
                height={24}
                alt="다음 주 보기 아이콘"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
