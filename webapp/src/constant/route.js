export const HOME = '/';
export const PROFILE = '/profile';
export const LOGIN = '/login';
export const SIGN_UP = '/signup';
export const USER_BOARD = '/user-board';
export const TEAM_BOARD = '/team-board';
export const USERS_LIST = '/users-list';
export const NEW_POST = '/new-post';
export const MY_POST = '/my-post';
export const OAUTH_URL = {
  GITHUB: `${process.env.REACT_APP_SERVER_API}oauth2/authorization/github`,
  GOOGLE: `${process.env.REACT_APP_SERVER_API}oauth2/authorization/google`,
};

export const ROOT_URL = process.env.REACT_APP_SERVER_API;
console.log(ROOT_URL);
