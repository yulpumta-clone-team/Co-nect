import { AUTH_KEY, USER_INFO } from 'constant';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name, value, option) => cookies.set(name, value, { ...option });

export const getCookie = (name) => cookies.get(name);

export const getAuthCookie = () => cookies.get(AUTH_KEY);

const removeCookie = (name) => cookies.remove(name);

export const removeLoginCookie = () => {
  removeCookie(AUTH_KEY);
  removeCookie(USER_INFO);
};
