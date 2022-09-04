export const newTeamPostValidation = ({ name, techSkills, slogan }) => {
  const validateErrors = {
    name: '',
    techSkills: '',
    slogan: '',
  };

  if (!name) {
    validateErrors.name = '팀이름이 입력되지 않았습니다. ';
  }

  if (techSkills.length === 0) {
    validateErrors.techSkills = '최소 한 개 이상의 언어를 선택해주세요.';
  }
  if (!slogan) {
    validateErrors.slogan = '슬로건이 입력되지 않았습니다. ';
  }

  return validateErrors;
};
