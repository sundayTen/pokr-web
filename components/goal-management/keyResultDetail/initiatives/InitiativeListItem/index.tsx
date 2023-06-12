import React from 'react';
import styles from './InitiativeListItem.module.scss';
import Radio from '@components/common/radio';
import Text from '@components/common/text';

interface InitiativeListItemProps {
  onClick: () => void;
}

const InitiativeListItem = ({ onClick }: InitiativeListItemProps) => {
  return (
    <button className={styles.root} disabled={false}>
      <Radio status="checked" />
      <Text variant="BODY">이력서 작성하기</Text>
    </button>
  );
};

export default InitiativeListItem;
