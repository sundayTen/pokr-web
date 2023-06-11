import { generateWeek, getWeekWithFormat } from '@utils/calendar';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import styles from './Calendar.module.scss';
import CalendarItem from './CalendarItem';

const Calendar = ({
  currentDate,
  changeDate,
}: {
  currentDate: dayjs.Dayjs;
  changeDate: (date: dayjs.Dayjs) => void;
}) => {
  const week = getWeekWithFormat(generateWeek(currentDate));

  return (
    <div className={styles.root}>
      {week.map((day) => (
        <CalendarItem
          date={day.date}
          dayOfTheWeek={day.dayOfTheWeek}
          key={day.date.format('YYYY.MM.DD')}
          onClickItem={changeDate}
          currentDate={currentDate}
        />
      ))}
    </div>
  );
};

export default Calendar;
