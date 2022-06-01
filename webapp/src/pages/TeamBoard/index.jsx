import React, { useEffect, useState } from 'react';
import { getTeamList } from 'apiAction/team';
import { handleFetcher } from 'utils';
import Cards from 'components/CardsGrid';
import * as S from './style';

function TeamBoard() {
  const [teamList, setTeamList] = useState([]);
  const fetchData = async (page) => {
    try {
      const { value, error } = await handleFetcher(getTeamList, { page });
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
      <Cards cards={teamList} isUserList={false} />
    </S.BoardWrapper>
  );
}

export default TeamBoard;
