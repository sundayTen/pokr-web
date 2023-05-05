import React, { useState } from 'react';
import styles from './PeriodTab.module.scss';
import cn from 'classnames';

interface PeriodTabProps {}

const PeriodTab = (props: PeriodTabProps) => {
  const [activeTab, setActiveTab] = useState<PERIOD_TYPE>('전체');

  const onClickTab = (tab: PERIOD_TYPE) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.tabs}>
      {PERIODS.map((period) => (
        <div
          key={period}
          className={cn([
            styles.tab,
            activeTab === period ? styles.active : {},
          ])}
          onClick={() => onClickTab(period)}
        >
          {period}
        </div>
      ))}
    </div>
  );
};

export default PeriodTab;

type PERIOD_TYPE = '전체' | '1분기' | '2분기' | '3분기' | '4분기';
const PERIODS: PERIOD_TYPE[] = ['전체', '1분기', '2분기', '3분기', '4분기'];
