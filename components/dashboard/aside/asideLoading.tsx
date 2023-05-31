import React from 'react';
import styles from '@components/dashboard/aside/DashBoardAside.module.scss';

const AsideLoading = () => {
  return (
    <aside className={styles.root}>
      <div className={styles.header}>
        <h1>오늘 할 일을 로딩중이에요</h1>
      </div>

      <div className={styles.card}></div>
    </aside>
  );
};

export default AsideLoading;
