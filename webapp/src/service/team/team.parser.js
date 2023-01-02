import { hopeSessionOption } from 'constant';
import { parsedNumberToThreeDigits } from 'utils';
import { skillStackParserToIds } from '../etc/skillStack.parser';

/**
 * teamCardParser 반환값
 * @typedef parsedTeamCardInfo
 * @property {string} teamName
 * @property {string} teamImage
 * @property {string} hopeSession
 * @property {array} skills
 * @property {number} commentCnt
 * @property {number} readCnt
 * @property {number} likeCnt
 * @property {boolean} isRecruitng
 * @property {UserInfoSchema} writer id, name, image
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
  const skills = teamCardInfo?.skills || [];
  const isRecruitng = teamCardInfo.status;
  const commentCnt = parsedNumberToThreeDigits(teamCardInfo.commentCnt);
  const readCnt = parsedNumberToThreeDigits(teamCardInfo.readCnt);
  const likeCnt = parsedNumberToThreeDigits(teamCardInfo.likeCnt);
  const writer = teamCardInfo.userInfo;
  const slogan = teamCardInfo?.slogan || '';
  return {
    teamName,
    teamImage,
    hopeSession,
    skills,
    commentCnt,
    readCnt,
    likeCnt,
    isRecruitng,
    writer,
    slogan,
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
  const { introduction, hopeSession, profileImage, teamName, techSkills, slogan } = newTeamPostData;
  const parsedTechSkills = skillStackParserToIds(techSkills);
  return {
    content: introduction,
    hope_session: hopeSession,
    image: profileImage,
    name: teamName,
    skills: parsedTechSkills,
    slogan,
  };
};

/**
 * teamDetailParser 반환값
 * @typedef parsedTeamDetailInfo
 * @property {number} teamId
 * @property {string} teamName
 * @property {string} teamImage
 * @property {array} techSkills
 * @property {string} content
 * @property {string} slogan
 * @property {string} hopeSession
 * @property {UserInfoSchema} writerInfo id, image, name
 */

/**
 * 팀 카드 Parser: 없는 정보를 기본 값으로 세팅하고, key값을 구체적인 네이밍으로 변경
 * @param {TeamDetailSchema} teamDetailInfo src/types/team.typedef.js
 * @returns {parsedTeamDetailInfo} parsing된 teamDetailInfo 객체
 */
export const teamDetailParser = (teamDetailInfo) => {
  const teamId = teamDetailInfo.id;
  const teamName = teamDetailInfo.name;
  const teamImage = teamDetailInfo.image;
  const hopeSession = teamDetailInfo.hopeSession || hopeSessionOption[0].value;
  const techSkills = teamDetailInfo.skills;
  const content = teamDetailInfo.content || '입력한 컨텐츠 없습니다.';
  const slogan = teamDetailInfo.slogan || '입력한 슬로건이 없습니다.';
  const writerInfo = teamDetailInfo.userInfo;

  const commentCnt = parsedNumberToThreeDigits(teamDetailInfo.commentCnt);
  const likeCnt = parsedNumberToThreeDigits(teamDetailInfo.likeCnt);
  const readCnt = parsedNumberToThreeDigits(teamDetailInfo.readCnt);

  return {
    teamId,
    teamName,
    teamImage,
    techSkills,
    hopeSession,
    content,
    slogan,
    writerInfo,
    commentCnt,
    likeCnt,
    readCnt,
  };
};

/**
 * teamEditRequestParser 반환값
 * @typedef parsedTeamEditRequestInfo
 * @property {string} content 팀 게시글 상세내용
 * @property {string} image 팀 이미지
 * @property {array} name 팀 이름
 * @property {string} session 프로젝트 희망 기간
 * @property {UserInfoSchema} skills 기술 스택
 * @property {string} slogan 팀 슬로건
 */

/**
 *
 * @param {TeamInfoInputSchema} teamInputInfo
 * @returns {parsedTeamEditRequestInfo}  parsing된 teamEditRequestParser 객체
 */
export const teamEditRequestParser = (teamInputInfo) => {
  const { content } = teamInputInfo;
  const image = teamInputInfo.teamImage;
  const name = teamInputInfo.teamName;
  const session = teamInputInfo.hopeSession;
  const skills = skillStackParserToIds(teamInputInfo.techSkills);
  const { slogan } = teamInputInfo;
  return {
    content,
    image,
    name,
    session,
    skills,
    slogan,
  };
};
