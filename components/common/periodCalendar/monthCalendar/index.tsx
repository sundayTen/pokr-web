import { getCalendar } from '@utils/calendar';
import React from 'react';
import CalendarHeader from '../calendarHeader';
import styles from './MonthCalendar.module.scss';
import cn from 'classnames';
import dayjs, { Dayjs } from 'dayjs';

export type MonthCalendarType = 'prev' | 'next';
interface MonthCalendarProps {
  startDate?: Dayjs | null;
  endDate?: Dayjs | null;
  year: number;
  month: number;
  type: MonthCalendarType;
  onChangeMonth: (type: MonthCalendarType) => void;
  onClickDate: (date: Dayjs) => void;
}
const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

const MonthCalendar = ({
  year,
  month,
  startDate,
  endDate,
  type,
  onChangeMonth,
  onClickDate,
}: MonthCalendarProps) => {
  const calendarData = getCalendar(year, month);

  return (
    <div className={styles.root}>
      <CalendarHeader
        title={`${year}년 ${month}월`}
        onClickArrowIcon={() => onChangeMonth(type)}
        type={type}
      />
      <div className={styles.daysOfWeekContainer}>
        {DAYS.map((day) => (
          <div key={day} className={styles.item}>
            <p>{day}</p>
          </div>
        ))}
      </div>

      <div className={styles.daysContainer}>
        {calendarData.map(({ day, date }) => (
          <span
            key={date}
            onClick={() => onClickDate(dayjs(date))}
            className={cn(styles.item, {
              [styles.included]:
                dayjs(date).isAfter(startDate) && dayjs(date).isBefore(endDate),
              [styles.start]: dayjs(date).isSame(startDate) && endDate !== null,
              [styles.end]: dayjs(date).isSame(endDate),
            })}
          >
            <p className={styles.activeDate}>{date.slice(-2)}</p>
            {(startDate?.isSame(date) || endDate?.isSame(date)) && (
              <span className={styles.active}>{date.slice(-2)}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MonthCalendar;
