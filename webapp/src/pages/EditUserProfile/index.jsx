import React from 'react';
import { useNavigate } from 'react-router-dom';
import userApi from 'api/user.api';

import WithLoading from 'hoc/WithLoading';
import * as S from './style';
import EditUserProfileForm from './EditUserProfileForm';

const USER_ID = 3;

export default function EditUserProfile() {
  const navigate = useNavigate();

  const onClickback = () => {
    navigate(-1);
  };

  const EditUserProfileFormWithLoading = WithLoading({
    Component: EditUserProfileForm,
    responseDataKey: 'targetUser',
    axiosInstance: userApi.GET_USER_DETAIL,
    axiosConfig: { id: USER_ID },
  });

  return (
    <S.Container>
      <button onClick={onClickback}>back</button>
      <br />
      <EditUserProfileFormWithLoading onClickback={onClickback} />
    </S.Container>
  );
}
