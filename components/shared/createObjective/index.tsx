import React, { useCallback, useState } from 'react';
import styles from './CreateObjective.module.scss';
import useInput from '@hooks/useInput';
import Select from '@components/common/select';
import Input from '@components/common/input';
import { useMutation } from '@tanstack/react-query';
import { createObjectives } from '@api/objectives';
import goalManagementStore from '@store/goal-management';
import dayjs from 'dayjs';
import Modal from '@components/common/modal';

const YEARS = ['2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];

const CreateObjective = ({ close }: { close: () => void }) => {
  const { objectivesList, changeObjectivesList } = goalManagementStore();
  const [targetYear, setTargetYear] = useState(YEARS[0]);
  const [error, setError] = useState<string>('');
  const { value, onChangeInput } = useInput({
    type: 'string',
    initialValue: '',
  });

  const { mutate } = useMutation(createObjectives, {
    onError: (err) => {
      console.log(err, 'createObjectives error!!!');
    },
    onSuccess: (res) => {
      // objectives 목록 스토어 업데이트
      if (res) {
        const item = {
          id: res.id,
          title: value,
          year: Number(targetYear),
          achievement: false,
          keyResultCount: 0,
          initiativeCount: 0,
          createdAt: dayjs().format('YYYY-MM-DD'),
          updatedAt: dayjs().format('YYYY-MM-DD'),
        };
        changeObjectivesList([...objectivesList, item]);
        close();
      }
    },
  });

  const addObjectives = useCallback(() => {
    if (!value) {
      setError('목표명을 입력해주세요.');
    } else if (value.length > 200) {
      setError('목표명은 200자까지 입력 가능합니다.');
    } else {
      setError('');
      mutate({ title: value, year: Number(targetYear) });
    }
  }, [value, error, targetYear]);

  return (
    <Modal
      title="목표 추가하기"
      cancelButtonLabel="취소"
      cancelButtonPressed={close}
      close={close}
      confirmButtonLabel="확인"
      confirmButtonPressed={addObjectives}
    >
      <div className={styles.root}>
        <Input
          label="목표명"
          placeholder="이루고 싶은 목표를 입력해주세요"
          value={value}
          onChange={onChangeInput}
        />
        {error && <p className={styles.errorText}>{error}</p>}

        <div className={styles.selectContainer}>
          <label className={styles.selectLabel}>목표 연도</label>
          <Select
            value={targetYear}
            options={YEARS}
            onChange={(e) => setTargetYear(e)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default CreateObjective;
