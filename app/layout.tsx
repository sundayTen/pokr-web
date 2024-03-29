'use client';
import './globals.scss';
import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalLayout from '@components/common/globalLayout';
import { OverlayProvider } from '@toss/use-overlay';

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
  return (
    <html lang="kn">
      <body>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen />
          <OverlayProvider>
            <GlobalLayout>{children}</GlobalLayout>
          </OverlayProvider>
          <Analytics />
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default Layout;
