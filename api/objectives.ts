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
}): Promise<{ id: number }> => {
  try {
    const res: { id: number } = await fetcher({
      path: OBJECTIVES,
      config: {
        method: 'POST',
        body: JSON.stringify({
          title,
          year,
        }),
      },
    });
    return res;
  } catch (error) {
    throw error;
    // 에러 핸들링
  }
};

export const copyObjectives = async (id: number): Promise<{ id: number }> => {
  try {
    const res: { id: number } = await fetcher({
      path: `${OBJECTIVES}/${id}/copy`,
      config: {
        method: 'POST',
      },
    });
    return res;
  } catch (error) {
    throw error;
    // 에러 핸들링
  }
};

export const editObjectives = async ({
  id,
  title,
  year,
  achievement,
}: {
  id: number;
  title: string;
  year: number;
  achievement: boolean;
}) => {
  try {
    const res = await fetcher({
      path: `${OBJECTIVES}/${id}`,
      config: {
        method: 'PATCH',
        body: JSON.stringify({
          title,
          achievement,
          year,
        }),
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
      },
    });
    return res;
  } catch (error) {
    throw error;
    // 에러 핸들링
  }
};
