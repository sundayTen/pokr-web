import React from 'react';
import InitiativeItem from './InitiativeItem';
import styles from './InitiativeList.module.scss';

const InitiativeList = () => {
  return (
    <div className={styles.root}>
      <InitiativeItem />
      <InitiativeItem />
      <InitiativeItem />
    </div>
  );
};

export default InitiativeList;
