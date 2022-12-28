import React from 'react';
import userApi from 'api/user.api';
import CardsGrid from 'components/CardsGrid';
import TeamCard from 'components/TeamCard';
import { ROUTE } from 'constant/route.constant';
import WithLoading from 'hoc/WithLoading';
import { emptyTrigger } from 'constant/service.constant';
import * as S from './MyPost.style';

export default function MyPost() {
  const CardsView = WithLoading({
    Component: CardsGrid,
    responseDataKey: 'cards',
    axiosInstance: userApi.GET_MY_POSTS,
    axiosConfig: {},
  });

  return (
    <S.Container>
      <CardsView
        isUserList={false}
        CardComponent={TeamCard}
        clickLink={`${ROUTE.TEAM_EDIT}/`}
        emptyTrigger={emptyTrigger.team}
      />
    </S.Container>
  );
}
