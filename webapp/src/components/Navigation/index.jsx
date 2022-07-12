import React from 'react';
<<<<<<< HEAD
import { getUserCookie } from 'utils/cookie';
=======
import { getUserInfo } from 'service/auth';
>>>>>>> fetch_head
import LoginNav from './LoginNav';
import NonLoginNav from './NonLoginNav';
import { NavWrapper } from './style';

function Navigation() {
<<<<<<< HEAD
  const userInfo = getUserCookie();
=======
  const userInfo = getUserInfo();
>>>>>>> fetch_head
  return <NavWrapper>{userInfo ? <LoginNav userInfo={userInfo} /> : <NonLoginNav />}</NavWrapper>;
}

export default Navigation;
