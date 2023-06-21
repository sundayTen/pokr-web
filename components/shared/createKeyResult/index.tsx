import { createKeyResult } from '@api/keyResult';
import { KEY_RESULT, OBJECTIVES } from '@api/path';
import Input from '@components/common/input';
import Modal from '@components/common/modal';
import PeriodCalendar from '@components/common/periodCalendar';
import Select from '@components/common/select';
import TextArea from '@components/common/textarea';
import useInput from '@hooks/useInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OKR_OBJECTIVES_TYPE } from '@type/okr';
import { Dayjs } from 'dayjs';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './CreateKeyResult.module.scss';

const CreateKeyResult = ({ close }: { close: () => void }) => {
  const { value: keyResult, onChangeInput: onChangeKeyResult } = useInput();
  const { value: count, onChangeInput: onChangeCount } = useInput({
    type: 'number',
  });
  const { value: description, onChangeInput: onChangeDescription } = useInput();
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [objectives, setObjectives] = useState<OKR_OBJECTIVES_TYPE[]>([]);
  const [targetObjective, setTargetObjective] = useState(
    objectives?.[0]?.title,
  );
  const { mutateAsync } = useMutation([KEY_RESULT], createKeyResult);
  const queryClient = useQueryClient();

  useEffect(() => {
    const cachedObjectives = queryClient.getQueryData<OKR_OBJECTIVES_TYPE[]>([
      OBJECTIVES,
    ]);
    if (cachedObjectives) {
      setObjectives(cachedObjectives);
    }
  }, [queryClient]);

  const addKeyResult = async () => {
    if (!keyResult) {
      setError('주요 행동을 입력해주세요.');
      return;
    }

    setError(null);

    if (startDate === null || endDate === null) {
      return;
    }

    const foundObjective = objectives.find(
      (objective) => objective.title === targetObjective,
    );

    if (!foundObjective) {
      return;
    }

    const response = await mutateAsync({
      title: keyResult,
      description,
      openDate: startDate.format('YYYY-MM-DD'),
      dueDate: endDate.format('YYYY-MM-DD'),
      objectiveId: foundObjective.id,
    });

    if (typeof response?.id === 'number') {
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
      confirmButtonPressed={addKeyResult}
    >
      <div className={styles.root}>
        <Select
          value={targetObjective ?? '목표를 입력해주세요'}
          options={objectives.map((objective) => objective.title)}
          onChange={(e) => setTargetObjective(e)}
        />
        <Input
          label="주요 행동"
          placeholder="주요 행동을 입력해주세요"
          value={keyResult}
          onChange={onChangeKeyResult}
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

export default CreateKeyResult;
