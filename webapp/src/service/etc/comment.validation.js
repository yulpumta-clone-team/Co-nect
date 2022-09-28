/**
 * 댓글 form: Inputs Object - input들의 key, value로 이뤄진 객체
 * @typedef {Object} commentFormValidationObj
 * @property {string} content  content
 * @property {boolean} isSecret  isSecret
 */

/**
 * 댓글 form: Erros Object - input들의 key, value로 이뤄진 에러 객체
 * @typedef {Object} commentFormValidationErros
 * @property {string} content content
 * @property {string} isSecret isSecret
 */

/**
 * (대)댓글 작성/수정 validation
 * @param {commentFormValidationObj} commentFormValidationObj input들의 key, value로 이뤄진 객체
 * @returns {commentFormValidationErros}input들의 key, value로 이뤄진 에러 객체
 */
export const commentFormValidation = ({ content, isSecret }) => {
  const validateErrors = {
    content: '',
    isSecret: '',
  };
  if (!content) {
    validateErrors.content = '댓글이 입력되지 않았습니다. ';
  }

  // isSecret: 기본값이 있는 input

  return validateErrors;
};
