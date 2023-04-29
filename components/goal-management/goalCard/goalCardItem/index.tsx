import { OKY_KEY_RESULT_TYPE } from '@type/okr';
import React from 'react';
import styles from './goalCardItem.module.scss';

const GoalCardItem = ({ data }: { data: OKY_KEY_RESULT_TYPE }) => {
  // console.log(data);
  // fetchOkrObjectives

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <span className={styles.tag}>달성중</span>
        <button type="button">write</button>
        <button type="button">more</button>
      </div>
      <h2>{data.title}</h2>
      <p>
        {data.openDate} ~ {data.dueDate}
      </p>
    </div>
  );
};

export default GoalCardItem;
