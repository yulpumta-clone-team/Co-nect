import React from 'react';
import userApi from 'api/user.api';
import { ROUTE } from 'constant/route.constant';
import { emptyTrigger } from 'constant/service.constant';
import WithInfiniteScroll from 'hoc/WithInfiniteScroll';
import UserCard from 'components/UserCard';
import * as S from './MyPost.style';

export default function MyPost() {
  return (
    <S.Container>
      <WithInfiniteScroll
        CardComponent={UserCard}
        clickLink={`${ROUTE.USER}/`}
        axiosInstance={userApi.GET_MY_POSTS}
        emptyTrigger={emptyTrigger.user}
      />
    </S.Container>
  );
}
