import { AUTH_KEY, DEFAULT_PROFILE_IMG, USER_INFO } from 'constant';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name, value, option) => cookies.set(name, value, { ...option });

export const getCookie = (name) => cookies.get(name);

export const getUserCookie = () => {
  const userInfo = getCookie(USER_INFO);
  if (!userInfo) {
    return null;
  }
  const { img } = userInfo;
  const image = (!img || img.length < 10) && DEFAULT_PROFILE_IMG;
  return { ...userInfo, img: image };
};

export const getAuthCookie = () => cookies.get(AUTH_KEY);

const removeCookie = (name) => cookies.remove(name);

export const removeLoginCookie = () => {
  removeCookie(AUTH_KEY);
  removeCookie(USER_INFO);
};
