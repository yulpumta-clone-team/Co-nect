import React from 'react';
import userApi from 'api/user.api';
import UserCard from 'components/UserCard';
import { ROUTE } from 'constant/route.constant';
import WithInfiniteScroll from 'hoc/WithInfiniteScroll';
import CardsGrid from 'components/CardsGrid';
import * as S from './style';

export default function UserBoard() {
  const UserCardsGridWithInfiniteScroll = WithInfiniteScroll({
    Component: CardsGrid,
    responseDataKey: 'cards',
    axiosInstance: userApi.GET_USER_LIST,
  });
  return (
    <S.BoardWrapper>
      <UserCardsGridWithInfiniteScroll CardComponent={UserCard} clickLink={`${ROUTE.USER}/`} />
    </S.BoardWrapper>
  );
}
