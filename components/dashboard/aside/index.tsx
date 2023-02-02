import React from 'react';
import styles from '@components/dashboard/aside/DashBoardAside.module.scss';
import { OKR } from '@types/okr';

interface DashboardAsideProps {
  okr: OKR[];
}

const DashboardAside = ({ okr }: DashboardAsideProps) => {
  return (
    <aside className={styles.root}>
      {okr.map((o) => (
        <p key={o.objectiveId}>{o.objectiveTitle}</p>
      ))}
    </aside>
  );
};

export default DashboardAside;
