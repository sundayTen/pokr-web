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

interface KeyResultDetailProps {}
export interface KeyResultDetailRef {
  open: () => void;
  close: () => void;
}

const KeyResultDetail = forwardRef<KeyResultDetailRef, KeyResultDetailProps>(
  (props, ref) => {
    const [isVisible, setIsVisible] = useState(false);

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

    return (
      <OutsideClickDetector onOutsideClick={close}>
        <aside
          className={cn(styles.root, {
            [styles.show]: isVisible,
            [styles.close]: !isVisible,
          })}
        >
          <KeyResultDetailHeader
            onClickClose={close}
            onClickDrop={close}
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
