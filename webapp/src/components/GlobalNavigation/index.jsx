import React from 'react';
import { getUserInfo } from 'service/auth';
import LoginNav from './LoginNav';
import NonLoginNav from './NonLoginNav';

import * as S from './style';

export default function Navigation() {
  const userInfo = getUserInfo();
  return (
    <>
      <S.TopContainer />
      <S.Container>{userInfo ? <LoginNav userInfo={userInfo} /> : <NonLoginNav />}</S.Container>
    </>
  );
}
