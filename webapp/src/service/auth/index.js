import { USER_INFO } from 'constant';
import { TOKEN } from 'constant/api.constant';
import handleLocalstorage from 'utils/handleLocalstorage';
import { userInfoParser } from './auth.parser';

export const updateUserInfo = (rawUserInfo) => {
  const parseduserInfo = userInfoParser(rawUserInfo);
  handleLocalstorage.set(USER_INFO, parseduserInfo);
};

export const deleteUserInfo = () => handleLocalstorage.remove(USER_INFO);

// {id, profileImg, nickname}
export const getUserInfo = () => handleLocalstorage.get(USER_INFO);

export const isLogin = () => getUserInfo();

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
