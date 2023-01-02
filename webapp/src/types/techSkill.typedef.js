/**
 * 기술스택 서버  측 raw 데이터 스키마
 * @typedef RawTechSkill
 * @property {number} key 기술스택 key
 * @property {string} category 기술스택 category (front, back ...)
 * @property {string} techName 기술스택 이름
 * @property {string} image 기술스택 이미지
 */

/**
 * 기술스택 파싱된 데이터 스키마
 * @typedef ParsedTechSkill
 * @property {number} id 기술스택 key
 * @property {string} category 기술스택 category (front, back ...)
 * @property {string} label 기술스택 이름
 * @property {string} value 기술스택 이름
 * @property {string} image 기술스택 이미지
 */

/**
 * 카테고리별로 파싱된 기술스택 스키마
 * @typedef CategoryTechSkill
 * @property {Array<ParsedTechSkill>} categoryName  기술스택 파싱된 데이터 스키마
 */
