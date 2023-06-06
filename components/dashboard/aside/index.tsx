import React from 'react';
import styles from '@components/dashboard/aside/DashBoardAside.module.scss';
import Calendar from './WeekCalendar';
import InitiativeList from './KeyResultList';
import Header from './header';

interface DashboardAsideProps {}

const DashboardAside = (props: DashboardAsideProps) => {
  return (
    <aside className={styles.root}>
      <Header />

      <div className={styles.card}>
        <Calendar />

        <InitiativeList />
      </div>
    </aside>
  );
};

export default DashboardAside;
