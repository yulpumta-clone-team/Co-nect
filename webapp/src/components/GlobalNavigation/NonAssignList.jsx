import Button from 'components/Common/Button';
import { ROUTE } from 'constant/route.constant';
import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './GlobalNavigation.style';

export default function NonAssignList() {
  return (
    <S.AssignList isLogin={false}>
      <Link to={ROUTE.LOGIN}>
        <Button theme="primary" customStyle={S.AssignListButton}>
          로그인
        </Button>
      </Link>
      <Link to={ROUTE.SIGN_UP}>
        <Button theme="gray" customStyle={S.AssignListButton}>
          회원가입
        </Button>
      </Link>
    </S.AssignList>
  );
}
