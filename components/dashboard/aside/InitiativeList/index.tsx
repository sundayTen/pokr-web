import { ID } from '@type/common';
import { INITIATIVE_DETAIL } from '@type/initiative';
import React from 'react';
import InitiativeItem from './InitiativeItem';
import styles from './InitiativeList.module.scss';

const InitiativeList = ({
  initiatives,
  onClickItem,
}: {
  initiatives: INITIATIVE_DETAIL[];
  onClickItem: (initiativeId: ID) => void;
}) => {
  return (
    <div className={styles.root}>
      {initiatives.map((initiative) => (
        <InitiativeItem
          item={initiative}
          key={initiative.id}
          onClickItem={onClickItem}
        />
      ))}
    </div>
  );
};

export default InitiativeList;
