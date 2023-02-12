import React from 'react';
import styles from '@components/dashboard/aside/DashBoardAside.module.scss';
import { OKR } from '@type/okr';
import Calendar from './WeekCalendar';
import InitiativeList from './InitiativeList';

interface DashboardAsideProps {
  okr: OKR[];
}

const DashboardAside = ({ okr }: DashboardAsideProps) => {
  return (
    <aside className={styles.root}>
      <div className={styles.header}>
        <h1>2023년 1월 1일</h1>
      </div>

      <div className={styles.card}>
        <Calendar />
        <InitiativeList />
      </div>
    </aside>
  );
};

export default DashboardAside;
