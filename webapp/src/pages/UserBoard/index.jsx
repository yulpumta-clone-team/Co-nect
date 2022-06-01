import React, { useEffect, useState } from 'react';
import { getUserList } from 'apiAction/user';
import UpperButton from 'components/UpperButton';
import { handleFetcher } from 'utils';
import Cards from 'components/CardsGrid';
import * as S from './style';

function UserBoard() {
  const [userList, setUserList] = useState([]);
  const fetchData = async (page) => {
    try {
      const { value, error } = await handleFetcher(getUserList, { page });
      setUserList((prev) => [...prev, ...value]);
    } catch (error) {
      console.log(error);
      setUserList((prev) => [...prev]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <S.BoardWrapper>
        <Cards cards={userList} isUserList />
      </S.BoardWrapper>
      <UpperButton />
    </>
  );
}

export default UserBoard;
