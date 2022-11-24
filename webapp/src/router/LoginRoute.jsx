import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTE } from 'constant/route.constant';
import Login from 'pages/Login';
import PublicRoute from 'hoc/PublicRoute';
import EssentialInfoRoute from './EssentialInfoRoute';

export default function LoginRoute() {
  return (
    <Login>
      <Routes>
        <Route
          path={ROUTE.ESSENTIAL_INFO.INDEX + ROUTE.ALL}
          element={<PublicRoute Component={EssentialInfoRoute} restricted />}
        />
      </Routes>
    </Login>
  );
}
