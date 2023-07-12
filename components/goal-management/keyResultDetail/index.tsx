import OutsideClickDetector from '@components/common/outsideClickDetector';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import cn from 'classnames';
import styles from './KeyResultDetail.module.scss';
import KeyResultDetailHeader from './header';
import KeyResultDetailSummary from './summary';
import KeyResultDetailInitiatives from './initiatives';
import { useOverlay } from '@toss/use-overlay';
import DropKeyResultModal from '@components/shared/dropKeyResultModal';
import { ID } from '@type/common';

interface KeyResultDetailProps {
  keyResultId: ID;
  close: () => void;
}
const KeyResultDetail = ({ keyResultId, close }: KeyResultDetailProps) => {
  const { open: openModal } = useOverlay();

  const dropKeyResult = () => {
    openModal(({ exit }) => {
      return <DropKeyResultModal close={exit} />;
    });
  };

  return (
    <OutsideClickDetector onOutsideClick={close}>
      <aside className={styles.root}>
        <KeyResultDetailHeader
          status={'달성완료'}
          onClickClose={close}
          onClickDrop={dropKeyResult}
          onClickWrite={close}
        />
        <div className={styles.content}>
          <KeyResultDetailSummary />
          <KeyResultDetailInitiatives />
        </div>
      </aside>
    </OutsideClickDetector>
  );
};

export default KeyResultDetail;

KeyResultDetail.displayName = 'KeyResultDetail';
