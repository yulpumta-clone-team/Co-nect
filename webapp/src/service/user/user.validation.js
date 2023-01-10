/**
 * 유저프로필수정: Inputs Object - input들의 key, value로 이뤄진 객체
 * @typedef {Object} editUserValidateObj
 * @property {string} nickname  nickname
 * @property {Array} techSkills  techSkills
 */

/**
 * 유저프로필수정: Errors Object - input들의 key, value로 이뤄진 에러 객체
 * @typedef {Object} editUserValidateErrors
 * @property {string} nickname
 * @property {string} techSkills
 */

/**
 * 유저 프로필 수정 validation
 * @param {editUserValidateObj} editUserValidateObj input들의 key, value로 이뤄진 객체
 * @returns {editUserValidateErrors} input들의 key, value로 이뤄진 에러 객체
 */
export const editUserValidation = ({ nickname, techSkills }) => {
  const validateErrors = {
    nickname: '',
    techSkills: '',
  };

  if (!nickname) {
    validateErrors.nickname = '닉네임이 입력되지 않았습니다. ';
  }

  if (techSkills.length === 0) {
    validateErrors.techSkills = '최소 한 개 이상의 언어를 선택해주세요.';
  }

  return validateErrors;
};

/**
 * 필수정보입력: Inputs Object - input들의 key, value로 이뤄진 객체
 * @typedef {Object} essentialValidateObj
 * @property {string} nickname
 * @property {string} profileImage
 * @property {string} skills
 * @property {string} slogan
 * @property {string} hopeSession
 * @property {string} job
 * @property {string} belongTeam
 * @property {string} introduction
 * @property {string} portfolio
 */

/**
 * 필수정보입력: Errors Object - input들의 key, value로 이뤄진 에러 객체
 * @typedef {Object} essentialValidateErrors
 * @property {string} nickname
 * @property {string} profileImage
 * @property {Array} skills
 * @property {string} slogan
 * @property {string} hopeSession
 * @property {string} job
 * @property {string} belongTeam
 * @property {string} introduction
 * @property {string} portfolio
 */

/**
 * 필수 정보 입력 validation
 * @param {essentialValidateObj} essentialValidateObj input들의 key, value로 이뤄진 객체
 * @returns {essentialValidateErrors} input들의 key, value로 이뤄진 에러 객체
 */
export const essentialValidation = ({
  nickname,
  profileImage,
  techSkills,
  slogan,
  hopeSession,
  job,
  belongTeam,
  introduction,
  portfolio,
}) => {
  const validateErrors = {
    nickname: '',
    profileImage: '',
    skills: '',
    slogan: '',
    hopeSession: '',
    job: '',
    belongTeam: '',
    introduction: '',
    portfolio: '',
  };

  if (!nickname) {
    validateErrors.nickname = '닉네임이 입력되지 않았습니다. ';
  }

  if (techSkills.length === 0) {
    validateErrors.techSkills = '최소 한 개 이상의 언어를 선택해주세요.';
  }

  if (!slogan) {
    validateErrors.slogan = '슬로건이 입력되지 않았습니다.';
  }

  return validateErrors;
};
