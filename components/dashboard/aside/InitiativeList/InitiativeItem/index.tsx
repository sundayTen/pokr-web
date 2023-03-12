import React from 'react';
import styles from './InitiativeItem.module.scss';

interface InitiativeItemProps {
  title: string;
}

const InitiativeItem = ({ title }: InitiativeItemProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.code} />
      <h6 className={styles.title}>{title}</h6>
    </div>
  );
};

export default InitiativeItem;
