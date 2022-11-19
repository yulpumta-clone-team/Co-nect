import React from 'react';
import { useRoutes } from 'react-router-dom';
import Layout from 'layouts/layout';
import publicRoutes from './PublicRoutes';
import privateRoutes from './PrivateRoutes';
import etcRoutes from './EtcRoutes';

export default function Router() {
  const element = [
    {
      element: <Layout />,
      children: [...publicRoutes, ...privateRoutes],
    },
    ...etcRoutes,
  ];
  return useRoutes(element);
}
