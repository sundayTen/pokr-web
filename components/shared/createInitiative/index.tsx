import { createInitiative } from '@api/initiatives';
import { INITIATIVE, OKR } from '@api/path';
import Input from '@components/common/input';
import Modal from '@components/common/modal';
import PeriodCalendar from '@components/common/periodCalendar';
import Select from '@components/common/select';
import TextArea from '@components/common/textarea';
import useFetchKeyResultsWithPeriod, {
  generatePeriodStartEndDate,
} from '@components/goal-management/KeyResultsList/useFetchKeyResultsWithPeriod';
import useInput from '@hooks/useInput';
import goalManagementStore from '@store/goal-management';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ID } from '@type/common';
import { Dayjs } from 'dayjs';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './CreateInitiative.module.scss';

interface CreateInitiativeProps {
  close: () => void;
  keyResultId: ID;
}

const CreateInitiative = ({ close, keyResultId }: CreateInitiativeProps) => {
  const queryClient = useQueryClient();
  const { currentTab } = goalManagementStore();
  const { value: initiative, onChangeInput: onChangeInitiative } = useInput();
  const { value: count, onChangeInput: onChangeCount } = useInput({
    type: 'number',
  });
  const { value: description, onChangeInput: onChangeDescription } = useInput();
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const keyResults = useFetchKeyResultsWithPeriod();
  const [targetKeyResult, setTargetKeyResult] = useState<string | null>(null);
  const { mutateAsync } = useMutation(
    [INITIATIVE, keyResultId],
    createInitiative,
  );

  useEffect(() => {
    if (keyResults.length === 0 || !keyResultId) {
      return;
    }
    const target = keyResults?.find(
      (keyResult) => keyResult.id === keyResultId,
    );

    if (target) {
      setTargetKeyResult(target.title);
    }
  }, [keyResults.length, keyResultId]);

  const addInitiative = async () => {
    if (!initiative) {
      setError('주요 행동을 입력해주세요.');
      return;
    }

    setError(null);

    if (startDate === null || endDate === null) {
      return;
    }

    const target = keyResults.find(
      (keyResult) => keyResult.title === targetKeyResult,
    );

    if (!target) {
      return;
    }

    const response = await mutateAsync({
      keyResultId: target.id,
      title: initiative,
      description,
      openDate: startDate.format('YYYY-MM-DD'),
      dueDate: endDate.format('YYYY-MM-DD'),
      goalMetrics: Number(count),
    });

    if (typeof response?.id === 'number') {
      queryClient.invalidateQueries([
        OKR,
        ...generatePeriodStartEndDate(currentTab),
      ]);
      close();
    }
  };

  const onClickPeriod = () => {
    setCalendarVisible((p) => !p);
  };

  const resetDates = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <Modal
      title="주요행동 추가하기"
      cancelButtonLabel="취소"
      cancelButtonPressed={close}
      close={close}
      confirmButtonLabel="확인"
      confirmButtonPressed={addInitiative}
    >
      <div className={styles.root}>
        <Select
          value={targetKeyResult ?? '목표를 입력해주세요'}
          options={keyResults.map((keyResult) => keyResult.title)}
          onChange={(e) => setTargetKeyResult(e)}
        />
        <Input
          label="주요 행동"
          placeholder="주요 행동을 입력해주세요"
          value={initiative}
          onChange={onChangeInitiative}
        />
        {error && <p className={styles.errorText}>{error}</p>}

        <div className={styles.dateAndCountContainer}>
          <div className={styles.datesContainer}>
            <label>기간</label>
            <div className={styles.dates}>
              <button className={styles.date} onClick={onClickPeriod}>
                {startDate?.format('YYYY.MM.DD') ?? '시작일'}
                <Image
                  src={'/images/calendar.png'}
                  alt="캘린더 아이콘"
                  width={24}
                  height={24}
                />
              </button>
              <span>~</span>
              <button className={styles.date} onClick={onClickPeriod}>
                {endDate?.format('YYYY.MM.DD') ?? '종료일'}
                <Image
                  src={'/images/calendar.png'}
                  alt="캘린더 아이콘"
                  width={24}
                  height={24}
                />
              </button>
            </div>

            {calendarVisible && (
              <PeriodCalendar
                startDate={startDate}
                setEndDate={setEndDate}
                setStartDate={setStartDate}
                endDate={endDate}
                closeCalendar={onClickPeriod}
                resetDates={resetDates}
              />
            )}
          </div>
          <Input
            value={count}
            onChange={onChangeCount}
            placeholder="10"
            label="횟수"
            postfix="회"
          />
        </div>

        <TextArea
          label="세부 내용"
          value={description}
          onChange={onChangeDescription}
          placeholder="핵심 지표에 대한 설명을 입력해주세요"
        />
      </div>
    </Modal>
  );
};

export default CreateInitiative;
