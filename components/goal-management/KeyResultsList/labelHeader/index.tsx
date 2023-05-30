import React from 'react';
import styles from './LabelsHeader.module.scss';

interface LabelsHeaderProps {
  type: 'keyResults' | 'initiatives';
}

const LabelsHeader = ({ type = 'keyResults' }: LabelsHeaderProps) => {
  return (
    <div
      className={styles.root}
      style={{
        paddingLeft: type === 'keyResults' ? 50 : 50,
      }}
    >
      <span className={styles.indexLabel}>
        {type === 'keyResults' ? '핵심 지표' : '주요 행동'}
      </span>
      <span className={styles.startDateLabel}>시작일</span>
      <span className={styles.endDateLabel}>마감일</span>
      <span className={styles.achievementLabel}>달성도</span>
    </div>
  );
};

export default LabelsHeader;
