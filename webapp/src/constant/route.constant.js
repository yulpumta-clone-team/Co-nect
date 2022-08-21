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
export const ESSENTIAL_INFO = '/essential-info';
export const NOTFOUND = '*';
export const SIGN_UP_INFO = {
  NICKNAME: '/nickname',
  SKILL: '/skill',
  SLOGAN: '/slogan',
  SESSION_JOB: '/session-job',
  BELONG_TEAM: '/belong-team',
  PROFILE_IMAGE: '/profile-image',
  CONTENT: '/content',
  PROTFOLIO: 'portfolio',
};
export const OAUTH_URL = {
  GITHUB: `${process.env.REACT_APP_SERVER_API}oauth2/authorization/github`,
  GOOGLE: `${process.env.REACT_APP_SERVER_API}oauth2/authorization/google`,
};
