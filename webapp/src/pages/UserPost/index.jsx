import React from 'react';
import { useParams } from 'react-router-dom';
import userApi from 'api/user.api';
import WithLoading from 'hoc/WithLoading';
import BackButton from 'components/Common/BackButton';
import UserPostDetail from './UserPostDetail';
import * as S from './UserPost.style';

export default function UserPost() {
  const { userId: stringUserId } = useParams();
  const userId = Number(stringUserId);

  const UserPostDetailWithLoading = WithLoading({
    Component: UserPostDetail,
    responseDataKey: 'targetUser',
    axiosInstance: userApi.GET_USER_DETAIL,
    axiosConfig: { id: userId },
  });

  return (
    <S.Container>
      <BackButton top="100px" />
      <UserPostDetailWithLoading />
    </S.Container>
  );
}
