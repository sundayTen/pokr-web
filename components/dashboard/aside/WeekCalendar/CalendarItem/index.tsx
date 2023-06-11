import { WEEK_KR } from '@utils/calendar';
import dayjs from 'dayjs';
import React from 'react';
import styles from './CalendarItem.module.scss';
import cn from 'classnames';

interface CalendarItemProps {
  date: dayjs.Dayjs;
  currentDate: dayjs.Dayjs;
  onClickItem: (date: dayjs.Dayjs) => void;
}

const CalendarItem = ({
  date,
  currentDate,
  onClickItem,
}: CalendarItemProps) => {
  const isToday = date.isSame(dayjs(), 'date');
  const isAfterToday = date.isAfter(dayjs(), 'date');
  const isCurrentDate = date.isSame(dayjs(currentDate), 'date');

  return (
    <div className={styles.root} onClick={() => onClickItem(date)}>
      <h6 className={styles.dayOfWeek}>{WEEK_KR[date.format('dddd')]}</h6>
      <div
        className={cn(styles.day, {
          [styles.today]: isToday,
          [styles.isCurrentDate]: isCurrentDate,
        })}
      >
        <span
          className={cn(styles.dayText, {
            [styles.todayFont]: isToday,
            [styles.afterDateFont]: isAfterToday,
          })}
        >
          {date.format('D')}
        </span>
      </div>
      <div className={styles.balls}>
        <div className={styles.ball} />
      </div>
    </div>
  );
};

export default CalendarItem;
