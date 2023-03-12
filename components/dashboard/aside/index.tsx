import React from 'react';
import styles from '@components/dashboard/aside/DashBoardAside.module.scss';
import Calendar from './WeekCalendar';
import InitiativeList from './InitiativeList';
import { useQuery } from '@tanstack/react-query';
import { fetchOkr } from '@api/okr';
import Header from './header';

interface DashboardAsideProps {}

const DashboardAside = (props: DashboardAsideProps) => {
  const { data } = useQuery(['okr'], fetchOkr, {
    suspense: true,
    useErrorBoundary: true,
  });

  return (
    <aside className={styles.root}>
      <Header />

      <div className={styles.card}>
        <Calendar />
        <InitiativeList />
        {data?.map((datum) => (
          <p>{datum.objectiveTitle}</p>
        ))}
      </div>
    </aside>
  );
};

export default DashboardAside;
