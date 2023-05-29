import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from '@components/common/bottomSheep/BottomSheep.module.scss';
import AutoHeightImage from '../AutoHeightImage';

interface BottomSheepProps {
  children: React.ReactNode;
  title?: string;
  subTitle?: string;
  open: boolean;
  onClose: () => void;
}

const BottomSheep = ({
  children,
  title,
  subTitle,
  open,
  onClose,
}: BottomSheepProps) => {
  const [animate, setAnimate] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(open);

  useEffect(() => {
    setVisible(open);

    if (visible && !open) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 200);
    }
    return () => {
      setVisible(false);
    };
  }, [visible, open]);

  if (!animate && !visible) return null;

  return (
    <div
      onClick={onClose}
      className={cn(styles.root, {
        [styles.open]: open,
      })}
    >
      <div className={styles.background} />
      <div className={cn(styles.container)}>
        <div className={styles.header}>
          {title && <h2>{title}</h2>}
          {subTitle && <p>{subTitle}</p>}
          <button type="button" className={styles.closeBtn}>
            <AutoHeightImage
              src="/images/close.png"
              alt="검색"
              width={18}
              height={18}
            />
          </button>
        </div>
        <div className={styles.inner}>{children}</div>
      </div>
    </div>
  );
};

export default BottomSheep;
