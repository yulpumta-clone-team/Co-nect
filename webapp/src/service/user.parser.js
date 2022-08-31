/* eslint-disable no-prototype-builtins */
import { belongTeamOptions, hopeSessionOption, jobOptions } from 'constant';
import { parsedNumberToThreeDigits } from 'utils';

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

export const userEditParser = (targetUserInfo) => {
  const userId = targetUserInfo.id;
  const techSkills = targetUserInfo.skills || [];
  const nickname = targetUserInfo.name;
  const profileImage = targetUserInfo.img;
  const { slogan } = targetUserInfo;
  const { hopeSession } = targetUserInfo;
  const { job } = targetUserInfo;
  const belongTeam = targetUserInfo.status ? belongTeamOptions[0] : belongTeamOptions[1];
  const introduction = targetUserInfo.content;
  const { portfolio } = targetUserInfo;
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
