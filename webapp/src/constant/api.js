export const API_PREFIX = '/api';
export const ROOT_API_URL = process.env.REACT_APP_SERVER_API + API_PREFIX;

export const API = {
  AUTH: {
    LOGIN: '/user/login',
    SIGNUP: '/user/join',
    LOGOUT: '/user/logout',
    WITHDRAWAL: 'user/widthdrawal',
  },
  USER: {
    LIST: `/users`,
    DETAIL: `/user`,
    LIKES: '/user/liking',
    READS: '/user/read',
    PROFILE: `/user/myprofile`,
    MYPOSTS: '/user/myposts',
  },
  TEAM: {
    LIST: `/teams`,
    DETAIL: `/team`,
    LIKES: '/team/liking',
    READS: '/team/read',
  },
  COMMENT: {
    ORIGIN: '/comment',
    NESTED: '/nested_comment',
    LIKE: '/comment/liking',
    UNLIKE: '/comment/unliking',
  },
};
