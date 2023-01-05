import React from 'react';
import teamApi from 'api/team.api';
import TeamCard from 'components/TeamCard';
import { ROUTE } from 'constant/route.constant';
import WithInfiniteScroll from 'hoc/WithInfiniteScroll';
import { emptyTrigger } from 'constant/service.constant';
import * as S from './TeamBoard.style';

export default function TeamBoard() {
  return (
    <S.BoardWrapper>
      <WithInfiniteScroll
        CardComponent={TeamCard}
        clickLink={`${ROUTE.TEAM}/`}
        axiosInstance={teamApi.GET_TEAM_ARR}
        emptyTrigger={emptyTrigger.team}
      />
    </S.BoardWrapper>
  );
}
