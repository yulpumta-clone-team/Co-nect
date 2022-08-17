import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userApi from 'api/user.api';
import WithLoading from 'hoc/WithLoading';
import UserPostDetail from './UserPostDetail';

export default function UserPost() {
  const { userId: stringUserId } = useParams();
  const userId = Number(stringUserId);
  const navigate = useNavigate();

  const onClickback = () => {
    navigate(-1);
  };

  const UserPostDetailWithLoading = WithLoading({
    Component: UserPostDetail,
    responseDataKey: 'targetUser',
    axiosInstance: userApi.GET_USER_DETAIL,
    axiosConfig: { id: userId },
  });

  return (
    <div>
      <button onClick={onClickback}>back</button>
      <UserPostDetailWithLoading />
    </div>
  );
}
