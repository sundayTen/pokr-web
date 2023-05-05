import React, { useState } from 'react';
import styles from './KeyResultsList.module.scss';
import LabelsHeader from './labelHeader';
import KeyResultsParentItem from './KeyResultsParentItem';
import AddListItemButton from './addListItemButton';

const KeyResultsList = () => {
  const [activeParent, setActiveParent] = useState<number | null>(null);

  const toggleParent = (index: number) => {
    setActiveParent(activeParent === index ? null : index);
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

        <AddListItemButton type="keyResults" onClick={() => {}} />
      </div>
    </div>
  );
};

export default KeyResultsList;
