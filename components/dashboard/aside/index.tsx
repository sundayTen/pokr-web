import React, { useState } from 'react';
import styles from '@components/dashboard/aside/DashBoardAside.module.scss';
import Calendar from './WeekCalendar';
import InitiativeList from './KeyResultList';
import Header from './header';
import dayjs from 'dayjs';
import { WEEK_UNIT } from '@utils/calendar';

interface DashboardAsideProps {}

const DashboardAside = (props: DashboardAsideProps) => {
  const [currentDate, setCurrentDate] = useState<dayjs.Dayjs>(dayjs());

  const onClickToday = () => {
    setCurrentDate(dayjs());
  };

  const onClickPrev = () => {
    setCurrentDate(currentDate.add(-WEEK_UNIT, 'day').startOf('week').add(1));
  };
  const onClickNext = () => {
    setCurrentDate(currentDate.add(WEEK_UNIT, 'day').startOf('week').add(1));
  };
  const changeDate = (date: dayjs.Dayjs) => {
    setCurrentDate(date);
  };
  return (
    <aside className={styles.root}>
      <Header
        currentDate={currentDate}
        onClickNext={onClickNext}
        onClickPrev={onClickPrev}
        onClickToday={onClickToday}
      />

      <div className={styles.card}>
        <Calendar currentDate={currentDate} changeDate={changeDate} />

        <InitiativeList />
      </div>
    </aside>
  );
};

export default DashboardAside;
