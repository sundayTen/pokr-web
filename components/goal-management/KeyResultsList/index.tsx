import React, { useState } from 'react';
import styles from './KeyResultsList.module.scss';
import LabelsHeader from './labelHeader';
import KeyResultsParentItem from './KeyResultsParentItem';
import AddListItemButton from './addListItemButton';
import { useOverlay } from '@toss/use-overlay';
import CreateKeyResult from '@components/shared/createKeyResult';

const KeyResultsList = () => {
  const [activeParent, setActiveParent] = useState<number | null>(null);
  const { open } = useOverlay();

  const toggleParent = (index: number) => {
    setActiveParent(activeParent === index ? null : index);
  };

  const onClickAddKeyResult = () => {
    open(({ exit }) => <CreateKeyResult close={exit} />);
  };

  return (
    <div className={styles.accordionContainer}>
      <LabelsHeader type="keyResults" />

      <div className={styles.listContainer}>
        <KeyResultsParentItem
          isActive={activeParent === 0}
          onClick={() => toggleParent(0)}
        />
        <KeyResultsParentItem
          isActive={activeParent === 1}
          onClick={() => toggleParent(1)}
        />

        <AddListItemButton type="keyResults" onClick={onClickAddKeyResult} />
      </div>
    </div>
  );
};

export default KeyResultsList;
