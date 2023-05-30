import React, { useState } from 'react';
import InitiativeList from '../../InitiativeList';
import styles from './KeyResultItem.module.scss';

interface KeyResultItemProps {
  title: string;
}

const KeyResultItem = ({ title }: KeyResultItemProps) => {
  const [isOpened, setIsOpened] = useState(false);

  const onClickItem = () => {
    setIsOpened(!isOpened);
  };

  return (
    <>
      <div className={styles.root} onClick={onClickItem}>
        <div className={styles.code} />
        <h6 className={styles.title}>{title}</h6>
      </div>
      {isOpened && <InitiativeList />}
    </>
  );
};

export default KeyResultItem;
