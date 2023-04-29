import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div style={{ padding: '90px 0px 0px 90px' }}>{children}</div>;
};

export default Layout;
