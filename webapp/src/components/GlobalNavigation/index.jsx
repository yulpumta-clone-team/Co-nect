import React from 'react';
import LogoWithName from 'assets/images/logo-name.png';
import Image from 'components/Common/Image';
import { getUserInfo } from 'service/auth';
import * as S from './GlobalNavigation.style';
import LinkList from './LinkList';
import AssignList from './AssignList';
import NonAssignList from './NonAssignList';

export default function GlobalNavigation() {
  const userInfo = getUserInfo(); // {id, profileImg, nickname}
  return (
    <S.Container>
      <S.TopContainer />
      <Image src={LogoWithName} alt="메인 로고" customStyle={S.Logo} isAssets />
      <LinkList />
      {userInfo ? <AssignList userInfo={userInfo} /> : <NonAssignList />}
    </S.Container>
  );
}
