import Text from '@components/common/text';
import TextArea from '@components/common/textarea';
import ProgressBar from '@components/goal-management/KeyResultsList/KeyResultsParentItem/ProgressBar';
import useInput from '@hooks/useInput';
import React from 'react';
import styles from './KeyResultDetailSummary.module.scss';

interface KeyResultDetailSummaryProps {}

const KeyResultDetailSummary = (props: KeyResultDetailSummaryProps) => {
  const { value, onChangeInput } = useInput();
  return (
    <div className={styles.root}>
      <Text variant="H2" weight="BOLD" style={{ marginBottom: 24 }}>
        부동산 공부
      </Text>

      <div className={styles.template}>
        <Text variant="LABEL">시작일</Text>
        <Text variant="LABEL">2023.2.16</Text>

        <Text variant="LABEL">마감일</Text>
        <Text variant="LABEL">2023.2.16</Text>

        <Text variant="LABEL">달성도</Text>
        <ProgressBar total={20} current={11} />
      </div>

      <div className={styles.textAreaContainer}>
        <TextArea
          label="세부 내용"
          value={value}
          onChange={onChangeInput}
          placeholder="세부 내용을 입력해주세요"
        />
      </div>
    </div>
  );
};

export default KeyResultDetailSummary;
