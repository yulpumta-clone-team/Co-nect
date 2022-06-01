import { USER_INFO } from 'constant';
import storage from 'utils/localstorage';

export const updateUserInfo = (userinfo) => {
  isAllDataInUserInfo();
  storage.set(USER_INFO, userinfo);
};

export const deleteUserInfo = () => storage.remove(USER_INFO);

export const getUserInfo = () => storage.get(USER_INFO);

export const isLogin = () => getUserInfo();

export const isAllDataInUserInfo = () => {
  const currentUserInfo = getUserInfo();
  if (!currentUserInfo) {
    return false;
  }
  for (const [key, value] of Object.entries(currentUserInfo)) {
    if (key === 'img') {
      // eslint-disable-next-line no-continue
      continue;
    }
    if (value === '' || value === undefined || value === null) {
      return false;
    }
  }
  return true;
};
