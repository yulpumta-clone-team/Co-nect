export const signUpParser = (sigupRawData) => {
  const { email, password } = sigupRawData;
  return { email, pwd: password };
};

export const loginParser = (loginRawData) => {
  const { email, password } = loginRawData;
  return { email, pwd: password };
};
