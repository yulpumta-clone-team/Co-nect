/* eslint-disable no-prototype-builtins */

import { hopeSessionOption, jobOptions } from 'constant';

export const userCardParser = (userCardInfo) => {
  const job = userCardInfo.job || jobOptions[0].value;
  const hopeSession = userCardInfo.hopeSession || hopeSessionOption[0].value;
  const skills = userCardInfo.skills || [];
  return {
    ...userCardInfo,
    job,
    hopeSession,
    skills,
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
