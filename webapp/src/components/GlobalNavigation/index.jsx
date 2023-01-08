import React from 'react';
import { getUserInfo } from 'service/auth';
import LoginNav from './LoginNav';
import NonLoginNav from './NonLoginNav';
import * as S from './GlobalNavigation.style';

export default function GlobalNavigation() {
  const userInfo = getUserInfo(); // {id, profileImg, nickname}
  return (
    <S.Container>
      <S.TopContainer />
      {userInfo ? <LoginNav userInfo={userInfo} /> : <NonLoginNav />}
    </S.Container>
  );
}
