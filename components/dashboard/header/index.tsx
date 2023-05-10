import React from 'react';
import styles from '@components/dashboard/header/DashBoardHeader.module.scss';
import Image from 'next/image';
// import ModalController from '@components/common/modal/modalController';
import CreateObjective from '@components/shared/createObjective';

const DashBoardHeader = () => {
  const onClickEdit = () => {
    // ModalController.show({
    //   title: '목표 추가하기',
    //   children: <CreateObjective />,
    //   cancelButtonLabel: '취소',
    //   confirmButtonLabel: '확인',
    // });
  };
  return (
    <div className={styles.root}>
      <h2>김아무개의 2023년은</h2>
      <div className={styles.inputContainer}>
        <input type="text" value="올해의 다짐 작성" readOnly />

        <div className={styles.buttonContainer}>
          <button type="button" onClick={onClickEdit}>
            <Image
              src={'/images/edit.png'}
              alt="목표 생성하기 아이콘"
              width={24}
              height={24}
            />
          </button>
          <button type="button">
            <Image
              src={'/images/change-objective.png'}
              alt="목표 생성하기 아이콘"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
      <p>362일 9시간 42분 남음</p>
      <button type="button">+목표 추가하기</button>
    </div>
  );
};

export default DashBoardHeader;
