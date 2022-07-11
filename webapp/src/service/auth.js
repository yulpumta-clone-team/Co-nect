import { USER_INFO } from 'constant';
import storage from 'utils/localstorage';

export const updateUserInfo = (rawUserInfo) => {
  const userInfo = changeUserInfoKey(rawUserInfo);
  storage.set(USER_INFO, userInfo);
};

export const deleteUserInfo = () => storage.remove(USER_INFO);

export const getUserInfo = () => storage.get(USER_INFO);

export const isLogin = () => getUserInfo();

export const changeUserInfoKey = (userInfo) => {
  const { user_id, img, nickname } = userInfo;
  return { userId: user_id, profileImg: img, name: nickname };
};
