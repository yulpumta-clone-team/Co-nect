export const signUpParser = (sigupRawData) => {
  const { email, password } = sigupRawData;
  return { email, pwd: password };
};

export const loginParser = (loginRawData) => {
  const { email, password } = loginRawData;
  return { email, pwd: password };
};

export const userInfoParser = (userInfoRaw) => {
  const { id, image, name } = userInfoRaw;
  return { id, nickname: name, profileImg: image };
};
