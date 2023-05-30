'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import styles from '@components/common/alert/alert.module.scss';
import Button from '../button';

interface ModalProps {
  content: string;
  confirmButtonLabel?: string;
  confirmButtonPressed: () => void;
}
const Alert = ({
  content,
  confirmButtonLabel = '확인',
  confirmButtonPressed,
}: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.backdrop} />
      <div className={styles.container}>
        <div className={styles.contents}>
          <div className={styles.titleContainer}>
            <Image
              onClick={confirmButtonPressed}
              src={'/images/close.png'}
              width={24}
              height={24}
              alt="닫기 버튼"
              className={styles.close}
            />
          </div>
          <p className={styles.text}>{content}</p>
          <div className={styles.buttonGroup}>
            <Button
              buttonStyle="PAINTED"
              size="MEDIUM"
              label={confirmButtonLabel}
              onClick={confirmButtonPressed}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
