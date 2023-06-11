import { ID } from '@type/common';
import { KEY_RESULT_DETAIL, KEY_RESULT_INPUT } from '@type/keyResult';
import { fetcher, HTTP_METHOD_TYPE } from './fetcher';
import { KEY_RESULT } from './path';

/**
 * id로 key-result 데이터를 호출합니다.
 * @param { ID } initiativeId
 * @returns
 */
export const fetchKeyResult = async (
  keyResultId: ID,
): Promise<KEY_RESULT_DETAIL> => {
  try {
    const res = await fetcher<KEY_RESULT_DETAIL>({
      path: `${KEY_RESULT}/${keyResultId}`,
    });
    return res;
  } catch (error) {
    throw error;
    // 에러 핸들링
  }
};

/**
 * key result를 생성합니다.
 * @param {KEY_RESULT_INPUT} payload
 */
export const createInitiative = async (payload: KEY_RESULT_INPUT) => {
  try {
    const res = await fetcher({
      path: `${KEY_RESULT}`,
      config: {
        method: HTTP_METHOD_TYPE.POST,
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
 * 특정 initiative를 수정합니다.
 * @param {ID} keyResultId
 * @param {INITIATIVE_INPUT} payload
 * @returns
 */
export const updateInitiative = async (
  keyResultId: ID,
  payload: KEY_RESULT_INPUT,
) => {
  try {
    const res = await fetcher({
      path: `${KEY_RESULT}/${keyResultId}`,
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
 * @param {ID} keyResultId
 * @returns
 */
export const deleteInitiative = async (keyResultId: ID) => {
  try {
    const res = await fetcher({
      path: `${KEY_RESULT}/${keyResultId}`,
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
