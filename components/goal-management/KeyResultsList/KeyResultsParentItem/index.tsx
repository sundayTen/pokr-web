import React from 'react';
import styles from './KeyResultsParentItem.module.scss';
import KeyResultsListItem from '../KeyResultsListItem';
import LabelsHeader from '../labelHeader';
import CountBall from './CountBall';
import Text from '@components/common/text';
import { YYYYMMDD } from '@utils/date';
import ProgressBar from './ProgressBar';
import ToggleArrow from '@components/common/toggleArrow';
import AddListItemButton from '../addListItemButton';
import { KEY_RESULT_DETAIL } from '@type/keyResult';
import { ID } from '@type/common';

interface KeyResultsParentItemProps {
  keyResultItem: KEY_RESULT_DETAIL;
  isActive: boolean;
  onClick: () => void;
  onClickAddInitiative: (keyResultId: ID) => void;
}

const KeyResultsParentItem = ({
  keyResultItem,
  isActive,
  onClick,
  onClickAddInitiative,
}: KeyResultsParentItemProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.colorBlock} />

      <div className={styles.parent} onClick={onClick}>
        <div className={styles.titleContainer}>
          <ToggleArrow isActive={isActive} />
          <span className={styles.label}>{keyResultItem.title}</span>
          <CountBall count={keyResultItem.initiatives.length} />
        </div>
        <Text variant="BODY" weight="BOLD" style={{ flex: 1 }}>
          {YYYYMMDD(keyResultItem.openDate)}
        </Text>
        <Text variant="BODY" weight="BOLD" style={{ flex: 1 }}>
          {YYYYMMDD(keyResultItem.dueDate)}
        </Text>

        <ProgressBar total={100} current={keyResultItem.achievementScore} />
      </div>

      {isActive && (
        <div className={styles.children}>
          <div className={styles.initiativesContainer}>
            <LabelsHeader type="initiatives" />
            {keyResultItem.initiatives.map((initiative) => (
              <KeyResultsListItem
                initiativeItem={initiative}
                onClick={() => {}}
                key={initiative.id}
              />
            ))}

            <AddListItemButton
              type="initiatives"
              onClick={() => onClickAddInitiative(keyResultItem.id)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default KeyResultsParentItem;
