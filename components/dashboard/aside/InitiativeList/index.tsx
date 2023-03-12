import React from 'react';
import InitiativeItem from './InitiativeItem';
import styles from './InitiativeList.module.scss';

const InitiativeList = () => {
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

      <InitiativeItem title="이직 준비" />
    </div>
  );
};

export default InitiativeList;
