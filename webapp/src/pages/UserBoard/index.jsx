import React from 'react';
import userApi from 'api/user.api';
import UserCard from 'components/UserCard';
import { ROUTE } from 'constant/route.constant';
import WithInfiniteScroll from 'hoc/WithInfiniteScroll';
import { emptyTrigger } from 'constant/service.constant';
import * as S from './UserBoard.style';

export default function UserBoard() {
  return (
    <S.BoardWrapper>
      <WithInfiniteScroll
        CardComponent={UserCard}
        clickLink={`${ROUTE.USER}/`}
        axiosInstance={userApi.GET_USER_LIST}
        emptyTrigger={emptyTrigger.user}
      />
    </S.BoardWrapper>
  );
}
