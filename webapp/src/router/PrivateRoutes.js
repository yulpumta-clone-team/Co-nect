import React from 'react';
import { ROUTE } from 'constant/route.constant';
import EditUserProfile from 'pages/EditUserProfile';
import MyList from 'pages/MyList';
import NewTeamPost from 'pages/NewTeamPost';
import MyPost from 'pages/MyPost';
import EditTeamPost from 'pages/EditTeamPost';
import PrivateRoute from 'hoc/PrivateRoute';

const routes = [
  {
    path: ROUTE.PROFILE,
    element: EditUserProfile,
    restricted: true,
  },
  {
    path: ROUTE.MY_LIST,
    element: MyList,
    restricted: true,
  },
  {
    path: ROUTE.NEW_POST,
    element: NewTeamPost,
    restricted: false,
  },
  {
    path: ROUTE.MY_POST,
    element: MyPost,
    restricted: false,
  },
  {
    path: `${ROUTE.TEAM_EDIT}/:teamId`,
    element: EditTeamPost,
    restricted: false,
  },
];

export const privateRoutesWithHeader = routes.map(({ path, element, restricted }) => ({
  path,
  element: <PrivateRoute Component={element} restricted={restricted} />,
}));
