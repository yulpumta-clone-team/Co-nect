/* eslint-disable no-prototype-builtins */
import { belongTeamOptions, hopeSessionOption, jobOptions } from 'constant';
import { parsedNumberToThreeDigits } from 'utils';
import { skillStackParserToIds } from '../skillStack.parser';

/**
 * 유저 카드 Parser: 없는 정보를 기본 값으로 세팅하고, key값을 구체적인 네이밍으로 변경
 * @param {UserCardSchema} userCardInfo
 * @returns {validateErrors} parsing된 userCardInfo 객체
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
 * 유저 카드 Parser: 없는 정보를 기본 값으로 세팅하고, key값을 구체적인 네이밍으로 변경
 * @param {UserCardSchema} userCardInfo
 * @returns {validateErrors} parsing된 userCardInfo 객체
 */
export const userDetailParser = (userDetailInfo) => {
  const job = userDetailInfo.job || jobOptions[0].value;
  const hopeSession = userDetailInfo.hopeSession || hopeSessionOption[0].value;
  const skills = userDetailInfo.skills || [];
  const portfolio = userDetailInfo.portfolio || '포트폴리오가 없습니다.';
  const content = userDetailInfo.content || '입력한 자기소개가 없습니다.';
  const slogan = userDetailInfo.slogan || '입력한 슬로건이 없습니다.';

  return {
    ...userDetailInfo,
    job,
    hopeSession,
    skills,
    portfolio,
    content,
    slogan,
  };
};

// get 요청 후
export const userEditParser = (targetUserInfo) => {
  const userId = targetUserInfo.id;
  const techSkills = targetUserInfo.skills || [];
  const nickname = targetUserInfo.name;
  const profileImage = targetUserInfo.img || '';
  const slogan = targetUserInfo.slogan || '';
  const hopeSession = targetUserInfo.hopeSession || '';
  const job = targetUserInfo.job || jobOptions[0].value;
  const belongTeam = targetUserInfo.status
    ? belongTeamOptions[0].value
    : belongTeamOptions[1].value;
  const introduction = targetUserInfo.content || '';
  const portfolio = targetUserInfo.portfolio || '';
  return {
    userId,
    nickname,
    profileImage,
    techSkills,
    slogan,
    hopeSession,
    job,
    belongTeam,
    introduction,
    portfolio,
  };
};

// post 요청 전
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
  console.log('userInfoRawData', userInfoRawData);
  const paresedTechSkills = skillStackParserToIds(techSkills);
  return {
    description: introduction,
    hope_session: hopeSession,
    img: profileImage,
    job,
    name: nickname,
    portfolio,
    slogan,
    skills: paresedTechSkills,
  };
};

// post 요청 전
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
