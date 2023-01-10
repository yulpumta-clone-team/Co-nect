import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTE } from 'constant/route.constant';
import * as S from './GlobalNavigation.style';

export default function LinkList() {
  const [isShow, setIsShow] = useState(true);
  const onClickHambuger = () => setIsShow((prev) => !prev);
  return (
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
  );
}
