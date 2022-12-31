export const TOKEN = {
  ACCESS: 'authorization',
  REFRESH: 'x-refresh-token',
};

export const S3_IMAGE_SERVER_URL = process.env.REACT_APP_S3_IMAGE_SERVER_API;

export const API_PREFIX = '/api';
export const ROOT_API_URL = process.env.REACT_APP_SERVER_API + API_PREFIX;

export const API_MESSAGE = {
  SIGNUP: '환영합니다!',
  LOGIN: '반가워요!',
  LOGOUT: '다음에 또 만나요!',
  EXPIRE_TOKEN: '토큰이 만료되었습니다. \n다시 로그인해주세요.',
  SUCCESS_NEW_TEAM: '팀 등록이 완료되었습니다.',
  SUCCESS_EDIT_USER: '수정 완료!',
  SUCCESS_EDIT_TEAM: '수정 완료!',
  LOADING: '처리중입니다...',
  ERROR_USER_INFO: `유저정보를 가져오지 못했습니다. \n다시 로그인해주세요.`,
  SUCCESS_SAVE_USER_INFO: '유저정보가 성공적으로 저장되었습니다!',
};

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
    MYPOSTS: '/user/my-post',
    ESSENTIAL_INFO: '/user/essential_info',
  },
  TEAM: {
    INDEX: `/team`,
    LIKE: '/team/liking',
    UNLIKE: '/team/unliking',
    READS: '/team/read',
  },
  COMMENT: {
    ORIGIN: '/comment',
    NESTED: '/nested_comment',
    LIKE: '/comment/liking',
    UNLIKE: '/comment/unliking',
  },
  UPLOAD: {
    POST: '/upload',
    DELETE: '/upload/cancel',
  },
  TECH_STACK: {
    ALL: '/techstack/all',
    CATEGORY: '/techstack',
  },
};
