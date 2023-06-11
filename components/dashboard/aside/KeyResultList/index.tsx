import React from 'react';
import styles from './KeyResultList.module.scss';
import Image from 'next/image';

// 특정 날짜의 주요 행동을 보여주는 컴포넌트
const KeyResultList = () => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.labelContainer}>
          <span className={styles.label}>주요 행동</span>
          <span className={styles.label}>11</span>
        </div>

        <button className={styles.labelContainer}>
          <span className={styles.label}>자세히 보기</span>
          <Image
            src={'/images/arrow_right.png'}
            width={16}
            height={16}
            alt="자세히 보기 버튼 아이콘"
          />
        </button>
      </div>
    </div>
  );
};

export default KeyResultList;
