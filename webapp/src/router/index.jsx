import React from 'react';
import { useRoutes } from 'react-router-dom';
import LayoutWithHeader from 'layouts/LayoutWithHeader';
import LayoutFullPage from 'layouts/LayoutFullPage';
import { ROUTE } from 'constant/route.constant';
import Main from 'pages/Main';
import { publicRoutesWithHeader, publicRoutesWithFullPage } from './PublicRoutes';
import { privateRoutesWithHeader } from './PrivateRoutes';
import etcRoutes from './EtcRoutes';

export default function Router() {
  const element = [
    {
      path: ROUTE.HOME,
      element: <Main />,
      restricted: false,
    },
    {
      element: <LayoutWithHeader />,
      children: [...publicRoutesWithHeader, ...privateRoutesWithHeader],
    },
    {
      element: <LayoutFullPage />,
      children: [...publicRoutesWithFullPage, ...etcRoutes],
    },
  ];
  return useRoutes(element);
}
