import React from 'react';
import { getUserInfo } from 'service/auth';
import LoginNav from './LoginNav';
import NonLoginNav from './NonLoginNav';

import * as S from './style';

export default function Navigation() {
  const userInfo = { id: 1234, profileImg: '', nickname: '홍길동' }; // {id, profileImg, nickname}
  return (
    <S.Container>
      <LoginNav userInfo={userInfo} />
    </S.Container>
  );
}
