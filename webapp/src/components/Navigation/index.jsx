import React from 'react';
import { getUserInfo } from 'service/auth';
import LoginNav from './LoginNav';
import NonLoginNav from './NonLoginNav';
import { NavWrapper } from './style';

function Navigation() {
  const userInfo = getUserInfo();
  return <NavWrapper>{userInfo ? <LoginNav userInfo={userInfo} /> : <NonLoginNav />}</NavWrapper>;
}

export default Navigation;
