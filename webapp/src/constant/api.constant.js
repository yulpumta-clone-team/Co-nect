export const TOKEN = {
  ACCESS: 'authorization',
  REFRESH: 'x-refresh-token',
};

export const API_PREFIX = '/api';
export const ROOT_API_URL = process.env.REACT_APP_SERVER_API + API_PREFIX;

export const API = {
  AUTH: {
    LOGIN: '/user/login',
    SIGNUP: '/user/join',
    LOGOUT: '/user/logout',
    WITHDRAWAL: '/user/widthdrawal',
    CHECK_DUPLICATE_EMAIL: '/user/checkDuplicate/email',
    CHECK_DUPLICATE_NICKNAME: '/user/checkDuplicate/name',
  },
  USER: {
    INDEX: `/user`,
    LIKES: '/user/liking',
    READS: '/user/read',
    PROFILE: `/user/myprofile`,
    MYPOSTS: '/user/myposts',
    ESSENTIAL_INFO: '/user/essential_info',
  },
  TEAM: {
    INDEX: `/team`,
    LIKES: '/team/liking',
    READS: '/team/read',
  },
  COMMENT: {
    ORIGIN: '/comment',
    NESTED: '/nested_comment',
    LIKE: '/comment/liking',
    UNLIKE: '/comment/unliking',
  },
  UPLOAD: {
    POST: '/api/upload',
    DELETE: '/api/upload/cancel',
  },
};
