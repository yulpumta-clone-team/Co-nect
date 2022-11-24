import React from 'react';
import { ROUTE } from 'constant/route.constant';
import Callback from 'pages/Callback';
import NotFound from 'pages/NotFound';
import OAuthCallback from 'pages/OAuthCallback';
import OAuthFail from 'pages/OAuthFail';

const etcRoutes = [
  { path: ROUTE.OAUTH_CALLBACK, element: <OAuthCallback /> },
  { path: ROUTE.OAUTH_FAIL, element: <OAuthFail /> },
  { path: ROUTE.CALLBACK, element: <Callback /> },
  { path: ROUTE.ALL, element: <NotFound /> },
];

export default etcRoutes;
