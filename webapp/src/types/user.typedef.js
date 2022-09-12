/**
 * 유저의 스키마
 * @typedef UserSchema
 * @property {number} id
 * @property {string} name
 * @property {array} skills
 * @property {string} slogan
 * @property {boolean} status
 */

/**
 * 유저 카드의 스키마
 * @typedef CardSchema
 * @property {number} commentCnt
 * @property {number} likeCnt
 *
 * @typedef {UserSchema & CardSchema} UserCardSchema
 */

/**
 * 유저 디테일 페이지 스키마
 * @typedef DetailSchema
 * @property {number} commentCnt
 * @property {string} content
 * @property {string} email
 * @property {string} hopeSession
 * @property {string} job
 * @property {number} likeCnt
 * @property {string} portfolio
 * @property {number} readCnt
 * @property {Object} userInfo
 *
 * @typedef {UserSchema & DetailSchema} UserDetailSchema
 */
