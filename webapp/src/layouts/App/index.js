import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
} from 'constant/route';
import Login from 'pages/Login';
import Main from 'pages/Main';
import SignUp from 'pages/SignUp';
import UserBoard from 'pages/UserBoard';
import TeamBoard from 'pages/TeamBoard';
import UserPost from 'pages/UserPost';
import TeamPost from 'pages/TeamPost';
import Callback from 'pages/Callback';
import Navigation from 'components/Navigation';
import EditUserProfile from 'pages/EditUserProfile';
import EditTeamProfile from 'pages/EditTeamPost';
import MyList from 'pages/MyList';
import NewPost from 'pages/NewTeamPost';
import MyPost from 'pages/MyPost';
import NotFound from 'pages/NotFound';
import PublicRoute from 'hoc/PublicRoute';
import PrivateRoute from 'hoc/PrivateRoute';
import Nickname from 'pages/SignUp/Nickname';
import Skill from 'pages/SignUp/Skill';
import Img from 'pages/SignUp/Img';
import SessionJob from 'pages/SignUp/SessionJob';
import SloganPortfolio from 'pages/SignUp/SloganPortfolio';
import Content from 'pages/SignUp/Content';
import AppLayout from './style';

function App() {
  return (
    <Router>
      <AppLayout>
        <Navigation />
        <Routes>
          <Route path={HOME} element={<PublicRoute Component={Main} restricted={false} />} />
          <Route path={USER} element={<PublicRoute Component={UserBoard} restricted={false} />} />
          <Route path={TEAM} element={<PublicRoute Component={TeamBoard} restricted={false} />} />
          <Route path={PROFILE} element={<PrivateRoute Component={EditUserProfile} />} />
          <Route path={LOGIN} element={<PublicRoute Component={Login} restricted />} />
          <Route path="/signup/*" element={<PublicRoute Component={SignUp} restricted />} />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
