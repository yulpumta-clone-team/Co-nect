import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTE } from 'constant/route.constant';
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
import Layout from 'layouts/layout';
import AssignLayout from 'layouts/layoutAssign';
import Nickname from 'pages/EssentialInfo/SubPages/Nickname';
import Skills from 'pages/EssentialInfo/SubPages/Skills';
import ProfileImage from 'pages/EssentialInfo/SubPages/ProfileImage';
import SessionJob from 'pages/EssentialInfo/SubPages/SessionJob';
import Slogan from 'pages/EssentialInfo/SubPages/Slogan';
import BelongTeam from 'pages/EssentialInfo/SubPages/BelongTeam';
import Introduction from 'pages/EssentialInfo/SubPages/Introduction';
import Portfolio from 'pages/EssentialInfo/SubPages/Portfolio';
import EssentialCallback from 'pages/EssentialInfo/SubPages/EssentialCallback';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AssignLayout />}>
          <Route path={ROUTE.SIGN_UP} element={<PublicRoute Component={SignUp} restricted />} />
          <Route path={ROUTE.LOGIN} element={<PublicRoute Component={Login} restricted />} />
        </Route>
        <Route path={ROUTE.HOME} element={<Layout />}>
          <Route index element={<PublicRoute Component={Main} restricted={false} />} />
          <Route
            path={ROUTE.USER}
            element={<PublicRoute Component={UserBoard} restricted={false} />}
          />
          <Route
            path={ROUTE.TEAM}
            element={<PublicRoute Component={TeamBoard} restricted={false} />}
          />
          <Route path={ROUTE.PROFILE} element={<PrivateRoute Component={EditUserProfile} />} />
          <Route
            path={ROUTE.USER}
            element={<PublicRoute Component={UserBoard} restricted={false} />}
          />
          <Route
            path={ROUTE.TEAM}
            element={<PublicRoute Component={TeamBoard} restricted={false} />}
          />
          <Route path={ROUTE.PROFILE} element={<PrivateRoute Component={EditUserProfile} />} />
          <Route path={ROUTE.LOGIN} element={<PublicRoute Component={Login} restricted />}>
            <Route
              path={ROUTE.ESSENTIAL_INFO.INDEX}
              element={<PublicRoute Component={EssentialInfo} restricted />}
            >
              <Route index element={<Navigate to={ROUTE.ESSENTIAL_INFO.NICKNAME} replace />} />
              <Route
                path={ROUTE.ESSENTIAL_INFO.NICKNAME}
                element={<PublicRoute Component={Nickname} restricted />}
              />
              <Route
                path={ROUTE.ESSENTIAL_INFO.SKILL}
                element={<PublicRoute Component={Skills} restricted />}
              />
              <Route
                path={ROUTE.ESSENTIAL_INFO.PROFILE_IMAGE}
                element={<PublicRoute Component={ProfileImage} restricted />}
              />
              <Route
                path={ROUTE.ESSENTIAL_INFO.SESSION_JOB}
                element={<PublicRoute Component={SessionJob} restricted />}
              />
              <Route
                path={ROUTE.ESSENTIAL_INFO.SLOGAN}
                element={<PublicRoute Component={Slogan} restricted />}
              />
              <Route
                path={ROUTE.ESSENTIAL_INFO.BELONG_TEAM}
                element={<PublicRoute Component={BelongTeam} restricted />}
              />
              <Route
                path={ROUTE.ESSENTIAL_INFO.CONTENT}
                element={<PublicRoute Component={Introduction} restricted />}
              />
              <Route
                path={ROUTE.ESSENTIAL_INFO.PROTFOLIO}
                element={<PublicRoute Component={Portfolio} restricted />}
              />
              <Route
                path={ROUTE.ESSENTIAL_INFO.CALLBACK}
                element={<PublicRoute Component={EssentialCallback} restricted />}
              />
            </Route>
          </Route>
          <Route path={ROUTE.SIGN_UP} element={<PublicRoute Component={SignUp} restricted />} />
          <Route path={ROUTE.MY_LIST} element={<PrivateRoute Component={MyList} />} />
          <Route path={ROUTE.NEW_POST} element={<PrivateRoute Component={NewPost} />} />
          <Route path={ROUTE.MY_POST} element={<PrivateRoute Component={MyPost} />} />
          <Route
            path={`${ROUTE.USER}/:userId`}
            element={<PublicRoute Component={UserPost} restricted={false} />}
          />
          <Route
            path={`${ROUTE.TEAM}/:teamId`}
            element={<PublicRoute Component={TeamPost} restricted={false} />}
          />
          <Route
            path={`${ROUTE.TEAM_EDIT}/:teamId`}
            element={<PrivateRoute Component={EditTeamProfile} />}
          />
          <Route path={ROUTE.CALLBACK} element={<Callback />} />
          <Route path={ROUTE.NOTFOUND} element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
