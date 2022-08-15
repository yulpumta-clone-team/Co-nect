import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HOME, LOGIN, PROFILE, SIGN_UP, TEAM, USER } from 'constant/route';
import logo from 'assets/icons/logo.svg';

import * as S from './style';

function NonLoginNav() {
  return (
    <S.BoardList>
      <S.Logo>
        <img src={logo} alt="Logo" />
        <S.Text style={{ color: '#036EFF' }}>Co-nect</S.Text>
      </S.Logo>
      <S.LinkList>
        <S.Text>
          <Link to={HOME}>Main</Link>
        </S.Text>
        <S.Text>
          <Link to={USER}>User Board</Link>
        </S.Text>
        <S.Text>
          <Link to={TEAM}>Team Board</Link>
        </S.Text>
      </S.LinkList>
      <S.AssignList>
        <S.AssignButton style={{ background: '#036EFF' }}>
          <S.Text style={{ color: '#FFFFFF' }}>
            <Link to={LOGIN}>로그인</Link>
          </S.Text>
        </S.AssignButton>
        <S.AssignButton>
          <S.Text>
            <Link to={SIGN_UP}>회원가입</Link>
          </S.Text>
        </S.AssignButton>
      </S.AssignList>
    </S.BoardList>
  );
}

export default NonLoginNav;
