import { OKR_OBJECTIVES_TYPE } from '@type/okr';
import { fetcher } from './fetcher';
import { OBJECTIVES } from './path';

export const getObjectives = async (
  year: number,
): Promise<OKR_OBJECTIVES_TYPE[]> => {
  try {
    const res = await fetcher<OKR_OBJECTIVES_TYPE[]>({
      path: `${OBJECTIVES}/?year=${year}`,
    });
    return res;
  } catch (error) {
    throw error;
    // 에러 핸들링
  }
};

export const createObjectives = async ({
  title,
  year,
}: {
  title: string;
  year: number;
}) => {
  try {
    const res = await fetcher({
      path: OBJECTIVES,
      config: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          title,
          year,
        },
      },
    });
    return res;
  } catch (error) {
    throw error;
    // 에러 핸들링
  }
};

export const copyObjectives = async (id: number) => {
  try {
    const res = await fetcher({
      path: `${OBJECTIVES}/${id}/copy`,
      config: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    });
    return res;
  } catch (error) {
    throw error;
    // 에러 핸들링
  }
};

export const deleteObjectives = async (id: number) => {
  try {
    const res = await fetcher({
      path: `${OBJECTIVES}/${id}`,
      config: {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    });
    return res;
  } catch (error) {
    throw error;
    // 에러 핸들링
  }
};
