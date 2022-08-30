export const editUserValidation = ({ techSkills }) => {
  const validateErrors = {
    techSkills: '',
  };

  if (techSkills.length === 0) {
    validateErrors.techSkills = '최소 한 개 이상의 언어를 선택해주세요.';
  }

  return validateErrors;
};
