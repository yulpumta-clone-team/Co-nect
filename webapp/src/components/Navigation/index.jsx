import React from 'react';
import { getUserCookie } from 'utils/cookie';
import LoginNav from './LoginNav';
import NonLoginNav from './NonLoginNav';
import { NavWrapper } from './style';

function Navigation() {
  const userInfo = getUserCookie();
  return <NavWrapper>{userInfo ? <LoginNav userInfo={userInfo} /> : <NonLoginNav />}</NavWrapper>;
}

export default Navigation;
