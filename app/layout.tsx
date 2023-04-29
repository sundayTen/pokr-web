'use client';
import './globals.scss';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalLayout from '@components/common/globalLayout';
import React, { useEffect } from 'react';
import ModalController from '@components/common/modal/modalController';
import { Analytics } from '@vercel/analytics/react';
import userStore from '@store/user';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3000 * 10,
      retry: 3,
      refetchOnReconnect: true,
    },
  },
});

declare global {
  interface Window {
    naver: any;
  }
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { changeUserToken } = userStore();

  useEffect(() => {
    const getStorageToken = window?.localStorage?.getItem('accessToken');

    if (getStorageToken) changeUserToken(getStorageToken);
  }, []);

  return (
    <html lang="kn">
      <body>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <GlobalLayout>{children}</GlobalLayout>
          <ModalController ref={(ref) => ModalController.setRef(ref)} />
          <Analytics />
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default Layout;
