import Modal from '@components/common/modal';
import React from 'react';

interface DropKeyResultModalProps {
  close: () => void;
}

const DropKeyResultModal = ({ close }: DropKeyResultModalProps) => {
  return (
    <Modal
      title="핵심지표 삭제하기"
      content="핵심 지표를 삭제할 경우 해당 핵심 지표에 포함된 
        모든 주요 행동이 함께 삭제됩니다."
      cancelButtonLabel="취소"
      cancelButtonPressed={close}
      confirmButtonLabel="삭제"
      confirmButtonPressed={() => {}}
      close={close}
    />
  );
};

export default DropKeyResultModal;
