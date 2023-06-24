import React, { useState } from 'react';
import styles from './PeriodTab.module.scss';
import cn from 'classnames';
import { ValueOf } from '@type/common';
import goalManagementStore from '@store/goal-management';

interface PeriodTabProps {}

const PeriodTab = (props: PeriodTabProps) => {
  const { currentTab, changeCurrentTab } = goalManagementStore();

  const onClickTab = (tab: ValueOf<typeof PERIOD_TYPE>) => {
    changeCurrentTab(tab);
  };

  return (
    <div className={styles.tabs}>
      {PERIODS.map((period) => (
        <div
          key={period}
          className={cn([
            styles.tab,
            {
              [styles.active]: currentTab === period,
            },
          ])}
          onClick={() => onClickTab(period)}
        >
          <span
            className={cn(styles.label, {
              [styles.active]: currentTab === period,
            })}
          >
            {period}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PeriodTab;

export const PERIOD_TYPE = {
  WHOLE: '전체',
  '1Q': '1분기',
  '2Q': '2분기',
  '3Q': '3분기',
  '4Q': '4분기',
} as const;

const PERIODS: ValueOf<typeof PERIOD_TYPE>[] = [
  PERIOD_TYPE.WHOLE,
  PERIOD_TYPE['1Q'],
  PERIOD_TYPE['2Q'],
  PERIOD_TYPE['3Q'],
  PERIOD_TYPE['4Q'],
];
