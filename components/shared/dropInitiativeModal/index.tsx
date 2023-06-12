import Modal from '@components/common/modal';
import React from 'react';

const DropInitiativeModal = () => {
  return (
    <Modal
      title="핵심지표 삭제하기"
      content="주요 행동을 삭제 하시겠습니까?
    삭제한 주요 행동은 복구 할 수 없습니다."
      cancelButtonLabel="취소"
      cancelButtonPressed={() => {}}
      confirmButtonLabel="삭제"
      confirmButtonPressed={() => {}}
    />
  );
};

export default DropInitiativeModal;
