const essentialValidation = ({
  nickname,
  profileImage,
  skills,
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

  if (!skills) {
    validateErrors.skills = '최소 한 개 이상의 언어를 선택해주세요.';
  }

  if (!slogan) {
    validateErrors.slogan = '슬로건이 입력되지 않았습니다.';
  }

  return validateErrors;
};

export default essentialValidation;
