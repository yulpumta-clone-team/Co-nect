/**
 * 팀 서버측 스키마
 * @typedef TeamSchema
 * @property {number} id
 * @property {string} name
 * @property {array} skills
 * @property {string} slogan
 * @property {boolean} status
 * @property {UserInfoSchema} userInfo id, image, name
 */

/**
 * 팀 카드의 서버측 스키마
 * @typedef TeamCardSchema
 * @property {number} id
 * @property {string} name
 * @property {array} skills
 * @property {string} slogan
 * @property {boolean} status
 * @property {UserInfoSchema} userInfo id, image, name
 *
 * @property {number} commentCnt
 * @property {number} likeCnt
 * @property {number} readCnt
 */

/**
 * 팀 디테일 페이지 서버측 스키마
 * @typedef TeamDetailSchema
 * @property {number} id
 * @property {string} name
 * @property {array} skills
 * @property {string} slogan
 * @property {boolean} status
 * @property {UserInfoSchema} userInfo id, image, name
 *
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
 * 팀 정보 입력 스키마
 * @typedef TeamInfoInputSchema
 * @property {string} content - 팀 자기소개
 * @property {string} hopeSession - 팀 희망 작업 기간
 * @property {string} teamImage - 팀 프로필 이미지
 * @property {string} teamId - 팀 아이디
 * @property {string} teamName - 팀 이름
 * @property {array} techSkills - 팀 기술 스택
 * @property {string} slogan - 팀 슬로건
 */
