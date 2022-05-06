import { AUTH_KEY, USER_INFO } from 'constant';
import { Cookies } from 'react-cookie';
import { setDefaultProfileImage } from './constant';

const cookies = new Cookies();

export const setCookie = (name, value, option) => cookies.set(name, value, { ...option });

export const getCookie = (name) => cookies.get(name);

export const getUserCookie = () => {
  const userInfo = getCookie(USER_INFO);
  if (!userInfo) {
    return null;
  }
  const { img } = userInfo;
  return { ...userInfo, img: setDefaultProfileImage(img) };
};

// export const getAuthCookie = () => cookies.get(AUTH_KEY);

const removeCookie = (name) => cookies.remove(name);

export const removeLoginCookie = () => {
  removeCookie(AUTH_KEY);
  removeCookie(USER_INFO);
};

// const tempUserInfo = {
//   name: 'back',
//   id: 1901941,
//   img: '',
// };

// setCookie('userInfo', tempUserInfo);
// removeCookie('userInfo');
