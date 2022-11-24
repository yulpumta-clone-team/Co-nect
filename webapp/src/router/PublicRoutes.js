import React from 'react';
import SignUp from 'pages/SignUp';
import { ROUTE } from 'constant/route.constant';
import Main from 'pages/Main';
import UserBoard from 'pages/UserBoard';
import TeamBoard from 'pages/TeamBoard';
import UserPost from 'pages/UserPost';
import TeamPost from 'pages/TeamPost';
import PublicRoute from 'hoc/PublicRoute';
import LoginRoute from './LoginRoute';

const routes = [
  {
    path: ROUTE.SIGN_UP,
    element: SignUp,
    restricted: true,
  },
  {
    path: ROUTE.LOGIN + ROUTE.ALL,
    element: LoginRoute,
    restricted: true,
  },
  {
    path: ROUTE.HOME,
    element: Main,
    restricted: false,
  },
  {
    path: ROUTE.USER,
    element: UserBoard,
    restricted: false,
  },
  {
    path: ROUTE.TEAM,
    element: TeamBoard,
    restricted: false,
  },
  {
    path: `${ROUTE.USER}/:userId`,
    element: UserPost,
    restricted: false,
  },
  {
    path: `${ROUTE.TEAM}/:teamId`,
    element: TeamPost,
    restricted: false,
  },
];

const publicRoutes = routes.map(({ path, element, restricted }) => ({
  path,
  element: <PublicRoute Component={element} restricted={restricted} />,
}));

export default publicRoutes;
