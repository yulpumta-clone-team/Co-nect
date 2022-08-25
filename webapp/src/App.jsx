import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  HOME,
  LOGIN,
  MY_POST,
  NEW_POST,
  PROFILE,
  SIGN_UP,
  TEAM,
  MY_LIST,
  USER,
  TEAM_EDIT,
  NOTFOUND,
  ESSENTIAL_INFO,
} from 'constant/route.constant';
import Login from 'pages/Login';
import Main from 'pages/Main';
import SignUp from 'pages/SignUp';
import UserBoard from 'pages/UserBoard';
import TeamBoard from 'pages/TeamBoard';
import UserPost from 'pages/UserPost';
import TeamPost from 'pages/TeamPost';
import Callback from 'pages/Callback';
import EditUserProfile from 'pages/EditUserProfile';
import EditTeamProfile from 'pages/EditTeamPost';
import MyList from 'pages/MyList';
import NewPost from 'pages/NewTeamPost';
import MyPost from 'pages/MyPost';
import NotFound from 'pages/NotFound';
import EssentialInfo from 'pages/EssentialInfo';
import PublicRoute from 'hoc/PublicRoute';
import PrivateRoute from 'hoc/PrivateRoute';
import Layout from 'layouts';
import Nickname from 'pages/EssentialInfo/SubPages/Nickname';
import Skills from 'pages/EssentialInfo/SubPages/Skills';
import ProfileImage from 'pages/EssentialInfo/SubPages/ProfileImage';
import SessionJob from 'pages/EssentialInfo/SubPages/SessionJob';
import Slogan from 'pages/EssentialInfo/SubPages/Slogan';
import BelongTeam from 'pages/EssentialInfo/SubPages/BelongTeam';
import Introduction from 'pages/EssentialInfo/SubPages/Introduction';
import Portfolio from 'pages/EssentialInfo/SubPages/Portfolio';
import EssentailCallback from 'pages/EssentialInfo/SubPages/EssentailCallback';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={HOME} element={<Layout />}>
          <Route index element={<PublicRoute Component={Main} restricted={false} />} />
          <Route path={USER} element={<PublicRoute Component={UserBoard} restricted={false} />} />
          <Route path={TEAM} element={<PublicRoute Component={TeamBoard} restricted={false} />} />
          <Route path={PROFILE} element={<PrivateRoute Component={EditUserProfile} />} />
          <Route path={LOGIN} element={<PublicRoute Component={Login} restricted />}>
            <Route
              path={ESSENTIAL_INFO.INDEX}
              element={<PublicRoute Component={EssentialInfo} restricted />}
            >
              <Route index element={<Navigate to={ESSENTIAL_INFO.NICKNAME} replace />} />
              <Route path={ESSENTIAL_INFO.NICKNAME} element={<Nickname />} />
              <Route path={ESSENTIAL_INFO.SKILL} element={<Skills />} />
              <Route path={ESSENTIAL_INFO.PROFILE_IMAGE} element={<ProfileImage />} />
              <Route path={ESSENTIAL_INFO.SESSION_JOB} element={<SessionJob />} />
              <Route path={ESSENTIAL_INFO.SLOGAN} element={<Slogan />} />
              <Route path={ESSENTIAL_INFO.BELONG_TEAM} element={<BelongTeam />} />
              <Route path={ESSENTIAL_INFO.CONTENT} element={<Introduction />} />
              <Route path={ESSENTIAL_INFO.PROTFOLIO} element={<Portfolio />} />
              <Route path={ESSENTIAL_INFO.CALLBACK} element={<EssentailCallback />} />
            </Route>
          </Route>
          <Route path={SIGN_UP} element={<PublicRoute Component={SignUp} restricted />} />
          <Route path={MY_LIST} element={<PrivateRoute Component={MyList} />} />
          <Route path={NEW_POST} element={<PrivateRoute Component={NewPost} />} />
          <Route path={MY_POST} element={<PrivateRoute Component={MyPost} />} />
          <Route
            path={`${USER}/:userId`}
            element={<PublicRoute Component={UserPost} restricted={false} />}
          />
          <Route
            path={`${TEAM}/:teamId`}
            element={<PublicRoute Component={TeamPost} restricted={false} />}
          />
          <Route
            path={`${TEAM_EDIT}/:teamId`}
            element={<PrivateRoute Component={EditTeamProfile} />}
          />
          <Route path="/callback" element={<Callback />} />
          <Route path={NOTFOUND} element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
