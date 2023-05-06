import React from 'react';
import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
  total: number;
  current: number;
}

const ProgressBar = ({ total, current }: ProgressBarProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.barContainer}>
        <div
          className={styles.activeContainer}
          style={{
            width: `${calculatePercent(total, current)}%`,
          }}
        />
      </div>
      <span className={styles.label}>{`${calculatePercent(
        total,
        current,
      )}%`}</span>
    </div>
  );
};

export default ProgressBar;

const calculatePercent = (total: number, cur: number) => {
  try {
    return Math.round((cur / total) * 100);
  } catch (error) {
    return 0;
  }
};
