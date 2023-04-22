import Image from 'next/image';
import { useEffect } from 'react';
import Button from '@components/common/button';
import styles from '@components/common/modal/Modal.module.scss';

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
  modalContent?: ModalContents | null;
}
const ModalPortal = ({ modalContent = null }: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (modalContent === null) return <></>;

  const {
    title,
    content,
    children,
    cancelButtonLabel,
    confirmButtonLabel,
    cancelButtonPressed,
    confirmButtonPressed,
    close,
  } = modalContent;
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

export default ModalPortal;
