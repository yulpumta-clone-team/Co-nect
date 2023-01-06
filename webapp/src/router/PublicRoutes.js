import React from 'react';
import SignUp from 'pages/SignUp';
import { ROUTE } from 'constant/route.constant';
import UserBoard from 'pages/UserBoard';
import TeamBoard from 'pages/TeamBoard';
import UserPost from 'pages/UserPost';
import TeamPost from 'pages/TeamPost';
import PublicRoute from 'hoc/PublicRoute';
import LoginRoute from './LoginRoute';

const routesWithHeader = [
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

const routesWithFullPage = [
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
];

export const publicRoutesWithHeader = routesWithHeader.map(({ path, element, restricted }) => ({
  path,
  element: <PublicRoute Component={element} restricted={restricted} />,
}));

export const publicRoutesWithFullPage = routesWithFullPage.map(({ path, element, restricted }) => ({
  path,
  element: <PublicRoute Component={element} restricted={restricted} />,
}));
