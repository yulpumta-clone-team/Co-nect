/* eslint-disable no-prototype-builtins */
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
