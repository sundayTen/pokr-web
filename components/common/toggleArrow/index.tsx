import Image from 'next/image';
import styles from './ToggleArrow.module.scss';

const ToggleArrow = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className={styles.toggleArrow}>
      <Image
        src={'/images/down-arrow.png'}
        alt="Toggle arrow"
        layout="fixed"
        width={24}
        height={24}
        className={`${styles.arrowIcon} ${isActive && styles.arrowIconToggled}`}
      />
    </div>
  );
};

export default ToggleArrow;
