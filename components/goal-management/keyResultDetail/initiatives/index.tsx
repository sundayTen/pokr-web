import Text from '@components/common/text';
import React from 'react';
import styles from './KeyResultDetailInitiatives.module.scss';

interface KeyResultDetailInitiativesProps {}

const KeyResultDetailInitiatives = (props: KeyResultDetailInitiativesProps) => {
  return (
    <div className={styles.root}>
      <Text variant="SUBTITLE" weight="BOLD">
        주요 행동
      </Text>
    </div>
  );
};

export default KeyResultDetailInitiatives;
