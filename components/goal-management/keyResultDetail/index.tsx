import OutsideClickDetector from '@components/common/outsideClickDetector';
import React, { useEffect, useState } from 'react';
import styles from './KeyResultDetail.module.scss';
import KeyResultDetailHeader from './header';
import KeyResultDetailSummary from './summary';
import KeyResultDetailInitiatives from './initiatives';
import { useOverlay } from '@toss/use-overlay';
import DropKeyResultModal from '@components/shared/dropKeyResultModal';
import { ID } from '@type/common';
import { useQueryClient } from '@tanstack/react-query';
import goalManagementStore from '@store/goal-management';
import { OKR } from '@api/path';
import { generatePeriodStartEndDate } from '../KeyResultsList/useFetchKeyResultsWithPeriod';
import CreateInitiative from '@components/shared/createInitiative';
import { KEY_RESULT_DETAIL } from '@type/keyResult';

interface KeyResultDetailProps {
  keyResultId: ID | null;
  close: () => void;
}
const KeyResultDetail = ({
  keyResultId = null,
  close,
}: KeyResultDetailProps) => {
  const { open: openModal } = useOverlay();
  const { currentObjectiveId, currentTab } = goalManagementStore();
  const [isAddInitiativeModal, setIsAddInitiativeModal] = useState(false);
  const [targetKeyResult, setTargetKeyResult] =
    useState<KEY_RESULT_DETAIL | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!keyResultId || !currentObjectiveId || !currentTab) {
      return;
    }
    try {
      const cachedOkr = queryClient.getQueryData([
        OKR,
        ...generatePeriodStartEndDate(currentTab),
      ]);
      if (!Array.isArray(cachedOkr)) {
        return;
      }
      const targetOkr = cachedOkr.find((okr) => okr.id === currentObjectiveId);

      const targetKeyResultData = targetOkr.keyResults.find(
        (keyResult: KEY_RESULT_DETAIL) => keyResult.id === keyResultId,
      );

      if (targetKeyResultData) {
        setTargetKeyResult(targetKeyResultData);
      }
    } catch (error) {}
  }, [currentObjectiveId, currentTab, keyResultId]);

  const dropKeyResult = () => {
    openModal(({ exit }) => {
      return <DropKeyResultModal close={exit} />;
    });
  };

  const onClickAddKeyResult = () => {
    setIsAddInitiativeModal(true);
    openModal(({ exit }) => (
      <CreateInitiative
        close={() => {
          exit();
          setIsAddInitiativeModal(false);
        }}
        keyResultId={keyResultId}
      />
    ));
  };

  const closeAside = () => {
    if (isAddInitiativeModal) {
      return;
    }

    close();
  };

  if (!targetKeyResult) {
    return <></>;
  }

  return (
    <OutsideClickDetector onOutsideClick={closeAside}>
      <aside className={styles.root}>
        <KeyResultDetailHeader
          status={'달성완료'}
          onClickClose={close}
          onClickDrop={dropKeyResult}
          onClickWrite={close}
        />
        <div className={styles.content}>
          <KeyResultDetailSummary data={targetKeyResult} />
          <KeyResultDetailInitiatives
            initiatives={targetKeyResult.initiatives}
            onClickAddInitiative={onClickAddKeyResult}
          />
        </div>
      </aside>
    </OutsideClickDetector>
  );
};

export default KeyResultDetail;
