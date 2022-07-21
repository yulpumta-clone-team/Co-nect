import React from 'react';
import userApi from 'api/user';
import Cards from 'components/CardsGrid';
import TeamCard from 'components/TeamCard';
import { TEAM_EDIT } from 'constant/route';
import WithLoading from 'hoc/WithLoading';

import * as S from './style';

export default function MyPost() {
  const CardsView = WithLoading({
    Component: Cards,
    responseDataKey: 'cards',
    axiosInstance: userApi.GET_MY_POSTS,
    axiosConfig: {},
  });

  return (
    <S.Container>
      <CardsView isUserList={false} CardComponent={TeamCard} clickLink={`${TEAM_EDIT}/`} />
    </S.Container>
  );
}
