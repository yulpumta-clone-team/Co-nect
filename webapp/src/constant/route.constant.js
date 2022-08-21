export const HOME = '/';
export const PROFILE = '/profile';
export const LOGIN = '/login';
export const SIGN_UP = '/signup';
export const USER = '/user';
export const TEAM = '/team';
export const TEAM_EDIT = '/team/edit';
export const MY_LIST = '/my-list';
export const NEW_POST = '/new-post';
export const MY_POST = '/my-post';
export const NOTFOUND = '*';
export const ESSENTIAL_INFO = {
  INDEX: '/essential-info',
  NICKNAME: '/essential-info/nickname',
  SKILL: '/essential-info/skill',
  SLOGAN: '/essential-info/slogan',
  SESSION_JOB: '/essential-info/session-job',
  BELONG_TEAM: '/essential-info/belong-team',
  PROFILE_IMAGE: '/essential-info/profile-image',
  CONTENT: '/essential-info/content',
  PROTFOLIO: '/essential-info/portfolio',
};
export const OAUTH_URL = {
  GITHUB: `${process.env.REACT_APP_SERVER_API}oauth2/authorization/github`,
  GOOGLE: `${process.env.REACT_APP_SERVER_API}oauth2/authorization/google`,
};
