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
export const OAUTH_URL = {
  GITHUB: `${process.env.REACT_APP_SERVER_API}oauth2/authorization/github`,
  GOOGLE: `${process.env.REACT_APP_SERVER_API}oauth2/authorization/google`,
};


export const ROOT_URL = process.env.REACT_APP_SERVER_API;

console.log(ROOT_URL);


export const MOCK_SERVER_URL = process.env.REACT_APP_MOCK_SERVER_API;
