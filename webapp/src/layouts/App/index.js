import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  HOME,
  LOGIN,
  MY_POST,
  NEW_POST,
  PROFILE,
  SIGN_UP,
  TEAM_BOARD,
  MY_LIST,
  USER_BOARD,
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
import AppLayout from './style';

function App() {
  return (
    <Router>
      <AppLayout>
        <Navigation />
        <Routes>
          <Route path={HOME} element={<PublicRoute Component={Main} restricted={false} />} />
          <Route
            path={USER_BOARD}
            element={<PublicRoute Component={UserBoard} restricted={false} />}
          />
          <Route
            path={TEAM_BOARD}
            element={<PublicRoute Component={TeamBoard} restricted={false} />}
          />
          <Route path={PROFILE} element={<PrivateRoute Component={EditUserProfile} />} />
          <Route path={LOGIN} element={<PublicRoute Component={Login} restricted />} />
          <Route path={SIGN_UP} element={<PublicRoute Component={SignUp} restricted />} />
          <Route path={MY_LIST} element={<PrivateRoute Component={MyList} />} />
          <Route path={NEW_POST} element={<PrivateRoute Component={NewPost} />} />
          <Route path={MY_POST} element={<PrivateRoute Component={MyPost} />} />
          <Route
            path={`${USER_BOARD}/:userId`}
            element={<PublicRoute Component={UserPost} restricted={false} />}
          />
          <Route
            path={`${TEAM_BOARD}/:teamId`}
            element={<PublicRoute Component={TeamPost} restricted={false} />}
          />
          <Route
            path={`${TEAM_BOARD}/:teamId/edit`}
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
