import React from 'react';
import teamApi from 'api/team';
import TeamCard from 'components/TeamCard';
import { TEAM } from 'constant/route';
import WithInfiniteScroll from 'hoc/WithInfiniteScroll';
import CardsGrid from 'components/CardsGrid';
import * as S from './style';

export default function TeamBoard() {
  const UserCardsGridWithInfiniteScroll = WithInfiniteScroll({
    Component: CardsGrid,
    responseDataKey: 'cards',
    axiosInstance: teamApi.GET_TEAM_LIST,
  });
  return (
    <S.BoardWrapper>
      <UserCardsGridWithInfiniteScroll CardComponent={TeamCard} clickLink={`${TEAM}/`} />
    </S.BoardWrapper>
  );
}
