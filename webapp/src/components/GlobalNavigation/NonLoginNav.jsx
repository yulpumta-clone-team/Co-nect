import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HOME, LOGIN, PROFILE, SIGN_UP, TEAM, USER } from 'constant/route.constant';

import * as S from './style';

function NonLoginNav() {
  return (
    <S.LinkList>
      <li>
        <Link to={HOME}>Main</Link>
      </li>
      <li>
        <Link to={USER}>User Board</Link>
      </li>
      <li>
        <Link to={TEAM}>Team Board</Link>
      </li>
      <li>
        <Link to={LOGIN}>Log In</Link>
      </li>
      <li>
        <Link to={SIGN_UP}>Sign Up</Link>
      </li>
    </S.LinkList>
  );
}

export default NonLoginNav;
