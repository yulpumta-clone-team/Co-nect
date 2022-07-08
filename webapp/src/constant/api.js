export const ROOT_URL = process.env.REACT_APP_SERVER_API;

export const MOCK_SERVER_URL = process.env.REACT_APP_MOCK_SERVER_API;

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
