import React from 'react';
import styles from './Calendar.module.scss';
import CalendarItem from './CalendarItem';

const dummy = [
  {
    dayOftheWeek: '월',
    day: 1,
  },
  {
    dayOftheWeek: '화',
    day: 3,
  },
  {
    dayOftheWeek: '수',
    day: 5,
  },
  {
    dayOftheWeek: '목',
    day: 7,
  },
  {
    dayOftheWeek: '금',
    day: 9,
  },
  {
    dayOftheWeek: '토',
    day: 11,
  },
  {
    dayOftheWeek: '일',
    day: 32,
  },
];

const Calendar = () => {
  return (
    <div className={styles.root}>
      {dummy.map((d) => (
        <CalendarItem day={d.day} dayOftheWeek={d.dayOftheWeek} key={d.day} />
      ))}
    </div>
  );
};

export default Calendar;
