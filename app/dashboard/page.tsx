import React from 'react';
import DashBoard from '@components/dashboard';
import { fetchOkr } from '@api/okr';

const Page = async () => {
  const data = await fetchOkr();

  return (
    <>
      <DashBoard okrData={data} />
    </>
  );
};

export default Page;
