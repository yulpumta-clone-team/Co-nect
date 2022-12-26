import React from 'react';
import { useRoutes } from 'react-router-dom';
import LayoutWithHeader from 'layouts/LayoutWithHeader';
import LayoutFullPage from 'layouts/LayoutFullPage';
import publicRoutes from './PublicRoutes';
import privateRoutes from './PrivateRoutes';
import etcRoutes from './EtcRoutes';

export default function Router() {
  const element = [
    {
      element: <LayoutWithHeader />,
      children: [...publicRoutes, ...privateRoutes],
    },
    {
      element: <LayoutFullPage />,
      children: [...etcRoutes],
    },
  ];
  return useRoutes(element);
}
