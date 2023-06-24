import { ID } from '@type/common';
import { INITIATIVE_DETAIL, INITIATIVE_INPUT } from '@type/initiative';
import { fetcher, HTTP_METHOD_TYPE } from './fetcher';
import { INITIATIVE } from './path';

/**
 * id로 initiative 데이터를 호출합니다.
 * @param { ID } initiativeId
 * @returns
 */
export const fetchInitiative = async (
  initiativeId: ID,
): Promise<INITIATIVE_DETAIL> => {
  try {
    const res = await fetcher<INITIATIVE_DETAIL>({
      path: `${INITIATIVE}/${initiativeId}`,
    });
    return res;
  } catch (error) {
    throw error;
    // 에러 핸들링
  }
};

/**
 * initiative를 생성합니다.
 * @param {INITIATIVE_INPUT} payload
 */
export const createInitiative = async (payload: INITIATIVE_INPUT) => {
  try {
    const res = await fetcher({
      path: `${INITIATIVE}`,
      config: {
        method: HTTP_METHOD_TYPE.POST,
        body: JSON.stringify(payload),
      },
    });
    return res;
  } catch (error) {
    throw error;
    // 에러 핸들링
  }
};
/**
 * 특정 initiative를 수정합니다.
 * @param {ID} initiativeId
 * @param {INITIATIVE_INPUT} payload
 * @returns
 */
export const updateInitiative = async (
  initiativeId: ID,
  payload: INITIATIVE_INPUT,
) => {
  try {
    const res = await fetcher({
      path: `${INITIATIVE}/${initiativeId}`,
      config: {
        method: HTTP_METHOD_TYPE.PATCH,
        body: payload,
      },
    });
    return res;
  } catch (error) {
    throw error;
    // 에러 핸들링
  }
};
/**
 * 특정 initiative를 삭제합니다.
 * @param {ID} initiativeId
 * @returns
 */
export const deleteInitiative = async (initiativeId: ID) => {
  try {
    const res = await fetcher({
      path: `${INITIATIVE}/${initiativeId}`,
      config: {
        method: HTTP_METHOD_TYPE.DELETE,
      },
    });
    return res;
  } catch (error) {
    throw error;
    // 에러 핸들링
  }
};

/**
 * 특정 initiative를 완료처리합니다.
 * @param {number} initiativeId
 */
export const updateInitiativeDone = async (initiativeId: number) => {
  try {
    const res = await fetcher({
      path: `${INITIATIVE}/${initiativeId}/done`,
      config: {
        method: HTTP_METHOD_TYPE.POST,
      },
    });
    return res;
  } catch (error) {
    throw error;
    // 에러 핸들링
  }
};
