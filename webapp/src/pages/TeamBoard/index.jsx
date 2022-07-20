import React from 'react';
import teamApi from 'api/team';
import TeamCard from 'components/TeamCard';
import { TEAM } from 'constant/route';
import WithInfiniteScroll from 'hoc/WithInfiniteScroll';
import * as S from './style';

export default function TeamBoard() {
  return (
    <WithInfiniteScroll
      WrapperComponent={S.BoardWrapper}
      CardComponent={TeamCard}
      axiosInstance={teamApi.GET_TEAM_ARR}
      clickLink={`${TEAM}/`}
    />
  );
}
