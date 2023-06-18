import { getCalendar } from '@utils/calendar';
import React from 'react';
import CalendarHeader from '../calendarHeader';
import styles from './MonthCalendar.module.scss';
import cn from 'classnames';

interface MonthCalendarProps {
  title: string;
}
const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
const MonthCalendar = ({ title }: MonthCalendarProps) => {
  const calendarData = getCalendar('2023', '06');
  return (
    <div className={styles.root}>
      <CalendarHeader title={title} onClickArrowIcon={() => {}} type="prev" />
      <div className={styles.daysOfWeekContainer}>
        {DAYS.map((day) => (
          <span key={day} className={styles.item}>
            {day}
          </span>
        ))}
      </div>
      <div className={styles.daysContainer}>
        {calendarData.map(({ day, date }) => (
          <span
            className={cn(styles.item, {
              [styles.active]: date === '2023-06-21',
              [styles.included]: date !== '2023-06-21',
            })}
            key={date}
          >
            {date.slice(-2)}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MonthCalendar;
