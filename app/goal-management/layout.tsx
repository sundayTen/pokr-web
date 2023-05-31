import React from 'react';
import styles from '@app/goal-management/Layout.module.scss';
import { Metadata } from 'next';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.root}>{children}</div>;
};

export default Layout;

export const metadata: Metadata = {
  title: '목표관리 | MyOKR',
};
