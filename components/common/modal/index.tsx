'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import styles from './Modal.module.scss';
import Button from '@components/common/button';

export interface ModalContents {
  title?: string;
  content?: string;
  children?: JSX.Element | null;
  cancelButtonLabel?: string;
  confirmButtonLabel?: string;
  cancelButtonPressed?: () => void;
  confirmButtonPressed?: () => void;
  close?: () => void;
}

interface ModalProps {
  title?: string;
  content?: string;
  children?: JSX.Element | null;
  cancelButtonLabel?: string;
  confirmButtonLabel?: string;
  cancelButtonPressed?: () => void;
  confirmButtonPressed?: () => void;
  close?: () => void;
}
const Modal = ({
  title,
  content,
  children,
  cancelButtonLabel,
  confirmButtonLabel,
  cancelButtonPressed,
  confirmButtonPressed,
  close,
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
            <span className={styles.title}>{title}</span>
            <Image
              onClick={close}
              src={'/images/close.png'}
              width={24}
              height={24}
              alt="닫기 버튼"
              className={styles.close}
            />
          </div>
          <div className={styles.mainContainer}>
            {content && <span className={styles.contentFont}>{content}</span>}
            {children}
            <div className={styles.buttonGroup}>
              {cancelButtonLabel && (
                <Button
                  buttonStyle="BORDER"
                  size="MEDIUM"
                  label={cancelButtonLabel}
                  onClick={() => {
                    cancelButtonPressed && cancelButtonPressed();
                    close && close();
                  }}
                />
              )}
              {confirmButtonLabel && (
                <Button
                  buttonStyle="PAINTED"
                  size="MEDIUM"
                  label={confirmButtonLabel}
                  onClick={() => {
                    confirmButtonPressed && confirmButtonPressed();
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
