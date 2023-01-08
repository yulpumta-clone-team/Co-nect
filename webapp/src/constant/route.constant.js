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
  ALL: '/*',
  ESSENTIAL_INFO: {
    INDEX: '/essential-info',
    NICKNAME: '/nickname',
    SKILL: '/skill',
    PROFILE_IMAGE: '/profile-image',
    SESSION_JOB: '/session-job',
    SLOGAN: '/slogan',
    BELONG_TEAM: '/belong-team',
    CONTENT: '/content',
    PROTFOLIO: '/portfolio',
    CALLBACK: '/callback',
  },
};

export const ESSENTIAL_INFO_LINKS = Object.entries(ROUTE.ESSENTIAL_INFO).reduce(
  (acc, [key, value]) => {
    acc[key] = ROUTE.LOGIN + ROUTE.ESSENTIAL_INFO.INDEX + value;
    return acc;
  },
  {},
);

export const OAUTH_TYPE = {
  GOOGLE: 'GOOGLE',
  GITHUB: 'GITHUB',
};

export const OAUTH_URL = {
  GOOGLE: `http://localhost:8081/api/oauth2/authorization/google?client_id=${process.env.GOOGLE_OAUTH_CLIENT_ID}`,
  GITHUB: `http://localhost:8081/api/oauth2/authorization/github?client_id=${process.env.GITHUB_OAUTH_CLIENT_ID}`,
};
