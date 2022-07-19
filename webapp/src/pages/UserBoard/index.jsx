import React, { useEffect, useState } from 'react';
import UpperButton from 'components/UpperButton';
import { handleFetcher } from 'utils';
import Cards from 'components/CardsGrid';
import userApi from 'api/user';
import UserCard from 'components/UserCard';
import { USER } from 'constant/route';
import useIntersect from 'hooks/useIntersect';
import * as S from './style';

export default function UserBoard() {
  const [loadMoreRef, page] = useIntersect();
  const [isLoading, setIsLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const fetchData = async (lastPage) => {
    setIsLoading(true);
    try {
      const { value, error } = await handleFetcher(userApi.GET_USER_LIST, { lastPage });
      setUserList((prev) => [...prev, ...value]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <>
      <S.BoardWrapper>
        <Cards cards={userList} CardComponent={UserCard} clickLink={`${USER}/`} />
        <div ref={loadMoreRef} style={{ display: isLoading ? 'none' : 'block' }}>
          {isLoading && <div>Loading...</div>}
        </div>
      </S.BoardWrapper>
      <UpperButton />
    </>
  );
}
