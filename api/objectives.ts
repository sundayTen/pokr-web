import { fetcher } from './fetcher';
import { OBJECTIVES } from './path';

export const createObjective = async ({
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
