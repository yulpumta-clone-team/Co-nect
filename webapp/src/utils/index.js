import { POST_TYPE } from 'constant';

/**
 * 유저글인지 팀 공고글인지 확인하는 함수
 * @param {sttring} postType user || team
 * @returns {Boolean}
 */
export function checkIsUserPost(postType) {
  return postType === POST_TYPE.USER;
}

/**
 * 제출하려는 데이터에서 postType에 따라서 id만 변경하는 함수
 * @param {string} postType user || team
 * @param {string} postId userId || teamId
 * @param {Object} submitData 제출하려는 데이터
 * @returns
 */
export function setPostIdOnSubmitData(postType, postId, submitData) {
  const id = checkIsUserPost(postType) ? 'userId' : 'teamId';
  return {
    [id]: postId,
    ...submitData,
  };
}

/**
 * 숫자를 3자리 숫자로 표기하게 하는 함수 ex: 1 -> 001
 * @param {number} number
 * @returns {String} 3자리 숫자
 */
export const parsedNumberToThreeDigits = (number) =>
  number > 999 ? String(999) : String(number).padStart(3, '0');

export const deepClone = (originalObject) => JSON.parse(JSON.stringify(originalObject));
