import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import EssentialInfo from 'pages/EssentialInfo';
import BelongTeam from 'pages/EssentialInfo/SubPages/BelongTeam';
import Introduction from 'pages/EssentialInfo/SubPages/Introduction';
import Nickname from 'pages/EssentialInfo/SubPages/Nickname';
import Portfolio from 'pages/EssentialInfo/SubPages/Portfolio';
import ProfileImage from 'pages/EssentialInfo/SubPages/ProfileImage';
import SessionJob from 'pages/EssentialInfo/SubPages/SessionJob';
import Skills from 'pages/EssentialInfo/SubPages/Skills';
import Slogan from 'pages/EssentialInfo/SubPages/Slogan';
import EssentialCallback from 'pages/EssentialInfo/SubPages/EssentialCallback';
import { ROUTE } from 'constant/route.constant';
import PublicRoute from 'hoc/PublicRoute';

const essentialInfoNestedRoutes = [
  {
    path: ROUTE.ESSENTIAL_INFO.NICKNAME,
    element: Nickname,
    restricted: true,
  },
  {
    path: ROUTE.ESSENTIAL_INFO.SKILL,
    element: Skills,
    restricted: true,
  },
  {
    path: ROUTE.ESSENTIAL_INFO.PROFILE_IMAGE,
    element: ProfileImage,
    restricted: true,
  },
  {
    path: ROUTE.ESSENTIAL_INFO.SESSION_JOB,
    element: SessionJob,
    restricted: true,
  },
  {
    path: ROUTE.ESSENTIAL_INFO.SLOGAN,
    element: Slogan,
    restricted: true,
  },
  {
    path: ROUTE.ESSENTIAL_INFO.BELONG_TEAM,
    element: BelongTeam,
    restricted: true,
  },
  {
    path: ROUTE.ESSENTIAL_INFO.CONTENT,
    element: Introduction,
    restricted: true,
  },
  {
    path: ROUTE.ESSENTIAL_INFO.PROTFOLIO,
    element: Portfolio,
    restricted: true,
  },
  {
    path: ROUTE.ESSENTIAL_INFO.CALLBACK,
    element: EssentialCallback,
    restricted: true,
  },
];

export default function EssentialInfoRoute() {
  return (
    <EssentialInfo>
      <Routes>
        <Route index element={<Navigate to={ROUTE.ESSENTIAL_INFO.NICKNAME} replace />} />
        {essentialInfoNestedRoutes.map(({ path, element, restricted }) => (
          <Route
            key={path}
            path={path}
            element={<PublicRoute Component={element} restricted={restricted} />}
          />
        ))}
      </Routes>
    </EssentialInfo>
  );
}
