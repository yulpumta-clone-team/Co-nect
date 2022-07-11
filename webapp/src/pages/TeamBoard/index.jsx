import React, { useEffect, useState } from 'react';
import { handleFetcher } from 'utils';
import Cards from 'components/CardsGrid';
import teamApi from 'api/team';
import TeamCard from 'components/TeamCard';
import * as S from './style';

export default function TeamBoard() {
  const [teamList, setTeamList] = useState([]);
  const fetchData = async (page) => {
    try {
      const { value, error } = await handleFetcher(teamApi.GET_TEAM_ARR, { page });
      setTeamList((prev) => [...prev, ...value]);
    } catch (error) {
      console.log(error);
      setTeamList((prev) => [...prev]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <S.BoardWrapper>
      <Cards cards={teamList} CardComponent={TeamCard} />
    </S.BoardWrapper>
  );
}
