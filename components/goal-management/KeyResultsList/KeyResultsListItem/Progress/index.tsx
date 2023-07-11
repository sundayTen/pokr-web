import Image from 'next/image';
import React from 'react';
import PieProgress from './PieChart';
import styles from './Progress.module.scss';

interface ProgressProps {
  total: number;
  current: number;
}

const Progress = ({ total, current }: ProgressProps) => {
  return (
    <div className={styles.root}>
      {current < total ? (
        <PieProgress ratio={current / total} />
      ) : (
        <Image
          src={'/images/complete.png'}
          width={24}
          height={24}
          alt="완료 아이콘"
        />
      )}

      <div className={styles.labelContainer}>
        <label className={styles.currentLabel}>{current}</label>
        <label className={styles.totalLabel}>{`/${total}`}</label>
      </div>
    </div>
  );
};
export default Progress;
