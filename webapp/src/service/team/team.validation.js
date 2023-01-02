/**
 * 팀 공고글 생성: Inputs Object - input들의 key, value로 이뤄진 객체
 * @typedef {Object} newTeamPostValidateObj
 * @property {string} teamName  teamName
 * @property {Array} techSkills  techSkills
 * @property {string} slogan slogan
 */

/**
 * 팀 공고글 생성: Erros Object - input들의 key, value로 이뤄진 에러 객체
 * @typedef {Object} newTeamPostValidateErrors
 * @property {string} teamName
 * @property {string} techSkills
 * @property {string} slogan
 */

/**
 * 팀 공고글 생성 vaidation
 * @param {newTeamPostValidateObj} newTeamPostValidateObj input들의 key, value로 이뤄진 객체
 * @returns {newTeamPostValidateErrors} input들의 key, value로 이뤄진 에러 객체
 */
export const newTeamPostValidation = ({ teamName, techSkills, slogan }) => {
  const validateErrors = {
    teamName: '',
    techSkills: '',
    slogan: '',
  };

  if (!teamName) {
    validateErrors.teamName = '팀이름이 입력되지 않았습니다. ';
  }

  if (techSkills.length === 0) {
    validateErrors.techSkills = '최소 한 개 이상의 언어를 선택해주세요.';
  }
  if (!slogan) {
    validateErrors.slogan = '슬로건이 입력되지 않았습니다. ';
  }

  return validateErrors;
};
