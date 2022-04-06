import React from 'react';
import { getCookie } from 'utils/cookie';
import LoginNav from './LoginNav';
import NonLoginNav from './NonLoginNav';
import { NavWrapper } from './style';

function Navigation() {
  const userInfo = getCookie('userInfo');
  return <NavWrapper>{userInfo ? <LoginNav userInfo={userInfo} /> : <NonLoginNav />}</NavWrapper>;
}

export default Navigation;
