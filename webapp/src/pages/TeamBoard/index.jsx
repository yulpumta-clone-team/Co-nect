import React, { useEffect, useState } from 'react';
import { handleFetcher } from 'utils';
import Cards from 'components/CardsGrid';
import teamApi from 'api/team';
import TeamCard from 'components/TeamCard';
import { TEAM } from 'constant/route';
import useIntersect from 'hooks/useIntersect';
import UpperButton from 'components/UpperButton';
import * as S from './style';

export default function TeamBoard() {
  const [loadMoreRef, page] = useIntersect();
  const [loading, setLoading] = useState();
  const [teamList, setTeamList] = useState([]);
  const fetchData = async (lastPage) => {
    setLoading(true);
    try {
      const { value, error } = await handleFetcher(teamApi.GET_TEAM_ARR, { lastPage });
      setTeamList((prev) => [...prev, ...value]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <>
      <S.BoardWrapper>
        <Cards cards={teamList} CardComponent={TeamCard} clickLink={`${TEAM}/`} />
        <div ref={loadMoreRef} style={{ display: loading ? 'none' : 'block' }}>
          {loading && <div>Loading...</div>}
        </div>
      </S.BoardWrapper>
      <UpperButton />
    </>
  );
}
