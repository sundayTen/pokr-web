import React from 'react';
import styles from './CalendarItem.module.scss';

interface CalendarItemProps {
  dayOftheWeek: '월' | '화' | '수' | '목' | '금' | '토' | '일';
  day: number;
  today: any;
}

const CalendarItem = ({ dayOftheWeek, day }: CalendarItemProps) => {
  return (
    <div className={styles.root}>
      <h6 className={styles.dayOfWeek}>{dayOftheWeek}</h6>
      <div className={styles.day}>
        <span>{day}</span>
      </div>
      <div className={styles.balls}>
        <div className={styles.ball} />
      </div>
    </div>
  );
};

export default CalendarItem;
