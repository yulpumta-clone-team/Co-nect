import React from 'react';
import { Link } from 'react-router-dom';
import LogoWithName from 'assets/images/logo-name.png';
import Button from 'components/Common/Button';
import { ROUTE } from 'constant/route.constant';

import Image from 'components/Common/Image';
import * as S from './GlobalNavigation.style';

export default function NonLoginNav() {
  return (
    <S.Container>
      <S.TopContainer />
      <S.BoardList>
        <Image src={LogoWithName} alt="메인 로고" customStyle={S.Logo} isAssets />
        <S.LinkList>
          <S.Hover>
            <Link to={ROUTE.HOME}>Home</Link>
          </S.Hover>
          <S.Hover>
            <Link to={ROUTE.USER}>Single</Link>
          </S.Hover>
          <S.Hover>
            <Link to={ROUTE.TEAM}>Team</Link>
          </S.Hover>
        </S.LinkList>
        <S.AssignList isLogin={false}>
          <Button theme="primary" customStyle={S.AssignListButton}>
            <Link to={ROUTE.LOGIN}>로그인</Link>
          </Button>
          <Button theme="gray" customStyle={S.AssignListButton}>
            <Link to={ROUTE.SIGN_UP}>회원가입</Link>
          </Button>
        </S.AssignList>
      </S.BoardList>
    </S.Container>
  );
}
