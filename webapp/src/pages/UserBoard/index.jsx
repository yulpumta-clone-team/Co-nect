import React, { useEffect, useState } from 'react';
import { getUserList } from 'apiAction/user';
import UserCard from 'components/UserCard';
import Loader from 'components/Loader';
import UpperButton from 'components/UpperButton';
import NoDataMessage from 'components/NoDataMessage';
import { handleFetcher } from 'utils';
import { BoardWrapper, Cards } from './style';

function UserBoard() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async (page) => {
    setLoading(true);
    try {
      const { value, error } = await handleFetcher(getUserList, { page });
      setUserList((prev) => [...prev, ...value]);
    } catch (error) {
      console.log(error);
      setUserList((prev) => [...prev]);
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
    <>
      <BoardWrapper>
        {userList.length === 0 ? (
          <NoDataMessage />
        ) : (
          <Cards>
            {userList.map((userElement) => (
              <UserCard key={userElement.id} cardInfo={{ ...userElement }} />
            ))}
          </Cards>
        )}
      </BoardWrapper>
      <UpperButton />
    </>
  );
}

export default UserBoard;
