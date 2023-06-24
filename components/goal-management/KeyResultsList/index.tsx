import React, { useState } from 'react';
import styles from './KeyResultsList.module.scss';
import LabelsHeader from './labelHeader';
import KeyResultsParentItem from './KeyResultsParentItem';
import AddListItemButton from './addListItemButton';
import { useOverlay } from '@toss/use-overlay';
import CreateKeyResult from '@components/shared/createKeyResult';
import useFetchKeyResultsWithPeriod from './useFetchKeyResultsWithPeriod';
import CreateInitiative from '@components/shared/createInitiative';
import { ID } from '@type/common';
import goalManagementStore from '@store/goal-management';

const KeyResultsList = () => {
  const keyResults = useFetchKeyResultsWithPeriod();
  const { currentObjectiveId } = goalManagementStore();
  const { open } = useOverlay();
  const [activeParent, setActiveParent] = useState<number | null>(null);

  const toggleParent = (index: number) => {
    setActiveParent(activeParent === index ? null : index);
  };

  const onClickAddKeyResult = () => {
    open(({ exit }) => (
      <CreateKeyResult close={exit} objectiveId={currentObjectiveId} />
    ));
  };

  const onClickAddInitiative = (keyResultId: ID) => {
    open(({ exit }) => (
      <CreateInitiative close={exit} keyResultId={keyResultId} />
    ));
  };

  return (
    <div className={styles.accordionContainer}>
      <LabelsHeader type="keyResults" />

      <div className={styles.listContainer}>
        {keyResults.map((keyResult, index) => (
          <KeyResultsParentItem
            keyResultItem={keyResult}
            key={keyResult.id}
            isActive={activeParent === index}
            onClick={() => toggleParent(index)}
            onClickAddInitiative={onClickAddInitiative}
          />
        ))}

        <AddListItemButton type="keyResults" onClick={onClickAddKeyResult} />
      </div>
    </div>
  );
};

export default KeyResultsList;
