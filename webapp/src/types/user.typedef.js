/**
 * 유저 필수 정보 서버측 스키마
 * @typedef UserInfoSchema
 * @property {number} id
 * @property {string} name
 * @property {string} image
 */

/**
 * 유저의 서버측 스키마
 * @typedef UserSchema
 * @property {number} id
 * @property {string} name
 * @property {array} skills
 * @property {string} slogan
 * @property {boolean} status
 */

/**
 * 유저 카드의 서버측 스키마
 * @typedef UserCardSchema

 * @property {number} id
 * @property {string} name
 * @property {array} skills
 * @property {string} slogan
 * @property {boolean} status
 * 
 * @property {number} commentCnt
 * @property {number} likeCnt
 */

/**
 * 유저 디테일 페이지 서버측 스키마
 * @typedef UserDetailSchema
 * @property {number} id
 * @property {string} name
 * @property {array} skills
 * @property {string} slogan
 * @property {string} status
 *
 * @property {number} commentCnt
 * @property {string} content
 * @property {string} email
 * @property {string} hopeSession
 * @property {string} job
 * @property {number} likeCnt
 * @property {string} portfolio
 * @property {number} readCnt
 * @property {UserInfoSchema} userInfo id, image, name
 */

/**
 * 유저 정보 입력 스키마
 * @typedef UserInfoInputSchema
 * @property {string} introduction - 유저의 자기소개
 * @property {string} hopeSession - 유저의 희망 작업 기간
 * @property {string} profileImage - 유저의 프로필 이미지
 * @property {string} job - 유저의 직업
 * @property {string} nickname - 유저의 닉네임
 * @property {string} portfolio - 유저의 포트폴리오 링크
 * @property {string} slogan - 유저의 슬로건
 * @property {array} techSkills - 유저의 기술 스택
 * @property {string} belongTeam - 유저의 팀 소속 여부
 */
