import React from 'react';
import userApi from 'api/user';
import UserCard from 'components/UserCard';
import { USER } from 'constant/route';
import WithInfiniteScroll from 'hoc/WithInfiniteScroll';
import * as S from './style';

export default function UserBoard() {
  return (
    <WithInfiniteScroll
      WrapperComponent={S.BoardWrapper}
      CardComponent={UserCard}
      axiosInstance={userApi.GET_USER_LIST}
      clickLink={`${USER}/`}
    />
  );
}
