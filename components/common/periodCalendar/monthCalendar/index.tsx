import { getCalendar } from '@utils/calendar';
import React, { Fragment } from 'react';
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
const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

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
          <span key={day} className={styles.item}>
            {day}
          </span>
        ))}
      </div>
      <div className={styles.daysContainer}>
        {calendarData.map(({ day, date }) => (
          <Fragment key={date}>
            <span
              onClick={() => onClickDate(dayjs(date))}
              className={cn(styles.item, {
                [styles.included]:
                  dayjs(date).isAfter(startDate) &&
                  dayjs(date).isBefore(endDate),
                [styles.start]: dayjs(date).isSame(startDate),
                [styles.end]: dayjs(date).isSame(endDate),
              })}
              key={date}
            >
              <p className={styles.activeDate}>{date.slice(-2)}</p>
              {(startDate?.isSame(date) || endDate?.isSame(date)) && (
                <span className={styles.active}>{date.slice(-2)}</span>
              )}
            </span>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default MonthCalendar;
