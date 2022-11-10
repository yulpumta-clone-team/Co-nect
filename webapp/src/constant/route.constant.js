export const ROUTE = {
  HOME: '/',
  PROFILE: '/profile',
  LOGIN: '/login',
  SIGN_UP: '/signup',
  USER: '/user',
  TEAM: '/team',
  TEAM_EDIT: '/team/edit',
  MY_LIST: '/my-list',
  NEW_POST: '/new-post',
  MY_POST: '/my-post',
  CALLBACK: '/callback',
  OAUTH_CALLBACK: '/oauthCallback',
  OAUTH_FAIL: '/OauthFail',
  NOTFOUND: '*',
  ESSENTIAL_INFO: {
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
  },
};

export const OAUTH_URL = {
  GITHUB: `${process.env.REACT_APP_SERVER_API}oauth2/authorization/github`,
  GOOGLE: `${process.env.REACT_APP_SERVER_API}oauth2/authorization/google`,
};
