import { hopeSessionOption, jobOptions } from 'constant';
import { parsedNumberToThreeDigits } from 'utils';
import { skillStackParserToIds } from '../etc/skillStack.parser';

/**
 * userCardParser의 반환값
 * @typedef parsedUserCardInfo
 * @property {number} id
 * @property {string} name
 * @property {array} skills
 * @property {string} slogan
 * @property {boolean} status
 * @property {number} commentCnt
 * @property {number} likeCnt
 */

/**
 * 유저 카드 Parser: 없는 정보를 기본 값으로 세팅하고, key값을 구체적인 네이밍으로 변경
 * @param {UserCardSchema} userCardInfo src/types/user.typedef.js
 * @returns {parsedUserCardInfo} parsing된 userCardInfo 객체
 */
export const userCardParser = (userCardInfo) => {
  const job = userCardInfo.job || jobOptions[0].value;
  const hopeSession = userCardInfo.hopeSession || hopeSessionOption[0].value;
  const skills = userCardInfo.skills || [];
  const status = userCardInfo.status || false;
  const commentCnt = parsedNumberToThreeDigits(userCardInfo.commentCnt);
  const likeCnt = parsedNumberToThreeDigits(userCardInfo.likeCnt);
  return {
    ...userCardInfo,
    job,
    hopeSession,
    skills,
    commentCnt,
    likeCnt,
    status,
  };
};

/**
 * userDetailParser 반환값
 * @typedef parsedUserDetailInfo
 * @property {boolean} belongTeam 유저의 팀 소속 여부
 * @property {number} commentCnt
 * @property {string} email
 * @property {string} hopeSession 유저의 희망작업기간
 * @property {string} introduction 유저의 자기소개
 * @property {string} job 유저의 현재직업
 * @property {number} likeCnt
 * @property {string} nickname 유저 닉네임
 * @property {number} userId 유저 아이디
 * @property {string} portfolio 유저의 포트폴리오 링크
 * @property {string} profileImage
 * @property {number} readCnt
 * @property {array} techSkills 유저의 기술 스택
 * @property {string} slogan 유저의 슬로건
 */

/**
 * 유저 프로필 Detail Parser: 없는 정보를 기본 값으로 세팅하고, key값을 구체적인 네이밍으로 변경
 * @param {UserDetailSchema} userDetailInfo src/types/user.typedef.js
 * @returns {parsedUserDetailInfo} parsing된 userDetail 객체
 */
export const userDetailParser = (targetUserInfo) => {
  const userId = targetUserInfo.id;
  const nickname = targetUserInfo.name;
  const profileImage = targetUserInfo.image || null;
  const { email } = targetUserInfo;
  const techSkills = targetUserInfo.skills;
  const slogan = targetUserInfo.slogan || '입력된 슬로건이 없네요.';
  const hopeSession = targetUserInfo.hopeSession || hopeSessionOption[0].value;
  const job = targetUserInfo.job || jobOptions[0].value;
  const belongTeam = targetUserInfo.status === 'Active';
  const introduction = targetUserInfo.content || '입력된 자기소개가 없네요.';
  const portfolio = targetUserInfo.portfolio || '';
  const commentCnt = parsedNumberToThreeDigits(targetUserInfo.commentCnt);
  const likeCnt = parsedNumberToThreeDigits(targetUserInfo.likeCnt);
  const readCnt = parsedNumberToThreeDigits(targetUserInfo.readCnt);
  return {
    belongTeam,
    commentCnt,
    email,
    hopeSession,
    introduction,
    job,
    likeCnt,
    nickname,
    userId,
    portfolio,
    profileImage,
    readCnt,
    techSkills,
    slogan,
  };
};

/**
 * userPostEditParser 반환값
 * @typedef parsedEditUserInfo
 * @property {string} content 유저의 자기소개
 * @property {string} hope_session 유저의 희망작업기간
 * @property {string} image 유저의 프로필 이미지
 * @property {string} job 유저의 현재직업
 * @property {string} name 유저 닉네임
 * @property {string} portfolio 유저의 포트폴리오 링크
 * @property {array} skills 유저의 기술 스택
 * @property {string} slogan 유저의 슬로건
 */

/**
 * 유저 프로필 수정 요청 parser: key값을 서버에서 사용하는 키값으로 변경
 * @param {UserInfoInputSchema} userInfoRawData src/types/user.typedef.js
 * @returns {parsedEditUserInfo} parsing된 edit user profile 객체
 */

export const userPostEditParser = (userInfoRawData) => {
  const {
    introduction,
    hopeSession,
    profileImage,
    job,
    nickname,
    portfolio,
    slogan,
    techSkills,
    belongTeam,
  } = userInfoRawData;
  const paresedTechSkills = skillStackParserToIds(techSkills);
  return {
    content: introduction,
    hope_session: hopeSession,
    image: profileImage,
    job,
    name: nickname,
    portfolio,
    slogan,
    skills: paresedTechSkills,
  };
};

/**
 * essentialInfoParser 반환값
 * @typedef parsedEssentialInfo
 * @property {string} content 유저의 자기소개
 * @property {string} hope_session 유저의 희망작업기간
 * @property {string} image 유저의 프로필 이미지
 * @property {string} job 유저의 현재직업
 * @property {string} name 유저 닉네임
 * @property {string} portfolio 유저의 포트폴리오 링크
 * @property {array} skills 유저의 기술 스택
 * @property {string} slogan 유저의 슬로건
 */

/**
 * 유저 필수정보 입력 요청 parser: key값을 서버에서 사용하는 키값으로 변경하면서 기본값 세팅
 * @param {UserInfoInputSchema} essentialInfoRawData src/types/user.typedef.js
 * @returns {parsedEssentialInfo} parsing된 유저의 필수정보 객체
 */

export const essentialInfoParser = (essentialInfoRawData) => {
  const {
    introduction,
    hopeSession,
    profileImage,
    job,
    nickname,
    portfolio,
    slogan,
    techSkills,
    belongTeam,
  } = essentialInfoRawData;
  const paresedTechSkills = skillStackParserToIds(techSkills);
  return {
    content: introduction || '자기소개를 입력하지 않았네요!',
    hope_session: hopeSession || hopeSessionOption[0].value,
    image: profileImage || '',
    job: job || jobOptions[0].value,
    name: nickname,
    portfolio: portfolio || 'EMPTY',
    slogan,
    skills: paresedTechSkills,
  };
};
