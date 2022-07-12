import React, { useEffect, useState } from 'react';
import { getTeamList } from 'apiAction/team';
import Loader from 'components/Loader';
import TeamCard from 'components/TeamCard';
import NoDataMessage from 'components/NoDataMessage';
import { handleFetcher } from 'utils';
import { BoardWrapper, Cards } from './style';

function TeamBoard() {
  const [teamList, setTeamList] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async (page) => {
    setLoading(true);
    try {
      const { value, error } = await handleFetcher(getTeamList, { page });
      console.log('value', value);
      setTeamList((prev) => [...prev, ...value]);
    } catch (error) {
      console.log(error);
      setTeamList((prev) => [...prev]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <BoardWrapper>
      {teamList.length === 0 ? (
        <NoDataMessage />
      ) : (
        <Cards>
          {teamList.map((teamElement) => (
            <TeamCard key={teamElement.id} cardInfo={{ ...teamElement }} />
          ))}
        </Cards>
      )}
    </BoardWrapper>
  );
}

export default TeamBoard;
