import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { handleFetcher } from 'utils';
import Cards from 'components/CardsGrid';
import teamApi from 'api/team';
=======
import { useDispatch, useSelector } from 'react-redux';
import { getTeamList } from 'apiAction/team';
import Loader from 'components/Loader';
>>>>>>> back
import TeamCard from 'components/TeamCard';
import { TEAM } from 'constant/route';
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
      <Cards cards={teamList} CardComponent={TeamCard} clickLink={`${TEAM}/`} />
    </S.BoardWrapper>
  );
}
