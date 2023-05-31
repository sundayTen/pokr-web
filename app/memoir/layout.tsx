import React from 'react';
import { Metadata } from 'next';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default Layout;

export const metadata: Metadata = {
  title: '회고록 | MyOKR',
};
