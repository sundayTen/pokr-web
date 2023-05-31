import OutsideClickDetector from '@components/common/outsideClickDetector';
import Text from '@components/common/text';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import styles from './ChangeGoalModal.module.scss';

interface ChangeGoalModalProps {}

export interface ChangeGoalModalRef {
  open: () => void;
  close: () => void;
}

const ChangeGoalModal = forwardRef<ChangeGoalModalRef, ChangeGoalModalProps>(
  (_props, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    const open = useCallback(() => {
      setIsVisible(true);
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

    if (!isVisible) {
      return <></>;
    }

    return (
      <OutsideClickDetector onOutsideClick={close}>
        <div className={styles.root}>
          <div className={styles.titleContainer}>
            <Text variant="LABEL">달성도를 확인할 목표를 선택해주세요</Text>
          </div>
          <ul>
            <li className={styles.itemContainer}>
              <Text variant="LABEL">전체 목표 달성도 보기</Text>
            </li>
            <li className={styles.itemContainer}>
              <Text variant="LABEL">퇴사하기</Text>
            </li>
            <li className={styles.itemContainer}>
              <Text variant="LABEL">이직하기</Text>
            </li>
            <li className={styles.itemContainer}>
              <Text variant="LABEL">놀러가기</Text>
            </li>
          </ul>
        </div>
      </OutsideClickDetector>
    );
  },
);

ChangeGoalModal.displayName = 'ChangeGoalModal';

export default ChangeGoalModal;
