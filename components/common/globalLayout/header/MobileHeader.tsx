import React from 'react';
import Link from 'next/link';
import AutoHeightImage from '@components/common/autoHeightImage';
import styles from './MobileHeader.module.scss';

const MobileHeader = () => {
  return (
    <header className={styles.root}>
      <Link href="/" className={styles.logoContainer}>
        <AutoHeightImage
          src="/images/logo.png"
          width={24}
          height={24}
          alt="myOKR 로고"
        />
        myOKR
      </Link>
    </header>
  );
};

export default MobileHeader;
