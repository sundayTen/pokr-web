import React, { useState } from 'react';
import styles from '@components/dashboard/aside/DashBoardAside.module.scss';
import Calendar from './WeekCalendar';
import InitiativeList from './KeyResultList';
import Header from './header';
import dayjs from 'dayjs';
import { WEEK_UNIT } from '@utils/calendar';
import SuspenseComponent from '@components/common/suspenseComponent';

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

        <SuspenseComponent errorMessage="주간 할일 목록 가져오기 실패">
          <InitiativeList
            startDate={currentDate.startOf('week').format('YYYY-MM-DD')}
            endDate={currentDate.endOf('week').format('YYYY-MM-DD')}
          />
        </SuspenseComponent>
      </div>
    </aside>
  );
};

export default DashboardAside;
