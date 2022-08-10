import { USER_INFO } from 'constant';
import { TOKEN } from 'constant/api';
import handleLocalstorage from 'utils/handleLocalstorage';

export const updateUserInfo = (rawUserInfo) => {
  const userInfo = changeUserInfoKey(rawUserInfo);
  handleLocalstorage.set(USER_INFO, userInfo);
};

export const deleteUserInfo = () => handleLocalstorage.remove(USER_INFO);

export const getUserInfo = () => handleLocalstorage.get(USER_INFO);

export const isLogin = () => getUserInfo();

export const changeUserInfoKey = (userInfo) => {
  const { user_id, image, nickname } = userInfo;
  return { userId: user_id, image, name: nickname };
};

export const handleToken = {
  getAccessToken() {
    return handleLocalstorage.get(TOKEN.ACCESS);
  },
  saveAccessToken(tokenValue) {
    handleLocalstorage.set(TOKEN.ACCESS, tokenValue);
  },
  getRefreshToken() {
    return handleLocalstorage.get(TOKEN.REFRESH);
  },
  saveRefreshToken(tokenValue) {
    handleLocalstorage.set(TOKEN.REFRESH, tokenValue);
  },
};
