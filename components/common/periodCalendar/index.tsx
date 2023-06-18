import React, { useEffect, useState } from 'react';
import styles from './PeriodCalendar.module.scss';
import MonthCalendar from './monthCalendar';

const PeriodCalendar = ({ current }) => {
  return (
    <div className={styles.root}>
      <MonthCalendar title="2023년 5월" />
      <div className={styles.divider} />
      <MonthCalendar title="2023년 6월" />
    </div>
  );
};

export default PeriodCalendar;
