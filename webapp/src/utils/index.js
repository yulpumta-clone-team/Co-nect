import { DOMAIN_TYPE } from 'constant';
import { S3_IMAGE_SERVER_URL } from 'constant/api.constant';
import { TECH_SKILLS } from 'constant/techskill.constant';

/**
 * 유저글인지 팀 공고글인지 확인하는 함수
 * @param {sttring} postType user || team
 * @returns {Boolean}
 */
export function checkIsUserPost(postType) {
  return postType === DOMAIN_TYPE.USER;
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

/**
 * Object에 대해 깊은 복사를 실행하는 함수
 * @param {Object} originalObject 복사하고자하는 Object
 * @returns 깊은 복사가 된 Object
 */
export const deepClone = (originalObject) => JSON.parse(JSON.stringify(originalObject));

/**
 * 원하는 카테고리의 기술스택 목록을 파싱하는 함수
 * @param {number} 카테고리목록 번호범위 (100: front, 200: back, 300: mobile, 400:db, 500: arichtecture)
 */
export const getTechSkillsWithCategory = (key) =>
  TECH_SKILLS.filter((techSkill) => techSkill.key >= key && techSkill.key < key + 100);

export const getRandomTechSkills = () =>
  TECH_SKILLS.map((techSkill) => (Math.random() > 0.4 ? techSkill : undefined)).filter(
    (v) => v !== undefined,
  );

export const S3IMAGE_URL = (src) => S3_IMAGE_SERVER_URL + src;
