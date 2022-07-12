import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  HOME,
  LOGIN,
  MY_POST,
  NEW_POST,
  PROFILE,
  SIGN_UP,
  TEAM_BOARD,
  MY_USER_LIST,
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
import MyUserList from 'pages/MyUserList';
import NewPost from 'pages/NewTeamPost';
import MyPost from 'pages/MyPost';
import WindowModal from 'components/WindowModal';
import ErrorModal from 'components/ErrorModal';
import NotFound from 'pages/NotFound';
import PublicRoute from 'hoc/PublicRoute';
import PrivateRoute from 'hoc/PrivateRoute';
import AppLayout from './style';

// option: null => 아무나 출입 가능
// option: true => 로그인 유저만
// option: false => 로그인 하면 출입 불가능한 곳(회원가입 등...)
function App() {
  const { isOpen, errorContent, modalContent } = useSelector((state) => state.global);
  return (
    <Router>
      <AppLayout>
        <Navigation />
        {isOpen && (
          <WindowModal show={isOpen}>
            {errorContent ? <ErrorModal errorContent={errorContent} /> : modalContent}
          </WindowModal>
        )}
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
          <Route path={MY_USER_LIST} element={<PrivateRoute Component={MyUserList} />} />
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
