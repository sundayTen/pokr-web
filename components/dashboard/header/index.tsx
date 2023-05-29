'use client';
import React, { useState, useEffect } from 'react';
import styles from '@components/dashboard/header/DashBoardHeader.module.scss';
import Image from 'next/image';
import CreateObjective from '@components/shared/createObjective';
import { useOverlay } from '@toss/use-overlay';
import goalManagementStore from '@store/goal-management';

const DashBoardHeader = () => {
  const { currentYear } = goalManagementStore();
  const [leftTimes, setLeftTimes] = useState<string>();
  const deadline = `December, 31, ${new Date().getFullYear()}`;
  const { open } = useOverlay();
  const onClickEdit = () => {
    open(({ isOpen, exit, close }) => {
      return <CreateObjective close={exit} />;
    });
  };

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();

    setLeftTimes(
      `${Math.floor(time / (1000 * 60 * 60 * 24))}일 ${Math.floor(
        (time / (1000 * 60 * 60)) % 24,
      )}시간 ${Math.floor((time / 1000 / 60) % 60)}분 남았어요`,
    );
  };

  useEffect(() => {
    const interval = setInterval(getTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.root}>
      <h2>{currentYear}년은</h2>
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
      <p>{leftTimes}</p>
      <button type="button">+목표 추가하기</button>
    </div>
  );
};

export default DashBoardHeader;
