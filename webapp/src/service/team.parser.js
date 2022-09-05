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
