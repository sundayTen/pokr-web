import goalManagementStore from '@store/goal-management';
import { useQuery } from '@tanstack/react-query';
import { OKR_OBJECTIVES_TYPE } from '@type/okr';
import React, { useEffect, useRef, useState } from 'react';
import GoalCardItem from './goalCardItem';
import styles from './GoalCardList.module.scss';

const GoalCardList = ({ cards }: { cards: OKR_OBJECTIVES_TYPE[] }) => {
  return (
    <div className={styles.root}>
      {cards?.length > 0 && (
        <div className={styles.lists}>
          {cards.map((card: OKR_OBJECTIVES_TYPE) => (
            <GoalCardItem key={card.id} data={card} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GoalCardList;
