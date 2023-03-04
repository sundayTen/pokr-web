import Button from '../button';
import styles from './modal.module.scss';

export interface ModalContents {
  title?: string;
  content?: string;
  children?: JSX.Element | null;
  cancelButtonLabel?: string;
  confirmButtonLabel?: string;
  cancelButtonPressed?: () => void;
  confirmButtonPressed?: () => void;
}

interface ModalProps {
  modalContent?: ModalContents | null;
}
const ModalPortal = ({ modalContent = null }: ModalProps) => {
  if (modalContent === null) return <></>;
  const {
    title,
    content,
    children,
    cancelButtonLabel,
    confirmButtonLabel,
    cancelButtonPressed,
    confirmButtonPressed,
  } = modalContent;
  return (
    <div className={styles.root}>
      <div className={styles.backdrop} />
      <div className={styles.container}>
        <div className={styles.contents}>
          <div className={styles.titleContainer}>
            <span className={styles.title}>{title}</span>
            {/* <CloseIcon onClick={close} /> */}
          </div>
          <div className={styles.mainContainer}>
            {content && <span className={styles.contentFont}>{content}</span>}
            {children}
            <div className={styles.buttonGroup}>
              {cancelButtonLabel && (
                <Button
                  buttonStyle="BLACK"
                  size="MEDIUM"
                  label={cancelButtonLabel}
                  onClick={() => {
                    cancelButtonPressed && cancelButtonPressed();
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
