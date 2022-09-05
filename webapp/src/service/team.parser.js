/* eslint-disable no-prototype-builtins */
import { hopeSessionOption } from 'constant';
import { skillStackParserToIds } from './skillStack.parser';

export const newTeamPostParser = (newTeamPostData) => {
  const { introduction, hopeSession, profileImage, name, techSkills, slogan } = newTeamPostData;
  const parsedTechSkills = skillStackParserToIds(techSkills);
  return {
    content: introduction,
    hope_session: hopeSession,
    image: profileImage,
    name,
    skills: parsedTechSkills,
    slogan,
  };
};
export const teamDetailParser = (teamDetailInfo) => {
  const hopeSession = teamDetailInfo.hopeSession || hopeSessionOption[0].value;
  const skills = teamDetailInfo.skills || [];
  const content = teamDetailInfo.content || '입력한 자기소개가 없습니다.';
  const slogan = teamDetailInfo.slogan || '입력한 슬로건이 없습니다.';

  return {
    ...teamDetailInfo,
    hopeSession,
    skills,
    content,
    slogan,
  };
};
