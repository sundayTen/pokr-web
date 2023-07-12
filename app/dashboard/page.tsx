import React from 'react';
import DashBoard from '@components/dashboard';
import { fetchOkrYears } from '@api/okr';
import { getObjectives } from '@api/objectives';

const Page = async () => {
  const years = await fetchOkrYears();
  const objectiveList = await getObjectives(years?.[0]);

  return <DashBoard />;
};

export default Page;
