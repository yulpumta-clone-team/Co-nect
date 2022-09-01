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
