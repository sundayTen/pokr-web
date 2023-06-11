import Text from '@components/common/text';
import AddListItemButton from '@components/goal-management/KeyResultsList/addListItemButton';
import React from 'react';
import InitiativeListItem from './InitiativeListItem';
import styles from './KeyResultDetailInitiatives.module.scss';

interface KeyResultDetailInitiativesProps {}

const KeyResultDetailInitiatives = (props: KeyResultDetailInitiativesProps) => {
  return (
    <div className={styles.root}>
      <Text variant="SUBTITLE" weight="BOLD">
        주요 행동
      </Text>

      {['a', 'b', 'c'].map((d) => (
        <InitiativeListItem key={d} onClick={() => {}} />
      ))}

      <AddListItemButton type="initiatives" onClick={() => {}} />
    </div>
  );
};

export default KeyResultDetailInitiatives;
