import { hopeSessionOption } from 'constant';
import { parsedNumberToThreeDigits } from 'utils';
import { skillStackParserToIds } from '../skillStack.parser';

/**
 * teamCardParser 반환값
 * @typedef parsedTeamCardInfo
 * @property {string} teamName
 * @property {string} teamImage
 * @property {string} hopeSession
 * @property {array} skills
 * @property {number} commentCnt
 * @property {number} readCnt
 * @property {boolean} isRecruitng
 * @property {UserInfoSchema} user
 */

/**
 * 팀 카드 Parser: 없는 정보를 기본 값으로 세팅하고, key값을 구체적인 네이밍으로 변경
 * @param {TeamCardSchema} teamCardInfo src/types/team.typedef.js
 * @returns {parsedTeamCardInfo} parsing된 teamCardInfo 객체
 */
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

/**
 * newTeamPostParser 반환값
 * @typedef parsedNewTeamPostObj
 * @property {string} content
 * @property {string} hope_session
 * @property {string} name
 * @property {string} image
 * @property {array} skills
 * @property {string} slogan
 */

/**
 * 팀 공고글 생성 Parser: key값을 구체적인 네이밍으로 변경
 * @param {TeamInfoInputSchema} newTeamPostData src/types/team.typedef.js
 * @returns {parsedNewTeamPostObj} parsing된 팀 공고글 생성 객체
 */
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

/**
 * teamDetailParser 반환값
 * @typedef parsedTeamDetailInfo
 * @property {number} id
 * @property {string} name
 * @property {array} skills
 * @property {string} slogan
 * @property {boolean} status
 * @property {UserInfoSchema} userInfo id, image, name
 * @property {number} commentCnt
 * @property {string} content
 * @property {string} email
 * @property {string} hopeSession
 * @property {string} job
 * @property {number} likeCnt
 * @property {string} portfolio
 * @property {number} readCnt
 */

/**
 * 팀 카드 Parser: 없는 정보를 기본 값으로 세팅하고, key값을 구체적인 네이밍으로 변경
 * @param {TeamDetailSchema} teamDetailInfo src/types/team.typedef.js
 * @returns {parsedTeamDetailInfo} parsing된 teamDetailInfo 객체
 */
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
