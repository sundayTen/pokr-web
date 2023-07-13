import { updateInitiativeDone } from '@api/initiatives';
import ToggleArrow from '@components/common/toggleArrow';
import CountBall from '@components/goal-management/KeyResultsList/KeyResultsParentItem/CountBall';
import { useMutation } from '@tanstack/react-query';
import { ID } from '@type/common';
import { KEY_RESULT_DETAIL } from '@type/keyResult';
import React, { useState } from 'react';
import InitiativeList from '../../InitiativeList';
import styles from './KeyResultItem.module.scss';

interface KeyResultItemProps {
  keyResultItem: KEY_RESULT_DETAIL;
}

const KeyResultItem = ({ keyResultItem }: KeyResultItemProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const { mutateAsync } = useMutation(updateInitiativeDone, {});

  const onClickItem = () => {
    setIsOpened(!isOpened);
  };

  const onClickInitiative = async (initiativeId: ID) => {
    try {
      await mutateAsync(initiativeId);
    } catch (error) {}
  };

  return (
    <>
      <div className={styles.root} onClick={onClickItem}>
        <div className={styles.code} />
        <div className={styles.content}>
          <div className={styles.titleContainer}>
            <span className={styles.label}>{keyResultItem.title}</span>
            <CountBall count={keyResultItem.initiatives.length} />
          </div>

          <ToggleArrow isActive={isOpened} />
        </div>
      </div>
      {isOpened && keyResultItem.initiatives.length > 0 && (
        <InitiativeList
          initiatives={keyResultItem.initiatives}
          onClickItem={onClickInitiative}
        />
      )}
    </>
  );
};

export default KeyResultItem;
