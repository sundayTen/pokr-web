import React from 'react';
import styles from './Header.module.scss';
import cn from 'classnames';
import Image from 'next/image';

const Header = () => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1>2023년 1월 1일</h1>
        <div className={styles.buttons}>
          <button className={cn(styles.buttonContainer, styles.todayButton)}>
            오늘
          </button>

          <div className={styles.buttons}>
            <button className={cn(styles.buttonContainer, styles.left)}>
              <Image
                src={'/images/prev-arrow.png'}
                width={24}
                height={24}
                alt="지난 주 보기 아이콘"
              />
            </button>
            <button className={cn(styles.buttonContainer, styles.right)}>
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
