import Text from '@components/common/text';
import TextArea from '@components/common/textarea';
import ProgressBar from '@components/goal-management/KeyResultsList/KeyResultsParentItem/ProgressBar';
import useInput from '@hooks/useInput';
import { KEY_RESULT_DETAIL } from '@type/keyResult';
import { YYYYMMDD } from '@utils/date';
import React from 'react';
import styles from './KeyResultDetailSummary.module.scss';

interface KeyResultDetailSummaryProps {
  data: KEY_RESULT_DETAIL;
}

const KeyResultDetailSummary = ({ data }: KeyResultDetailSummaryProps) => {
  const { value, onChangeInput } = useInput({
    initialValue: data.description ?? undefined,
  });
  return (
    <div className={styles.root}>
      <Text variant="H2" weight="BOLD" style={{ marginBottom: 24 }}>
        {data.title}
      </Text>

      <div className={styles.template}>
        <Text variant="LABEL">시작일</Text>
        <Text variant="LABEL">{YYYYMMDD(data.openDate)}</Text>

        <Text variant="LABEL">마감일</Text>
        <Text variant="LABEL">{YYYYMMDD(data.dueDate)}</Text>

        <Text variant="LABEL">달성도</Text>
        <ProgressBar total={100} current={data.achievementScore} />
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
