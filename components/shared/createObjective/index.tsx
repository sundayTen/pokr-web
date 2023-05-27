import React, { useState } from 'react';
import styles from './CreateObjective.module.scss';
import Input from '@components/common/input';
import useInput from '@hooks/useInput';
import Select from '@components/common/select';
import Modal from '@components/common/Modal';

const YEARS = ['2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];

const CreateObjective = ({ close }: { close: () => void }) => {
  const [targetYear, setTargetYear] = useState(YEARS[0]);
  const { value, onChangeInput } = useInput({
    type: 'string',
    initialValue: '',
  });
  return (
    <Modal
      title="목표 추가하기"
      cancelButtonLabel="취소"
      confirmButtonLabel="확인"
      cancelButtonPressed={close}
      confirmButtonPressed={close}
      close={close}
    >
      <div className={styles.root}>
        <Input
          label="목표명"
          placeholder="이루고 싶은 목표를 입력해주세요"
          value={value}
          onChange={onChangeInput}
        />

        <label className={styles.selectLabel}>목표 연도</label>

        <Select
          value={targetYear}
          options={YEARS}
          onChange={(e) => setTargetYear(e)}
        />
      </div>
    </Modal>
  );
};

export default CreateObjective;
