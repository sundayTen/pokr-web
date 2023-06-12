import OutsideClickDetector from '@components/common/outsideClickDetector';
import React, {
  forwardRef,
  useCallback,
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

interface KeyResultDetailProps {}
export interface KeyResultDetailRef {
  open: () => void;
  close: () => void;
}

const KeyResultDetail = forwardRef<KeyResultDetailRef, KeyResultDetailProps>(
  (props, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const { open: openModal } = useOverlay();

    const open = useCallback(() => {
      setTimeout(() => {
        setIsVisible(true);
      }, 0);
    }, []);

    const close = useCallback(() => {
      setIsVisible(false);
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        open,
        close,
      }),
      [open, close],
    );

    const dropKeyResult = () => {
      openModal(({ exit }) => {
        return <DropKeyResultModal close={exit} />;
      });
    };

    if (!isVisible) {
      return <></>;
    }

    return (
      <OutsideClickDetector onOutsideClick={close}>
        <aside
          className={cn(styles.root, {
            [styles.show]: isVisible,
            [styles.close]: !isVisible,
          })}
        >
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
  },
);
export default KeyResultDetail;

KeyResultDetail.displayName = 'KeyResultDetail';
