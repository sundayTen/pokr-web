import { updateInitiativeDone } from '@api/initiatives';
import Text from '@components/common/text';
import AddListItemButton, {
  ADD_BUTTON_TYPE,
} from '@components/goal-management/KeyResultsList/addListItemButton';
import { useMutation } from '@tanstack/react-query';
import { INITIATIVE_DETAIL } from '@type/initiative';
import dayjs from 'dayjs';
import React from 'react';
import InitiativeListItem from './InitiativeListItem';
import styles from './KeyResultDetailInitiatives.module.scss';

interface KeyResultDetailInitiativesProps {
  initiatives: INITIATIVE_DETAIL[];
  onClickAddInitiative: () => void;
}

const KeyResultDetailInitiatives = ({
  initiatives,
  onClickAddInitiative,
}: KeyResultDetailInitiativesProps) => {
  const { mutateAsync } = useMutation(updateInitiativeDone, {});
  const onClickItem = async (initiativeId: number) => {
    try {
      await mutateAsync(initiativeId);
    } catch (error) {}
  };
  return (
    <div className={styles.root}>
      <Text variant="SUBTITLE" weight="BOLD">
        주요 행동
      </Text>

      {initiatives.map((initiative) => (
        <InitiativeListItem
          title={initiative.title}
          status={getInitiativeStatus(initiative)}
          key={initiative.id}
          onClick={() => onClickItem(initiative.id)}
        />
      ))}

      <AddListItemButton
        type={ADD_BUTTON_TYPE.INITIATIVES}
        onClick={onClickAddInitiative}
      />
    </div>
  );
};

export default KeyResultDetailInitiatives;

export const INITIATIVE_STATUS = {
  DONE: 'done', // 완료
  CLEAR: 'clear', // 오늘 처리 완료
  DISABLED: 'disabled', // 불능
  ONGOING: 'ongoing', // 기본값
} as const;

const getInitiativeStatus = ({
  dueDate,
  currentMetrics,
  goalMetrics,
}: INITIATIVE_DETAIL) => {
  if (dayjs().isAfter(dueDate)) {
    return INITIATIVE_STATUS.DISABLED;
  }
  if (currentMetrics >= goalMetrics) {
    return INITIATIVE_STATUS.DONE;
  }
  if (false) {
    return INITIATIVE_STATUS.CLEAR;
  }
  return INITIATIVE_STATUS.ONGOING;
};
