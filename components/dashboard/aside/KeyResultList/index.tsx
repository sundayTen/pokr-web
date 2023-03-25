import React from 'react';
import styles from './KeyResultList.module.scss';
import KeyResultItem from './KeyResultItem';

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
          <span className={styles.label}>{`->`}</span>
        </button>
      </div>

      <KeyResultItem title="이직 준비" />
    </div>
  );
};

export default KeyResultList;
