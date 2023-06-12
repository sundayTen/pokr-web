import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import OutsideClickDetector from '@components/common/outsideClickDetector';
import Text from '@components/common/text';
import styles from './ChangeGoalModal.module.scss';
import goalManagementStore from '@store/goal-management';

interface ChangeGoalModalProps {}

export interface ChangeGoalModalRef {
  open: () => void;
  close: () => void;
}

const ChangeGoalModal = forwardRef<ChangeGoalModalRef, ChangeGoalModalProps>(
  (_props, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const { objectivesList } = goalManagementStore();

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

    const onClickItem = () => {};

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
            {objectivesList.map((objective) => (
              <li
                key={objective.id}
                className={styles.itemContainer}
                onClick={onClickItem}
              >
                <Text variant="LABEL">{objective.title}</Text>
              </li>
            ))}
          </ul>
        </div>
      </OutsideClickDetector>
    );
  },
);

ChangeGoalModal.displayName = 'ChangeGoalModal';

export default ChangeGoalModal;
