import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
=======
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from 'apiAction/user';
import UserCard from 'components/UserCard';
import Loader from 'components/Loader';
>>>>>>> back
import UpperButton from 'components/UpperButton';
import { handleFetcher } from 'utils';
import Cards from 'components/CardsGrid';
import userApi from 'api/user';
import UserCard from 'components/UserCard';
import { USER } from 'constant/route';
import * as S from './style';

export default function UserBoard() {
  const [userList, setUserList] = useState([]);
  const fetchData = async (page) => {
    try {
      const { value, error } = await handleFetcher(userApi.GET_USER_LIST, { page });
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
        <Cards cards={userList} CardComponent={UserCard} clickLink={`${USER}/`} />
      </S.BoardWrapper>
      <UpperButton />
    </>
  );
}
