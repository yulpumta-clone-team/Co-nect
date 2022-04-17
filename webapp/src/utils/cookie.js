import { AUTH_KEY, USER_INFO } from 'constant';
import { Cookies } from 'react-cookie';
import { setDefaultProfileImage } from './constant';

const cookies = new Cookies();

export const setCookie = (name, value, option) => cookies.set(name, value, { ...option });

export const getCookie = (name) => cookies.get(name);

export const getLoginUserInfo = () => {
  const userInfo = cookies.get(USER_INFO);
  userInfo.img = setDefaultProfileImage(userInfo.img);
  return userInfo;
};

export const getAuthCookie = () => cookies.get(AUTH_KEY);

const removeCookie = (name) => cookies.remove(name);

export const removeLoginCookie = () => {
  removeCookie(AUTH_KEY);
  removeCookie(USER_INFO);
};

const tempUserInfo = {
  name: '임시',
  id: 1901941,
  img: '',
};

setCookie('userInfo', tempUserInfo);
// removeCookie('userInfo');
