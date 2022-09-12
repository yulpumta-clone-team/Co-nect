import { hopeSessionOption } from 'constant';
import { parsedNumberToThreeDigits } from 'utils';
import { skillStackParserToIds } from './skillStack.parser';

export const teamCardParser = (teamCardInfo) => {
  const teamName = teamCardInfo.name;
  const teamImage = teamCardInfo.image;
  const hopeSession = teamCardInfo.session || hopeSessionOption[0].value;
  const skills = teamCardInfo.skills || [];
  const isRecruitng = teamCardInfo.status || false;
  const commentCnt = parsedNumberToThreeDigits(teamCardInfo.commentCnt);
  const readCnt = parsedNumberToThreeDigits(teamCardInfo.read);

  const { user } = teamCardInfo;
  return {
    teamName,
    teamImage,
    hopeSession,
    skills,
    commentCnt,
    readCnt,
    isRecruitng,
    user,
  };
};

export const newTeamPostParser = (newTeamPostData) => {
  const { introduction, hopeSession, profileImage, teamName, techSkills, slogan } = newTeamPostData;
  const parsedTechSkills = skillStackParserToIds(techSkills);
  return {
    content: introduction,
    session: hopeSession,
    image: profileImage,
    name: teamName,
    skills: parsedTechSkills,
    slogan,
  };
};
export const teamDetailParser = (teamDetailInfo) => {
  const hopeSession = teamDetailInfo.hopeSession || hopeSessionOption[0].value;
  const skills = teamDetailInfo.skills || [];
  const content = teamDetailInfo.content || '입력한 자기소개가 없습니다.';
  const slogan = teamDetailInfo.slogan || '입력한 슬로건이 없습니다.';
  const commentCnt = parsedNumberToThreeDigits(teamDetailInfo.commentCnt);
  const likeCnt = parsedNumberToThreeDigits(teamDetailInfo.likeCnt);

  return {
    ...teamDetailInfo,
    hopeSession,
    skills,
    content,
    slogan,
    commentCnt,
    likeCnt,
  };
};
