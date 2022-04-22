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
  USERS_LIST,
  USER_BOARD,
} from 'constant/route';
import Auth from 'hoc/auth';
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
import UsersList from 'pages/UsersList';
import NewPost from 'pages/NewTeamPost';
import MyPost from 'pages/MyPost';
import WindowModal from 'components/WindowModal';
import ErrorModal from 'components/ErrorModal';
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
          <Route path={HOME} element={<Auth SpecificComponent={Main} option={null} />} />
          <Route path={USER_BOARD} element={<Auth SpecificComponent={UserBoard} option={null} />} />
          <Route path={TEAM_BOARD} element={<Auth SpecificComponent={TeamBoard} option={null} />} />
          <Route
            path={PROFILE}
            element={<Auth SpecificComponent={EditUserProfile} option={null} />}
          />
          <Route path={LOGIN} element={<Auth SpecificComponent={Login} option={false} />} />
          <Route path={SIGN_UP} element={<Auth SpecificComponent={SignUp} option={false} />} />
          <Route path={USERS_LIST} element={<Auth SpecificComponent={UsersList} option />} />
          <Route path={NEW_POST} element={<Auth SpecificComponent={NewPost} option />} />
          <Route path={MY_POST} element={<Auth SpecificComponent={MyPost} option />} />
          <Route
            path={`${USER_BOARD}/:userId`}
            element={<Auth SpecificComponent={UserPost} option={null} />}
          />
          <Route
            path={`${TEAM_BOARD}/:teamId`}
            element={<Auth SpecificComponent={TeamPost} option={null} />}
          />
          <Route
            path={`${TEAM_BOARD}/:teamId/edit`}
            element={<Auth SpecificComponent={EditTeamProfile} option={null} />}
          />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
