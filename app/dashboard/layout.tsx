import React from 'react';
import { Metadata } from 'next';
import styles from '@app/dashboard/Layout.module.scss';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.root}>{children}</div>;
};

export default Layout;

export const metadata: Metadata = {
  title: '대시보드 | MyOKR',
};
