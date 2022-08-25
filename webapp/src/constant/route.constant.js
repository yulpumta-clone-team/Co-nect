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
  INDEX: '/login/essential-info',
  NICKNAME: '/login/essential-info/nickname',
  SKILL: '/login/essential-info/skill',
  SLOGAN: '/login/essential-info/slogan',
  SESSION_JOB: '/login/essential-info/session-job',
  BELONG_TEAM: '/login/essential-info/belong-team',
  PROFILE_IMAGE: '/login/essential-info/profile-image',
  CONTENT: '/login/essential-info/content',
  PROTFOLIO: '/login/essential-info/portfolio',
  CALLBACK: '/login/essential-info/callback',
};
export const OAUTH_URL = {
  GITHUB: `${process.env.REACT_APP_SERVER_API}oauth2/authorization/github`,
  GOOGLE: `${process.env.REACT_APP_SERVER_API}oauth2/authorization/google`,
};
