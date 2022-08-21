import React from 'react';
import { Link } from 'react-router-dom';
import Logo from 'assets/icons/nav-logo.svg';
import Button from 'components/Common/Button';
import { HOME, LOGIN, PROFILE, SIGN_UP, TEAM, USER } from 'constant/route.constant';

import * as S from './style';

export default function NonLoginNav() {
  return (
    <S.Container>
      <S.TopContainer />
      <S.BoardList>
        <S.Logo>
          <img src={Logo} alt="conect-logo" />
        </S.Logo>
        <S.LinkList>
          <S.Hover>
            <Link to={HOME}>Home</Link>
          </S.Hover>
          <S.Hover>
            <Link to={USER}>Single</Link>
          </S.Hover>
          <S.Hover>
            <Link to={TEAM}>Team</Link>
          </S.Hover>
        </S.LinkList>
        <S.AssignList isLogin={false}>
          <Button theme="primary" customStyle={S.AssignListButton}>
            <Link to={LOGIN}>로그인</Link>
          </Button>
          <Button theme="gray" customStyle={S.AssignListButton}>
            <Link to={SIGN_UP}>회원가입</Link>
          </Button>
        </S.AssignList>
      </S.BoardList>
    </S.Container>
  );
}
