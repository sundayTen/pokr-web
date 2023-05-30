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

interface KeyResultsParentItemProps {
  isActive: boolean;
  onClick: () => void;
}

const KeyResultsParentItem = ({
  isActive,
  onClick,
}: KeyResultsParentItemProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.colorBlock} />

      <div className={styles.parent} onClick={onClick}>
        <div className={styles.titleContainer}>
          <ToggleArrow isActive={isActive} />
          <span className={styles.label}>100평 땅 매입하기</span>
          <CountBall count={6} />
        </div>
        <Text variant="BODY" weight="BOLD" style={{ flex: 1 }}>
          {YYYYMMDD(Date.now().toString())}
        </Text>
        <Text variant="BODY" weight="BOLD" style={{ flex: 1 }}>
          {YYYYMMDD(Date.now().toString())}
        </Text>

        <ProgressBar total={30} current={11} />
      </div>

      {isActive && (
        <div className={styles.children}>
          <div className={styles.initiativesContainer}>
            <LabelsHeader type="initiatives" />
            <KeyResultsListItem
              title="마감일 7일 이내인 주요 행동"
              state="inactive"
              startDate={Date.now()}
              endDate={Date.now()}
              onClick={() => {}}
            />
            <KeyResultsListItem
              title="마감일 7일 이내인 주요 행동"
              state="inactive"
              startDate={Date.now()}
              endDate={Date.now()}
              onClick={() => {}}
            />

            <AddListItemButton type="initiatives" onClick={() => {}} />
          </div>
        </div>
      )}
    </div>
  );
};

export default KeyResultsParentItem;
